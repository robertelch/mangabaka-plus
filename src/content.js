import extensions from "./site-extensions/barrel.js";
import customPages from "./custom-pages/barrel.js"

// Add preferences to object if not preexisting
chrome.storage.local.get("preferences", (result) => {
    const preferences = {}
    for (const extension of extensions) {
        if (result.preferences[extension.name] == undefined) {
            preferences[extension.name] = true
        }
    }
    chrome.storage.local.set({ preferences: preferences })
});

// Initiate all extensions
for (const extension of extensions) {
    await extension.init()
}

// Insert custom outlinks onto cards
async function updateCards() {

    // Delete residue outlinks from previous page
    const divsToRemove = document.querySelectorAll('.custom-insert');
    divsToRemove.forEach(div => {
        div.remove();
    });

    // Create new inserts
    const cards = document.querySelectorAll('div[data-mangabaka-id]');
    for (const card of cards) {
        const mangabakaId = card.getAttribute('data-mangabaka-id');
        const list = card.querySelector('.ratings-list');
        for (const extension of extensions) {
            const inserts = await extension.getInserts(mangabakaId);
            for (const insert of inserts) {
                if (!insert) continue;
                const insertId = insert.getAttribute('data-insert-id');
                if (insertId && list.querySelector(`[data-insert-id="${insertId}"]`)) {
                    continue;
                }
                list.append(insert);
            }
        }
    }
}

// Monkeypatch page redirects
const script = document.createElement('script');
script.textContent = `
(function () {
  const dispatchLocationChange = () => {
    const event = new Event('locationchange');
    window.dispatchEvent(event);
    window.postMessage({ type: 'LOCATION_CHANGE', href: window.location.href }, '*');
  };

  const wrapHistoryMethod = method => {
    const original = history[method];
    history[method] = function (...args) {
      original.apply(history, args);
      dispatchLocationChange();
    };
  };

  ['pushState', 'replaceState'].forEach(wrapHistoryMethod);

  window.addEventListener('popstate', dispatchLocationChange);
})();
`;
(document.head || document.documentElement).appendChild(script);
script.remove();
window.addEventListener('message', async (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.type === 'LOCATION_CHANGE') {
    await onUrlChange(event.data.href);
  }
});

async function onUrlChange(newUrl) {
    await updateCards()

    // Insert custom sidebar icons
    let sidebar = document.querySelectorAll('.flex.w-full.min-w-0.flex-col.gap-1')[1]
    for (const page of customPages) {
        page.insertSidebar(sidebar)
    }

    // Create wrapper for injected pages
    const contentWrapper = document.body.querySelector(".content-wrapper.svelte-eg0xkf");
    if (!contentWrapper.classList.contains("injected")) {
        contentWrapper.classList.add("injected");
        const wrapper = document.createElement("div");
        wrapper.id = "injectionWrapper";
        contentWrapper.parentElement.appendChild(wrapper);
    }

    // Checks for and, if applicable, injects the fitting custom page
    const injectionWrapper = document.body.querySelector("#injectionWrapper")
    if (contentWrapper) {
        const matchedPage = customPages.find(page => page.CHECK_EX.test(newUrl));
        if (!matchedPage) {
            contentWrapper.hidden = false
            injectionWrapper.hidden = true
            return
        }
        contentWrapper.hidden = true
        injectionWrapper.hidden = false
        injectionWrapper.innerHTML = await matchedPage.getPage();
        await matchedPage.prepStuff(injectionWrapper);
    }
}
await onUrlChange()