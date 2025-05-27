export default class BaseModule {

    static FAVICON_URL = "https://example.com"

    static async getInserts(mb_id) {
        const siteIds = this._getSiteIds(mb_id);
        const result = []
        if (siteIds){
            for (const id of siteIds) {
                const rating = await this._getRating(id);
                const insert = await this._getInsertPrivate(id, rating)
                result.push(insert);
            }
        }
        return result
    }

    static async _getInsertPrivate(id, rating) {
        return new Promise((resolve) => {
            chrome.storage.local.get("preferences", (result) => {
                if (result.preferences[this.name]) {
                    const a = document.createElement('a');
                    a.dataset.insertId = `${name}-${id}`;
                    a.className = "custom-insert ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 py-1";
                    a.href = this._makeLink(id);
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.title = `Open on ${name}`;

                    const img = document.createElement('img');
                    img.className = "mr-1 size-5 bg-[_152232]";
                    img.alt = "Bato";
                    img.src = this.FAVICON_URL;

                    a.appendChild(img);
                    try {
                        a.appendChild(document.createTextNode(rating.toPrecision(2)));
                    } catch {
                        a.appendChild(document.createTextNode(rating));
                    }
                    resolve(a);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static _makeLink(id) {
        throw new Error(`${this.constructor.name} must implement makeLink(id)`);
    }

    static async _getRating(id) {
        throw new Error(`${this.constructor.name} must implement getRating(id)`);
    }

    static _getSiteIds(mb_id) {
        return this.data[mb_id];
    }

    static async openReader(mb_id) {
        const siteId = this._getSiteId(mb_id)
        const reader = chrome.runtime.getURL(`./reader.html`);
        chrome.tabs.create({ url: reader, active: true });
    }

    static async init() {
        const jsonURL = chrome.runtime.getURL(`./${this.name}.data.json`); 
        const res = await fetch(jsonURL);
        this.data = await res.json();
    }
}