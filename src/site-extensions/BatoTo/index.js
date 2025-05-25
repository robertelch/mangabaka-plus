import BaseModule from '../base.js';

export default class BatoTo extends BaseModule {

    static FAVICON_URL = "https://bato.to/amsta/img/batoto/favicon.ico?v0"

    static _makeLink(id) {
        return `https://bato.to/series/${id}`
    }

    static async _getRating(id) {
        const query = `
            query ExampleQuery($getComicNodeId: ID!) {
                get_comicNode(id: $getComicNodeId) {
                    data { score_avg }
                }
            }
        `;

        const res = await fetch('https://bato.to/ap2/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { getComicNodeId: id },
                operationName: 'ExampleQuery',
            }),
        });
        const data = await res.json();
        return data.data?.get_comicNode?.data?.score_avg ?? "-";
    }
}