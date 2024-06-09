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
        xdiff = 0
        ydiff = 0
        for (const key of this.keys) {
            switch (key) {
                case 'a':
                    xdiff -= 1
                    break;
                case 'd':
                    xdiff += 1
                    break;
                case 'w':
                    ydiff -= 1
                    break;
                case 's':
                    ydiff += 1
                    break;
            }
        }
        
        if (xdiff != 0 && ydiff != 0) {
            this.x += this.speed /2
            this.y += this.speed /2
        } else {
            this.x += this.speed * xdiff
            this.y += this.speed * ydiff
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