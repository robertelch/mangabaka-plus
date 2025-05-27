import extensions from "./site-extensions/barrel.js";
import customPages from "./custom-pages/barrel.js"
console.log("HELLO?")
chrome.storage.local.get("preferences", (result) => {
    if (!result.preferences) {
        const preferences = {}
        for (const extension of extensions) {
            preferences[extension.name] = true
        }
        chrome.storage.local.set({ preferences: preferences })
    }
});
console.log("HELL2O?")

for (const extension of extensions) {
    await extension.init()
}

async function updateCards() {
    const cards = document.querySelectorAll('div[data-mangabaka-id]:not(.modified)');
    for (const card of cards) {
        card.classList.add("modified")
        const mangabakaId = card.getAttribute('data-mangabaka-id');
        for (const extension of extensions) {
            const inserts = await extension.getInserts(mangabakaId)
            for (const insert of inserts) {
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
}

const thisPage = window.location.href;
async function checkForSpecials() {
    const currentURL = window.location.href;

    const contentWrapper = document.body.querySelector(".content-wrapper.svelte-eg0xkf:not(.injected)");
    if (contentWrapper) {
        contentWrapper.classList.add("injected");
        const matchedPage = customPages.find(page => page.CHECK_EX.test(currentURL));
        if (matchedPage) {
            contentWrapper.innerHTML = await matchedPage.getPage();
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
        //checkForSpecials();
        updateCards();
    }, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

await updateCards();

const script = document.createElement('script');
script.textContent = `

(function() {
  const pushState = history.pushState;
  history.pushState = function(...args) {
    pushState.apply(history, args);
    window.dispatchEvent(new Event('locationchange'));
    window.postMessage({ type: 'LOCATION_CHANGE', href: window.location.href }, '*');
  };

  const replaceState = history.replaceState;
  history.replaceState = function(...args) {
    replaceState.apply(history, args);
    window.dispatchEvent(new Event('locationchange'));
    window.postMessage({ type: 'LOCATION_CHANGE', href: window.location.href }, '*');
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
    window.postMessage({ type: 'LOCATION_CHANGE', href: window.location.href }, '*');
  });
})();

`;
(document.head || document.documentElement).appendChild(script);
script.remove();
window.addEventListener('message', async (event) => {
  if (event.source !== window) return;

  if (event.data && event.data.type === 'LOCATION_CHANGE') {
    console.log('Content script received URL change:', event.data.href);
    await onUrlChange(event.data.href);
  }
});

async function onUrlChange(newUrl) {
    const contentWrapper = document.body.querySelector(".content-wrapper.svelte-eg0xkf");
    if (!contentWrapper.classList.contains("injected")) {
        contentWrapper.classList.add("injected");
        const wrapper = document.createElement("div");
        wrapper.id = "injectionWrapper";
        contentWrapper.parentElement.appendChild(wrapper);
    }
    const injectionWrapper = document.body.querySelector("#injectionWrapper")
    if (contentWrapper) {
        const matchedPage = customPages.find(page => page.CHECK_EX.test(newUrl));
        if (matchedPage) {
            contentWrapper.hidden = true
            injectionWrapper.hidden = false
            injectionWrapper.innerHTML = await matchedPage.getPage();
            await matchedPage.prepStuff(injectionWrapper);
        }
        else {
            contentWrapper.hidden = false
            injectionWrapper.hidden = true
        }
    }
}
