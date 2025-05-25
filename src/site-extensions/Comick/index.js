import BaseModule from '../base.js';

export default class Comick extends BaseModule {

    static FAVICON_URL = "https://comick.io/favicon.ico"

    static _makeLink(id) {
        return `https://comick.io/comic/${id}`
    }

    static async _getRating(id) {
        return "-"
    }
}