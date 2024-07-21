import { GRID_SIZE } from "../constants.mjs";

/**
 * @typedef {Object} Pos
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Dim
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {(Pos & Dim)} Region
 */


export default class Position {
    // x, y represents top-left corner
    x = 0;
    y = 0;
    angle = 0;
    speed = 3;
    width;
    height;

    constructor(width, height) {
        this.width = width
        this.height = height
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Move this component by xdiff and ydiff
     * 
     * @param {number} xdiff amount to move this position in the x direction
     * @param {number} ydiff amount to move this position in the y direction
     * @returns {Rect} the new collision box after the movement
     */
    newPos(xdiff, ydiff) {
        const x = this.x + xdiff * this.speed
        const y = this.y + ydiff * this.speed
        return {x, y, width: this.width, height: this.height}
    }

    rotate(value) {
        this.angle = value;
    }

    /**
     * @param {Rect} rectangle 
     * @returns {boolean} if the rectangle collides with this object
     */
    checkCollision(pos) {
        const {x, y, width, height} = pos
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        // if (RectA.Left < RectB.Right && RectA.Right > RectB.Left &&
        // RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top ) 
        const withinHorizontal = left < x + width && right > x;
        const withinVertical = top < y + height && bottom > y;
        const hasCollision = withinHorizontal && withinVertical
        // if (hasCollision) {
        //     console.log('collision at ', pos, ' with ', this)
        // }
        return hasCollision
    }

    adjustCollision(newPos, pos) {
        const left = newPos.x;
        const right = newPos.x + newPos.width;
        const top = newPos.y;
        const bottom = newPos.y + newPos.height;
        // TODO adjust the collision
    }

    findNoNoDirection(pos){
        const {x, y, width, height} = pos
        const horizontalOrVertical = Math.abs(this.x + this.width/2 - x - width/2) >= Math.abs(this.y + this.height/2 - y - height/2)
        let noNoDirection = ""
        if(horizontalOrVertical) noNoDirection = "horizontal"
        else noNoDirection = "vertical"
        return noNoDirection
    }
}

/**
 * @param {Dim | Region} region the origin (top-left) position of the entity
 * @returns {Pos} translates the pos (at the origin) to the center of the entity
 */
export function getCenter(region) {
    const {width, height, x = 0, y = 0} = region
    return {
        x: x + (width / 2),
        y: y + (height / 2)
    }
}

/**
 * @param {Dim | Region} region the center position of the entity
 * @returns {Pos} translates the center pos to the origin of the entity
 */
export function getOrigin(region) {
    const {width, height, x = 0, y = 0} = region
    return {
        x: x - (width / 2),
        y: y - (height / 2)
    }
}

/**
 * @param {Pos} pos world origin position of an object
 * @param {number} gridSize 
 * @return {Pos} the new position snapped to the grid
 */
export function snap({x, y}, gridSize = GRID_SIZE) {
    const horizontalOffset = (x % gridSize)
    const veritcalOffset = (y % gridSize)
    return {
        x: x - horizontalOffset,
        y: y - veritcalOffset
    }
}

  /**
     * Translates a region from the source coordinates to destination coordinates
     * @param {Region | Pos} region a region in source coordinates
     * @param {Pos} sourceOrigin 
     * @param {Pos} destOrigin 
     * @returns {Region | Pos} the region in the destination coordinate system
     */
  export function translate(region, source, dest) {
    return {
        ...region,
        x: region.x + source.x - dest.x,
        y: region.y + source.y - dest.y
    }
}