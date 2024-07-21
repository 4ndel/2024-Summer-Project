import { getCenter, translate } from "./components/position.mjs";

export default class Viewport {
    context;
    #canvas;
    #world;
    
    constructor(world) {
        this.#world = world;
        const body = document.body
        const canvas = this.#canvas = document.getElementById("canvas");
        canvas.width = body.clientWidth
        canvas.height = body.clientHeight
        this.context = canvas.getContext("2d");
    }

    /**
     * @returns {import("./components/position.mjs").Dim} the dimensions of the screen
     */
    getDims() {
        return { width: this.#canvas.clientWidth, height: this.#canvas.clientHeight }
    }

    /**
     * @returns {import("./components/position.mjs").Pos} the center of the screen (in screen coordinates)
     */
    getCenter() {
        return getCenter(this.getDims())
    }

    getRegion() {
        const dims = this.getDims()
        const center = this.getCenter()
        return {
            ...dims,
            x: center.x - dims.width,
            y: center.y - dims.height
        }
    }

    toScreenCoordinates(region) {
        const source = this.getCenter();
        const dest = getCenter(this.#world.player.pos)
        return translate(region, source, dest)
    }

    toWorldCoordinates(region) {
        const source = getCenter(this.#world.player.pos)
        const dest = this.getCenter();
        return translate(region, source, dest)
    }
}