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
    }

    drawEntities() {
        const { player } = this.world
        this.drawEntity(player)
    }

    drawEntity(entity) {
        const { img, x, y } = entity
        this.context.drawImage(img, x, y);
    }

    drawBackground() {
        const ctx = this.context
        const w = this.canvas.width
        const h = this.canvas.height
        ctx.fillStyle = "#688d41";
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(0, 0, w, h)
    }
}

