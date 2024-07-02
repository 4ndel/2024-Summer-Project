export default class Position {
    // x, y represents top-left corner
    x = 0;
    y = 0;
    angle = 0;
    speed = 3;
    width;
    height;

    constructor(width, height) {
        this.width = width;
        this.height = height;
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
     * @returns if the rectangle collides with this object
     */
    checkCollision({x, y, width, height}) {
        const right = this.x + this.width;
        const bottom = this.y + this.height;
        // if (RectA.Left < RectB.Right && RectA.Right > RectB.Left &&
        // RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top ) 
        const withinHorizontal = this.x < x + width + screen.width/2 && right > x + screen.width/2;
        const withinVertical = this.y < y + height + screen.height/2 && bottom > y + screen.height/2;
        // console.log(withinHorizontal && withinVertical);
        return withinHorizontal && withinVertical
    }
}