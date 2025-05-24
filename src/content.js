import extensions from "./site-extensions/barrel.js";
import customPages from "./custom-pages/barrel.js"
console.log(extensions)
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
            if (insert){
                const list = card.querySelector('.ratings-list');
                const insertId = insert.getAttribute('data-insert-id');
                if (insertId) {
                    if (list.querySelector(`[data-insert-id="${insertId}"]`)) {
                        continue;
                    }
                }
                list.append(insert);
            }
        }
    }
}

const thisPage = window.location.href;
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
