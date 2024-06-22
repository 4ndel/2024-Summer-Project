import World from "./world.mjs"

export default class GameEngine {
    canvas;
    context;
    world = new World()
    mouseX
    mouseY

    async init() {
        const body = document.body
        const canvas = this.canvas = document.getElementById("canvas");
        canvas.width = body.clientWidth
        canvas.height = body.clientHeight

        this.context = canvas.getContext("2d");

        const { player } = this.world
        this.world.generateWorld();

        await player?.drawable?.load()
        for (const entity of this.world.entities) {
            const promise  = entity?.drawable?.load()
        }
        player.controls.listen();
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
        const player = this.world.player
        const speed = player.pos.speed
        const movement = player.controls.getMovement();
        const xdiff = movement.xdiff * speed;
        const ydiff = movement.ydiff * speed;
        const nextPos = player.pos.newPos(xdiff, ydiff);

        const collided = this.checkEntityCollision(nextPos)

        if (collided.length > 0) {
            // these are entities that collided
            for (const entity of collided) {
                console.log(`oh no collision at ${entity.pos}`)
            }   
        }

        player.pos.move(nextPos.x, nextPos.y)
    }

    checkEntityCollision(pos) {
        return this.world.entities.filter(entity => entity.pos.checkCollision(pos))
    }

    drawEntities() {
        const { player } = this.world
        const center = {...player.pos, x: this.canvas.width / 2, y: this.canvas.height / 2}

        for (const entity of this.world.entities) {
            const x = entity.pos.x - player.pos.x;
            const y = entity.pos.y - player.pos.y;
            const pos = {...entity.pos, x, y}
            entity?.drawable?.draw?.(this.context, pos)
        }

        player?.drawable?.draw?.(this.context, center)
    }

    drawGrid(w, h) {
        const moveX = 0;
        const moveY = 0
        this.context.lineWidth = 5;
        this.context.strokeStyle = "#5e8138";
        for(let i = 0; i<h/70; i++){
            this.context.beginPath();
            this.context.moveTo(0 + moveX, i*70 + moveY);
            this.context.lineTo(w + moveX, i*70 + moveY);
            this.context.stroke();
        }
        for(let i = 0; i<w/70; i++){
            this.context.beginPath();
            this.context.moveTo(i*70 + moveX, 0 + moveY);
            this.context.lineTo(i*70 + moveX, h + moveY);
            this.context.stroke();
        }
    }

    drawBackground() {
        const {player} = this.world
        const ctx = this.context
        const w = this.canvas.width
        const h = this.canvas.height
        ctx.save()
        ctx.translate(player.pos.x % 70, player.pos.y % 70)
        ctx.fillStyle = "#688d41";
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(0, 0, w, h);
        this.drawGrid(w*100, h*100);
        ctx.restore()
    }
}

