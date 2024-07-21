import { isDebug } from "../constants.mjs";

export default class DebugDrawable {
    constructor(viewport, controls, world) {
        this.viewport = viewport;
        this.controls = controls;
        this.world = world;
    }

    draw() {
        if (!isDebug()) return;
        const ctx = this.viewport.context;
        const center = this.viewport.getCenter()
        const {x, y} = this.controls.mousePos
        const world = this.viewport.toWorldCoordinates({x, y})

        // draw center circle
        ctx.beginPath();
        ctx.strokeStyle = "#F00"
        ctx.arc(center.x, center.y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x, center.y, 3, 0, 2 * Math.PI);
        ctx.fill()

        // draw mouse coordinates
        ctx.fillStyle = "#FFF"
        ctx.fillText(`mouse: ${x},${y}`, x, y - 15);
        ctx.fillText(`world: ${Math.floor(world.x)},${Math.floor(world.y)}`, x, y);
    }
}