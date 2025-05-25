import BaseModule from '../base.js';

export default class MangaReader extends BaseModule {

    static FAVICON_URL = "https://mangareader.to/favicon.ico?v=0.1"

    static _makeLink(id) {
        return id
    }

    static async _getRating(id) {
        return "-"
    }
}