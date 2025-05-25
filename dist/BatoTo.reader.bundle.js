/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/site-extensions/reader-base.js":
/*!********************************************!*\
  !*** ./src/site-extensions/reader-base.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReaderBase)
/* harmony export */ });
class ReaderBase {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/site-extensions/BatoTo/reader.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Reader)
/* harmony export */ });
/* harmony import */ var _reader_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reader-base.js */ "./src/site-extensions/reader-base.js");


class Reader extends _reader_base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

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
})();

/******/ })()
;
//# sourceMappingURL=BatoTo.reader.bundle.js.map