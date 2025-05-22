import extensions from "./site-extensions/barrel.js";
import customPages from "./custom-pages/barrel.js"

for (const extension of extensions) {
    await extension.init()
}

async function updateCards() {
    const cards = document.querySelectorAll('div[data-mangabaka-id]:not(.modified)');
    for (const card of cards) {
        card.classList.add("modified")
        const mangabakaId = card.getAttribute('data-mangabaka-id');
        for (const extension of extensions) {
            const insert = await extension.getInsert(mangabakaId)
            const list = card.querySelector('.ratings-list');
            list.append(insert);
        }
    }
}

const thisPage = window.location.href;

function overlapOfTitles(titles1, titles2) {
    const set1 = new Set(titles1);
    const set2 = new Set(titles2);
    const intersection = [...set1].filter(item => set2.has(item));
    const largerSetSize = Math.max(set1.size, set2.size);
    return (intersection.length / largerSetSize) * 100;
}


if (thisPage.endsWith("/merge")) {
    const cont = document.body.querySelector(".grid.shrink.grid-cols-10.gap-x-4");
    const cards = cont?.querySelectorAll(".grid.grid-cols-2.gap-x-4.place-self-stretch") || [];
    const baseCard = cards[0];
    const regex = /ID\s*#\s*(\d+)/;

    const baseIdDiv = Array.from(baseCard?.querySelectorAll("div") || []).find(div => regex.exec(div.textContent?.trim() || ""));
    const baseIdMatch = baseIdDiv ? regex.exec(baseIdDiv.textContent?.trim() || "") : null;
    const baseId = baseIdMatch?.[1];

    let baseTitles = [];
    let baseStaff = [];

    try {
        const baseSeries = await (await fetch(`https://api.mangabaka.dev/v1/series/${baseId}`)).json();
        baseTitles = Object.values(baseSeries.secondary_titles || {}).flat().map(item => item.title || "");
        baseTitles.push(baseSeries.title || "", baseSeries.native_title || "", baseSeries.romanized_title || "");
        baseTitles = baseTitles.map(title => title.replace(/\s*\(.*?\)/, ""));
        baseStaff = [...(baseSeries.authors || []), ...(baseSeries.artists || [])];
        baseStaff = baseStaff.map(name => name.replace(/\s*\(.*?\)/, ""));
    } catch (e) {
        console.error("Failed to fetch base series:", e);
    }

    if (baseIdDiv?.querySelector(".mod-header")) {
        baseIdDiv.querySelector(".mod-header").innerHTML = "Original";
    }

    for (const card of cards) {
        if (Array.from(cards).findIndex(cardt => cardt === card)) {
            try {
                const cardDiv = Array.from(card.querySelectorAll("div") || []).find(div => regex.exec(div.textContent?.trim() || ""));
                const cardIdMatch = cardDiv ? regex.exec(cardDiv.textContent?.trim() || "") : null;
                const cardId = cardIdMatch?.[1];

                const cardSeries = await (await fetch(`https://api.mangabaka.dev/v1/series/${cardId}`)).json();
                let cardTitles = Object.values(cardSeries.secondary_titles || {}).flat().map(item => item.title || "");
                cardTitles.push(cardSeries.title || "", cardSeries.native_title || "", cardSeries.romanized_title || "");
                cardTitles = cardTitles.map(title => title.replace(/\s*\(.*?\)/, ""));

                let cardStaff = [...(cardSeries.authors || []), ...(cardSeries.artists || [])];
                cardStaff = cardStaff.map(name => name.replace(/\s*\(.*?\)/, ""));

                const overlapScore = (overlapOfTitles(baseTitles, cardTitles) + overlapOfTitles(baseStaff, cardStaff)) / 2;
                card.querySelector(".mod-header").innerHTML = `Confidence: ${overlapScore.toPrecision(3)}%`;
            } catch (e) {
                console.error("Failed to fetch or process card series:", e);
            }
        }
    }
}

async function checkForSpecials() {
    const currentURL = window.location.href;

    const contentWrapper = document.body.querySelector(".content-wrapper.svelte-eg0xkf:not(.injected)");
    if (contentWrapper) {
        contentWrapper.classList.add("injected");
        const matchedPage = customPages.find(page => page.CHECK_EX.test(currentURL));
        if (matchedPage) {
            contentWrapper.innerHTML = matchedPage.getPage();
            await matchedPage.prepStuff(contentWrapper);
        }
    }

    if (currentURL != thisPage) {
        const matchedOldPage = customPages.find(page => page.CHECK_EX.test(thisPage));
        if (matchedOldPage) {
            window.location.reload();
        }
    }
}

let debounceTimer;
const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        let sidebar = document.querySelectorAll('.flex.w-full.min-w-0.flex-col.gap-1')[1]
        for (const page of customPages) {
            page.insertSidebar(sidebar)
        }
        checkForSpecials();
        updateCards();
    }, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

await updateCards();
