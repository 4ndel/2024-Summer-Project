export default class Player {
    x = 0
    y = 0
    speed = 5
    imgSrc = "player.png"
    img
    keys = new Set()

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
                resolve(img)
            };
        })
    }

    move() {
        for (const key of this.keys) {
            switch (key) {
                case 'a':
                    this.x -= this.speed;
                    break;
                case 'd':
                    this.x += this.speed;
                    break;
                case 'w':
                    this.y -= this.speed;
                    break;
                case 's':
                    this.y += this.speed;
                    break;
            }
        }
    }

    listenToKeys() {
        window.addEventListener('keydown', (e) => {
            this.keys.add(e.key)
        });

        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.key)
        });
    }
}