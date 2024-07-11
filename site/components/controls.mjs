const BUILDING_KEY_NAME_MAP = new Map([
    ['1', 'wall'],
    ['2', 'door'],
    ['3', 'slow-trap'],
    ['4', 'arrow-tower'],
    ['5', 'cannon-tower'],
    ['6', 'melee-tower'],
    ['7', 'bomb-tower'],
    ['8', 'mage-tower'],
    ['9', 'harvester'],
    ['0', 'gold-mine'],
    ['-', 'gold-stash'],
])

/**
 * I keep track of the current state of the controls and I sometimes help map controls to other data
 */
export default class Controls {
    keys = new Set()
    #presses = new Set()
    mousePos = {x: 0, y: 0}
    leftClick = false

    /**
     * @returns {xdiff, ydiff, angle} get the current directional movement and mouse angle
     */
    getMovement() {
        return {
            ... this.#calculateMovement(),
            angle: this.#calculateAngle(),
        }
    }

    isDown(char) {
        return this.keys.has(char)
    }

    isPressed(char) {
        return this.#presses.has(char)
    }

    getBuildEntityName() {
        const keys = Array.from(this.#presses.values())
        const key = keys.find((key) => (BUILDING_KEY_NAME_MAP.has(key)))
        const entityName = BUILDING_KEY_NAME_MAP.get(key)
        return entityName
    }

    getPressed() {
        return Array.of(this.#presses.values)
    }

    clearPresses() {
        this.#presses.clear()
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            this.keys.add(e.key)
        });

        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.key)
            this.#presses.add(e.key)
        });

        window.addEventListener("mousemove", (e) => {
            this.mousePos = {x: e.clientX, y: e.clientY}
        });

        window.addEventListener("mousedown", (e) => {
            this.leftClick = true
        });

        window.addEventListener("mouseup", (e) => {
            this.leftClick = false
        });
    }

    followMouse(){
        return this.mousePos;
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