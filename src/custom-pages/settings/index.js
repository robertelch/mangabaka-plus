import BasePage from "../base"

export default class SettingsPage extends BasePage {
    static SIDEBAR_ICON = "wrench"
    static SIDEBAR_NAME = "MangaBaka+ Settings"
    static PAGE_LINK = "mbps"
    static getPage() {
        let bato = localStorage.getItem("bato-toggle");
        let res = bato == "false" ? "" : "checked";

        return `<div class="px-2 py-4 sm:px-4">
        <h1 class="py-4 text-xl font-semibold sm:text-2xl">MangaBaka+ Settings</h1>
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-4">
                <div class="prose">
                    <h3 class="text-base">Manga Sources</h3>
                    <ul class="list-outside list-disc" style="list-style-type: none; padding: 0; margin: 0;">
                        <li>
    <div style="display: flex; align-items: center; gap: 8px;">
    <input type="checkbox" id="bato-toggle" name="bato-toggle" style="transform: scale(1.2);" ${res}>
    <label for="bato-toggle" style="font-size: 20px;">bato.to</label>
    </div>

                        </li>
                    </ul>

                </div>
                <div class="text-right">
    <button id="save-mbp" class="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-1">
        <!---->Save
        <!---->
    </button>
            </div>
            </div>

        </div>
    </div>`
    }


    static async prepStuff(contentWrapper) {
        let save = contentWrapper.querySelector("#save-mbp")
        save.addEventListener('click', () => {
            let bato = contentWrapper.querySelector("#bato-toggle")
            localStorage.setItem("bato-toggle", String(bato.checked))
        });
    }
}