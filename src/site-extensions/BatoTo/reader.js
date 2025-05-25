import ReaderBase from '../reader-base.js';

export default class Reader extends ReaderBase {

    static FAVICON_URL = "https://bato.to/amsta/img/batoto/favicon.ico?v0"

    static _makeLink(id) {
        return `https://bato.to/series/${id}`
    }

    static async getChapterList(comickId) {
        const query = `
            query ExampleQuery($comicId: ID) {
            get_pub_chapterList(comicId: $comicId) {
                data {
                    serial
                    id
                }
            }
        }
        `;

        const res = await fetch('https://bato.to/ap2/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { comicId: comickId },
                operationName: 'ExampleQuery',
            }),
        });
        const data = await res.json();
        return data.data?.get_pub_chapterList?.map(item => item.data) ?? [];
    }
}