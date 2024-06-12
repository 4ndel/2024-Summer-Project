export default class Entity {
    anchored = true;
    imgSrc;
    img;

    // x, y represents top-left corner
    x = 0;
    y = 0;
    width;
    height;

    constructor(imgSrc, width, height){
        this.imgSrc = imgSrc;
        this.width = width;
        this.height = height;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    getImage() {
        if (this.img == null) {
            this.img = new Image()
            this.img.src = this.imgSrc
        }
        return this.img
    }

    loadImage() {
        return new Promise((resolve) => {
            const img = this.getImage()
            img.onload = () => {
                if (!this.width) {
                    this.width = img.width
                }
                if (!this.height) {
                    this.height = img.height
                }
                resolve(img)
            };
        })
    }
}