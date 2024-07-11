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

    /**
     * Draw this component to the context
     * @param {} context 
     * @param {*} dimensions 
     */
    draw(context, {x, y, width, height, angle}, transparency = 1) {
        if (!this.parent) return;
        const img = this.getImage();
        if (img) {
            context.globalAlpha = transparency;
            // context.rotate(angle)
            context.drawImage(img, x, y, width, height);
            context.globalAlpha = 1;
        }
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