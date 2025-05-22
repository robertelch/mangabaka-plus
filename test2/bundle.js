/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _site_extensions_bato__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./site-extensions/bato */ "./src/site-extensions/bato.js");
const jsonURL = chrome.runtime.getURL("data.json");


async function get_insert(id) {
  const query = `
    query ExampleQuery($getComicNodeId: ID!) {
      get_comicNode(id: $getComicNodeId) {
        id
        data {
          score_avg
        }
      }
    }
  `;

  const variables = { getComicNodeId: id };

  const res = await fetch('https://bato.to/ap2/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
      operationName: 'ExampleQuery',
    }),
  });
  const result_1 = await res.json();
  const aa = result_1.data?.get_comicNode?.data?.score_avg ?? "-";
  return `<a class="custom-insert ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 py-1"
href="https://bato.to/series/${id}" target="_blank" rel="noopener noreferrer" title="Open on Batoto"><img class="mr-1 size-5 bg-[#152232]" alt="Bato" src="https://bato.to/amsta/img/batoto/favicon.ico?v0">${aa.toPrecision(2)}
<!--[!-->
<!--]-->
<!---->
</a>`;
}

async function fetchAndUpdate() {
  const res = await fetch(jsonURL);
  const data = await res.json();
  try {
    const elements = document.querySelectorAll('.rounded-lg.border.bg-card.text-card-foreground.shadow-sm.p-0:not(.modified)');

    for (const element of elements) {
      element.classList.add("modified")
      const mangabakaId = element.getAttribute('data-mangabaka-id');
      const result = data.find(item => item.mangabaka == mangabakaId);
      if (result) {
        const list = element.querySelector('.ratings-list.flex.flex-row.flex-wrap.gap-2.pt-1');
        if (list) {
          const linkHtml = await get_insert(result.batoto);
          list.innerHTML += linkHtml;
        }
      }
    }
  } catch (error) {
    console.error("Error in fetchAndUpdate:", error);
  }
}


let testHTML = `
<li data-sidebar="menu-sub-item">
  <a href="javascript:void(0);" class="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sm group-data-[collapsible=icon]:hidden" data-sidebar="menu-sub-button" data-size="md" data-active="false">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon lucide lucide-wrench">
      <path d="M14.7 6.3a5 5 0 0 0-6.6 6.6l-6 6a2 2 0 1 0 2.8 2.8l6-6a5 5 0 0 0 6.6-6.6l-3 3-2.8-2.8 3-3z"></path>
    </svg>
    MangaBaka+ Settings
  </a></li>
`;

function makeSettings() {
  bato = localStorage.getItem("bato-toggle")
  res = bato == "false" ? "" : "checked"
  return `<div class="px-2 py-4 sm:px-4">
    <h1 class="py-4 text-xl font-semibold sm:text-2xl">MangaBaka+ Settings</h1>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-4">
            <div class="prose">
                <h3 class="text-base">Manga Sources</h3>
                <ul class="list-outside list-disc" style="list-style-type: none; padding: 0; margin: 0;">
                    <li>
<div style="display: flex; align-items: center; gap: 8px;">
  <input type="checkbox" id="bato-toggle" name="bato-toggle" style="transform: scale(1.2);" ${res}>
  <label for="bato-toggle" style="font-size: 20px;">bato.to</label>
</div>

                    </li>
                </ul>

            </div>
            <div class="text-right">
<button id="save-mbp" class="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-1">
    <!---->Save
    <!---->
</button>
        </div>
        </div>

    </div>
</div>`
}


const overlay = document.createElement('div');
overlay.id = 'custom-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
overlay.style.zIndex = '9999';
overlay.hidden = true
overlay.textContent = 'This is an injected full-screen div!';
document.body.appendChild(overlay);
// Define the function in the same scope
function changeOverlay() {
  overlay.hidden = !overlay.hidden
  // your code here
}
fetchAndUpdate();

function checkForSpecials() {
  const currentURL = window.location.href;
  let regex = /https:\/\/mangabaka\.dev\/mbp/i
  if (regex.test(currentURL)) {
        const cw = document.body.querySelector(".content-wrapper.svelte-eg0xkf:not(.inject)")
        cw.innerHTML = makeSettings()
        cw.classList.add("inject")
        save = cw.querySelector("#save-mbp")
        save.addEventListener('click', () => {
          bato = cw.querySelector("#bato-toggle")
          localStorage.setItem("bato-toggle",String(bato.checked))
        });
    settingsObserver = new MutationObserver(() => {
      const url = location.href;
      if (!regex.test(url)) {
        window.location.reload();
      }
    });
    
    settingsObserver.observe(document, {
      subtree: true,
      childList: true,
      attributes: true
    });
  }

    }

let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {


    
let g = document.querySelectorAll('.flex.w-full.min-w-0.flex-col.gap-1')[1]
nn = g.querySelector(".lucide-wrench")
if(!nn) {
    testHTML = `
<li data-sidebar="menu-sub-item">
  <a id="injected_settings" href="https://mangabaka.dev/mbp" class="text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sm group-data-[collapsible=icon]:hidden" data-sidebar="menu-sub-button" data-size="md" data-active="false">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon lucide lucide-wrench">
      <path d="M14.7 6.3a5 5 0 0 0-6.6 6.6l-6 6a2 2 0 1 0 2.8 2.8l6-6a5 5 0 0 0 6.6-6.6l-3 3-2.8-2.8 3-3z"></path>
    </svg>
    MangaBaka+ Settings
  </a></li>
`;
g.innerHTML += testHTML

}
    checkForSpecials();
    fetchAndUpdate();
  }, 100);
});


observer.observe(document.body, {
  childList: true,
  subtree: true,
});
await _site_extensions_bato__WEBPACK_IMPORTED_MODULE_0__["default"].init()
console.log("BATO INITED")
console.log(await _site_extensions_bato__WEBPACK_IMPORTED_MODULE_0__["default"].getInsert(2060))
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/site-extensions/base.js":
/*!*************************************!*\
  !*** ./src/site-extensions/base.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseModule)
/* harmony export */ });
class BaseModule {

    static FAVICON_URL = "https://example.com"

    static async getInsert(mb_id) {
        const siteId = this._getSiteId(mb_id);
        const rating = await this._getRating(siteId);
        return this._getInsertPrivate(siteId, rating);
    }

    static _getInsertPrivate(id,rating) {
        return `
        <a class="custom-insert ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 py-1"
        href="${this._makeLink(id)}" target="_blank" rel="noopener noreferrer" title="Open on ${this.constructor.name}"><img class="mr-1 size-5 bg-[_152232]" alt="Bato" src="${this.FAVICON_URL}">${rating}
        </a>`;
    }

    static _makeLink(id) {
        throw new Error(`${this.constructor.name} must implement makeLink(id)`);
    }

    static async _getRating(id) {
        throw new Error(`${this.constructor.name} must implement getRating(id)`);
    }

    static _getSiteId(mb_id) {
        return this.data.find(item => item.mangabaka == mb_id).siteId;
    }

    static async init() {
        const jsonURL = chrome.runtime.getURL(`./${this.name}.json`); 
        const res = await fetch(jsonURL);
        this.data = await res.json();
    }
}

/***/ }),

/***/ "./src/site-extensions/bato.js":
/*!*************************************!*\
  !*** ./src/site-extensions/bato.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BatoTo)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./src/site-extensions/base.js");


class BatoTo extends _base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map