export default class ImageDrawable {
    parent;
    img;
    imgSrc;

    constructor(src) {
        this.imgSrc = src
    }

    draw(context, {x, y, width, height, angle}) {
        if (!this.parent) return;
        const img = this.getImage();
        if (img) {
            // context.rotate(angle)
            context.drawImage(img, x, y, width, height);
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