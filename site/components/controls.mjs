export default class Controls {
    keys = new Set()
    mousePos = {x: 0, y: 0}
    building = false;
    buildingType = "assets/wall.png";

    /**
     * @returns {xdiff, ydiff, angle} get the current directional movement and mouse angle
     */
    getMovement() {
        return {
            ... this.#calculateMovement(),
            angle: this.#calculateAngle(),
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

    build() {
        for (const key of this.keys) {
            if(key === 'b'){
                if(this.building) this.building = false;
                else this.building = true;
                this.buildingType = "assets/wall.png";
                this.keys.delete('b')
            }
            if(this.building){
                switch(key){
                    case '1': 
                        this.buildingType = "assets/wall.png";
                        break;
                    case '2': 
                        this.buildingType = "assets/door.png";
                        break;
                    case '3': 
                        this.buildingType = "assets/slow-trap.png";
                        break;
                    case '4': 
                        this.buildingType = "assets/arrow-tower.png";
                        break;
                    case '5': 
                        this.buildingType = "assets/cannon-tower.png";
                        break;
                    case '6': 
                        this.buildingType = "assets/melee-tower.png";
                        break;
                    case '7': 
                        this.buildingType = "assets/bomb-tower.png";
                        break;
                    case '8': 
                        this.buildingType = "assets/mage-tower.png";
                        break;
                    case '9': 
                        this.buildingType = "assets/harvester.png";
                        break;
                    case '0': 
                        this.buildingType = "assets/gold-mine.png";
                        break;
                    case '-': 
                        this.buildingType = "assets/gold-stash.png";
                        break;
                    }
            } else {
                this.buildingType = "";
            }
        }
    }
}