export default class Position {
    // x, y represents top-left corner
    x = 0;
    y = 0;
    angle = 0;
    speed = 5;
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

    moveDiff(xdiff, ydiff) {
        const x = this.x + xdiff * this.speed
        const y = this.y + ydiff * this.speed
        this.move(x, y);
    }

    rotate(value) {
        this.angle = value;
    }

    checkCollision({x, y, width, height}) {
        // TODO improve collision detection
        const maxx = x + width;
        const maxy = y + height;
        if (this.x >= x && this.x <= maxx) {
            if (this.y >= y && this.y <= maxy) {
                return true;
            }
        }
        return false;
    }
}