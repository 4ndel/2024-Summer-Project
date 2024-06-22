export default class Controls {
    keys = new Set()
    mousePos

    /**
     * @returns {xdiff, ydiff, angle} get the current directional movement and mouse angle
     */
    getMovement() {
        return {
            ... this.#calculateMovement(),
            angle: this.#calculateAngle() 
        }
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            this.keys.add(e.key)
        });

        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.key)
        });

        window.addEventListener("mousemove", (e) => {
            this.mousePos = {x: e.clientX, y: e.clientY}
        });
    }

    #calculateMovement() {
        let xdiff = 0
        let ydiff = 0

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
            xdiff /= Math.sqrt(2)
            ydiff /=  Math.sqrt(2)
        }
        return {xdiff, ydiff}
    }

    #calculateAngle() {
        const {x, y} = this.mousePos
        const mouseX = x - screen.width/2
        const mouseY = y - screen.height/2
        const mouseAngle = Math.atan(mouseY / mouseX)
        // console.log(mouseX + " " + mouseY + " " + mouseAngle * (180/Math.PI))
        return mouseAngle
    }
}