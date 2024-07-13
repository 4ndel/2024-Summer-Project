export default class ImageDrawable {
    parent;
    img;
    imgSrc;
    debug = true;

    constructor(src) {
        this.imgSrc = src
    }

    setImage(src){
        this.imgSrc = src
    }

    /**
     * Draw this component to the context
     * @param {} context 
     * @param {*} dimensions 
     */
    draw(context, {x, y, width, height, angle}, transparency = 1) {
        if (!this.parent) return;
        context.globalAlpha = transparency;
        this.#draw(context, x, y, width, height)
        context.globalAlpha = 1;
    }

    drawScreen(context, {x, y, width, height, angle}) {
        if (!this.parent) return;
        const center = {x: x - width / 2, y: y - height / 2 }
        context.translate(center.x, center.y)
        context.rotate(angle)
        this.#draw(context, 0, 0, width, height, angle)
        context.globalAlpha = 1;
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    #draw(context, x, y, width, height, angle) {
        const img = this.getImage();
        if (this.debug) {
            context.fillStyle = "#000"
            context.fillRect(x, y, width, height)
        }
        if (img) {
            context.drawImage(img, x, y, width, height);
        }
        if (this.debug) {
            const pos = this.parent?.pos
            const worldx = Math.floor(pos.x)
            const worldy = Math.floor(pos.y)
            context.fillStyle = "#FFF"
            context.fillText(`${worldx},${worldy} ${width}x${height} @ ${angle}`, x, y)
        }
    }

    rotateImage(context, img, x, y, width, height, angle){
        context.translate(x, y)
        context.rotate(angle)
        context.translate(-x, -y)
        context.drawImage(img, x, y, width, height);
        context.setTransform(1, 0, 0, 1, 0, 0)
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