import BaseModule from '../base.js';

export default class MangaHub extends BaseModule {

    static FAVICON_URL = "https://mangahub.io/favicon-32x32.png"

    static _makeLink(id) {
        return `https://mangahub.io/manga/${id}`
    }

    static async _getRating(id) {
        return "-"
    }
}