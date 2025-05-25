import BaseModule from '../base.js';

export default class MangaNato extends BaseModule {

    static FAVICON_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAJ1BMVEV7xMZ+xcjoVU3wXFXJ5un+/v7yvrmm1dflbWjqop/mmY/q+Pn529bytDNAAAAAAXRSTlP9g+pWxwAAAN1JREFUeAGt0DVCg0EQhuFd3NlF+z9e4nR4HX3jDdbj9JEDYAfAavwARM4Vd+nybfeszYyQlZhWyhFSl9MAxdUIJZG645XlLm8UooQ2LRt1UAM+abL6TXW4RpuSxGsgDjg3nnipwx/bRpajOsCXAakayALYG2ER3Fbw1GAAAhaywSqoca59yehTyFQBMc88p6F3fxXUgW8cvMloBZT6CwxAykK8egX3MNxbea2AxKUh7iBVgWE+1Z/ftImndmJbXQdXlrNVELcFLPzgqD6qRHmEy01DXmmfei9BlFKDPEOSWUk7OMQdAAAAAElFTkSuQmCC"

    static _makeLink(id) {
        return id
    }

    static async _getRating(id) {
        return "-"
    }
}