import World from "./world.mjs"

export default class GameEngine {
    canvas;
    context;
    isBuilding;
    world = new World()

    async init() {
        const body = document.body
        const canvas = this.canvas = document.getElementById("canvas");
        canvas.width = body.clientWidth
        canvas.height = body.clientHeight

        this.context = canvas.getContext("2d");

        const { player } = this.world
        const { buildingPreview } = this.world
        this.world.generateWorld();

        await player?.drawable?.load()
        await buildingPreview?.drawable?.load()
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
        this.buildPreview()
    }

      // trying to change image of buildingPreview.
     // then using key listening switch the images.
    // then implement placing.
    building(){
        const { player } = this.world
        player.controls.build();
        this.world.changeBuilding(player.controls.buildingType)
    }

    buildPreview(){
        const { player } = this.world
        const { buildingPreview } = this.world
        var { x, y } = player.controls.followMouse();
        x-=35
        y-=35
        buildingPreview.pos.move(x - (x%70), y - (y%70))
        buildingPreview.drawable?.draw?.(this.context, buildingPreview.pos, 0.5)
        this.building()
    }

    moveEntities() {
        // player/collision
        const player = this.world.player
        const speed = player.pos.speed
        const movement = player.controls.getMovement();
        const xdiff = movement.xdiff * speed;
        const ydiff = movement.ydiff * speed;
        const nextPos = player.pos.newPos(xdiff, ydiff);

        const collided = this.checkEntityCollision(nextPos)

        if (collided.length <= 0) player.pos.move(nextPos.x, nextPos.y)
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

    drawBackground() {
        const {player} = this.world
        const ctx = this.context
        const w = this.canvas.width
        const h = this.canvas.height
        ctx.save()
        ctx.translate((player.pos.x % 70) * -1 - 100, (player.pos.y % 70) * -1 - 100)
        ctx.fillStyle = "#688d41";
        ctx.clearRect(-200, -200, w+600, h+600);
        ctx.fillRect(-100, -100, w+500, h+500);
        this.drawGrid(w*100, h*100);
        ctx.restore()
    }
}

