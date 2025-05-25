import BaseModule from '../base.js';

export default class MangaFox extends BaseModule {

    static FAVICON_URL = "https://fanfox.net/favicon.ico"

    static _makeLink(id) {
        return id
    }

    static async _getRating(id) {
        return "-"
    }
}