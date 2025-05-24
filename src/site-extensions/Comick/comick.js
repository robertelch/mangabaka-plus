import BaseModule from '../base.js';

export default class Comick extends BaseModule {

    static FAVICON_URL = "https://comick.io/favicon.ico"

    static _makeLink(id) {
        return `https://comick.io/comic/${id}`
    }

    static async _getRating(id) {
        console.log(id)
        return "-"
        if (id) {
            const res = await fetch(`https://api.comick.fun/comic/${id}`)
            const data = await res.json();
            return data.comic?.bayesian_rating ?? "-";
        }
    }
}