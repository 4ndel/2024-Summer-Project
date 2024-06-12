import World from "./world.mjs"

export default class GameEngine {
    canvas;
    context;
    world = new World()

    async init() {
        const body = document.body
        const canvas = this.canvas = document.getElementById("canvas");
        canvas.width = body.clientWidth
        canvas.height = body.clientHeight

        this.context = canvas.getContext("2d");

        const { player } = this.world
        this.world.generateWorld();
        await player.loadImage()
        player.listenToKeys()
    }

    start() {
        const engine = this
        setInterval(() => {
            engine.draw()
        }, 16);
    }

    draw() {
        this.moveEntities()

        this.drawBackground()
        this.drawEntities()
    }

    moveEntities() {
        const { player } = this.world
        player.move()

        for (entity of this.world.getMovableEntities()) {
            // TODO move them I guess
        }
    }

    drawEntities() {
        const { player } = this.world

        for (const entity of this.world.entities) {
            this.drawEntity(entity)
        }

        this.drawEntity(player)
    }

    drawGrid(w, h){
        this.context.lineWidth = 5;
        this.context.strokeStyle = "#5e8138";
        for(let i = 0; i<h/70; i++){
            this.context.beginPath();
            this.context.moveTo(0, i*70);
            this.context.lineTo(w, i*70);
            this.context.stroke();
        }
        for(let i = 0; i<w/70; i++){
            this.context.beginPath();
            this.context.moveTo(i*70, 0);
            this.context.lineTo(i*70, h);
            this.context.stroke();
        }
    }

    drawEntity(entity) {
        const { x, y, width, height } = entity
        const img = entity?.getImage()
        if (img) {
            this.context.drawImage(img, x, y, width, height);
        }
    }

    drawBackground() {
        const ctx = this.context
        const w = this.canvas.width
        const h = this.canvas.height
        ctx.fillStyle = "#688d41";
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(0, 0, w, h);
        this.drawGrid(w, h);
    }
}

