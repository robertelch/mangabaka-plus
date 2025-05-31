import BaseModule from '../base.js';

export default class MalSync extends BaseModule {

    static FAVICON_URL = "https://malsync.moe/favicon.ico"
    static STANDARD_SETTING = false

    static async getInserts(mb_id,cardDiv) {
        const malId = cardDiv.querySelector('[data-mangabaka-source="my-anime-list"]')
        if (malId) {
            const rating = malId.textContent
            const id = malId.dataset.mangabakaSourceId
            const insert = await this._getInsertPrivate(id, rating)
            return [insert]
        }
        return []
    }

    static async init() {}

    static _makeLink(id) {
        return `https://malsync.moe/pwa/#/manga/${id}`
    }

    static async _getRating(id) {
        return "-"
    }
}