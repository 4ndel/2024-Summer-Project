import { isDebug } from "../constants.mjs";
import { getCenter } from "./position.mjs";

export default class ImageDrawable {
    parent;
    img;
    imgSrc;

    constructor(src) {
        this.imgSrc = src
    }

    setImage(src){
        this.imgSrc = src
    }

    draw(viewport) {
        if (!this.parent?.pos) return;
        const {context} = viewport;
        const {x, y, width, height, angle} = viewport.toScreenCoordinates(this.parent.pos)
        this.#drawScreen(context, x, y, width, height, angle)
    }

    drawScreen(viewport, {x, y}) {
        if (!this.parent?.pos) return;
        const {context} = viewport;
        const {width, height, angle} = this.parent.pos
        this.#drawScreen(context, x, y, width, height, angle)
    }

    #drawScreen(context, x, y, width, height, angle) {
        const img = this.getImage();
        const debug = isDebug()
        const center = getCenter({width, height})
        //context.translate(center.x + width / 2, center.y + height / 2)
        //context.rotate(angle)
        //context.translate(-(center.x + width / 2), -(center.y + height / 2))
        if (debug) {
            context.fillStyle = "#000"
            context.fillRect(x, y, width, height)
        }
        if (img) {
            context.drawImage(img, x, y, width, height);
        }
        if (debug) {
            const pos = this.parent?.pos
            const worldx = Math.floor(pos.x)
            const worldy = Math.floor(pos.y)
            context.fillStyle = "#FFF"
            context.fillText(`${worldx}, ${worldy} ${width}x${height} @ ${angle}`, x, y)
        }
        context.globalAlpha = 1;
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    getImage() {
        if (this.img == null) {
            this.img = new Image()
            this.img.src = this.imgSrc
        }
        return this.img
    }

    load() {
        return new Promise((resolve) => {
            const img = this.getImage()
            img.onload = () => {
                resolve(img)
            };
        })
    }
}