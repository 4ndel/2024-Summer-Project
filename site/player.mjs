var mouseX
var mouseY
var mouseAngle
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - screen.width/2
    mouseY = e.clientY - screen.height/2
    mouseAngle = Math.atan(mouseY / mouseX)
    console.log(mouseX + " " + mouseY + " " + mouseAngle * (180/Math.PI))
});
export default class Player {
    x = 0
    y = 0
    movedX = 0;
    movedY = 0;
    width = 170
    height = 150
    speed = 5
    imgSrc = "assets/player.png"
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

    move(world) {
        let xdiff = 0
        let ydiff = 0
        for (const key of this.keys) {
            switch (key) {
                case 'a':
                    xdiff += 1
                    break;
                case 'd':
                    xdiff -= 1
                    break;
                case 'w':
                    ydiff += 1
                    break;
                case 's':
                    ydiff -= 1
                    break;
            }
        }
        
        if (xdiff != 0 && ydiff != 0) {
            xdiff /= Math.sqrt(2)
            ydiff /=  Math.sqrt(2)
        }
        for (const entity of world.entities) {
            entity.x += this.speed * xdiff
            entity.y += this.speed * ydiff
        }
        this.movedX += this.speed * xdiff
        this.movedY += this.speed * ydiff
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