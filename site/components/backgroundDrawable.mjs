import { GRID_LINE_WIDTH, GRID_SIZE } from "../constants.mjs";

export default class BackgroundDrawable {
    parent;
    gridSize;
    lineWidth;
    gridColor = "#5e8138"
    backgroundColor = "#688d41"
    #world;

    constructor(world, gridSize = GRID_SIZE, lineWidth= GRID_LINE_WIDTH) {
        this.#world = world
        this.gridSize = gridSize
        this.lineWidth = lineWidth
    }

    draw(viewport) {
        const {x, y} = this.#world.player.pos
        const {width, height} = viewport.getDims()
        const {context} = viewport
        this.#drawBackground(context, width, height)
        this.#drawGrid(context, x, y, width, height)
        this.#drawBorders(viewport, width, height)
    }

    #drawGrid(context, x, y, w, h) {
        const numHorizontalGridLines = Math.ceil(h / this.gridSize)
        const numVeritcalGridLines = Math.ceil(w / this.gridSize)
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.gridColor;
        const horizontalOffset = x % this.gridSize
        const veritcalOffset = y % this.gridSize

        for(let i = 0; i < numHorizontalGridLines; i++) {
            const y = i * this.gridSize - veritcalOffset
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(w, y);
            context.stroke();
        }
        for(let i = 0; i < numVeritcalGridLines; i++) {
            const x = i * this.gridSize - horizontalOffset
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, h);
            context.stroke();
        }
    }

    #drawBackground(context, w, h) {
        context.fillStyle = "#688d41";
        context.fillRect(0, 0, w, h);
    }

    #drawBorders(viewport, width, height) {
        const {context} = viewport;
        const borderHeight = this.#world.height + 2 * height;
        const borderWidth = this.#world.width + 2 * width
        const borders = [
            viewport.toScreenCoordinates({x: -width, y: 0, width, height: borderHeight}), // left
            viewport.toScreenCoordinates({x: -width, y: -height, width: borderWidth, height}), // top
            viewport.toScreenCoordinates({x: this.#world.width, y: -height, width, height: borderHeight}), // right
            viewport.toScreenCoordinates({x: -width, y: this.#world.height, width: borderWidth, height}) // bottom
        ];
        context.globalAlpha = 0.5;
        context.fillStyle = "#000"
        for (const {x, y, width, height} of borders) {
            context.fillRect(x, y, width, height)
        }
    }
}