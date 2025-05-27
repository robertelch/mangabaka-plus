import BasePage from "../base"
import Extensions from "../../site-extensions/barrel.js"
export default class SettingsPage extends BasePage {

    static SIDEBAR_ICON = "wrench"
    static SIDEBAR_NAME = "MangaBaka+ Settings"
    static PAGE_LINK = "mbps"

    static getPage() {
    return new Promise((resolve) => {
        chrome.storage.local.get("preferences", (result) => {
        const preferences = result.preferences || {};
        const checkboxes = [];

        for (const extension of Extensions) {
            console.log("A")
            const isChecked = preferences[extension.name] !== false ? "checked" : "";
            const id = `${extension.name}-toggle`;

            const checkbox = `
            <li>
                <div style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="${id}" name="${id}" style="transform: scale(1.2);" ${isChecked}>
                <label for="${id}" style="font-size: 20px;">${extension.name}</label>
                </div>
            </li>
            `;
            checkboxes.push(checkbox);
        }

        const html = `
            <div class="px-2 py-4 sm:px-4">
            <h1 class="py-4 text-xl font-semibold sm:text-2xl">MangaBaka+ Settings</h1>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div class="p-4">
                <div class="prose">
                    <h3 class="text-base">Manga Sources</h3>
                    <ul class="list-outside list-disc" style="list-style-type: none; padding: 0; margin: 0;">
                    ${checkboxes.join("")}
                    </ul>
                </div>
                <div class="text-right">
                    <button id="save-mbp" class="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-1">
                    Save
                    </button>
                </div>
                </div>
            </div>
            </div>
        `;

        resolve(html);
        });
    });
    }



    static async prepStuff(contentWrapper) {
        let save = contentWrapper.querySelector("#save-mbp")
        save.addEventListener('click', () => {
            const storage = {}
            for (const extension of Extensions) {
                storage[extension.name] = contentWrapper.querySelector(`#${extension.name}-toggle`).checked
            }
            chrome.storage.local.set({ preferences: storage });
        });
    }
}