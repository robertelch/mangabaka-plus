export default class ReaderBase {

    static async getChapterList(comicId) {
        throw new Error(`${this.constructor.name} must implement getChapterList(comicId)`);
    }

    static async _getImageLinks(chapterId) {
        throw new Error(`${this.constructor.name} must implement getChapterList(chapterId)`);
    }

    static async #urlToB64(url) {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob); 
        });
    }

    static async getChapterImages(chapterId) {
        let imageLinks = await _getImageLinks(chapterId)
        let images = imageLinks.map(link => this.#urlToB64(link))
        imageLinks.forEach(link => {
            
        });
    }
}