import Entity from "./entity.mjs";
import ImageDrawable from "./components/imageDrawable.mjs";
import Position from "./components/position.mjs";

export default class Zombie{
    createZombie(pos, moveTo){
        const zombie = new Entity({
            pos: new Position(pos.width, pos.height),
            drawable: new ImageDrawable("assets/zombie.png")
        });
        zombie.pos.move(moveTo.x, moveTo.y);
        return zombie;
    }
}