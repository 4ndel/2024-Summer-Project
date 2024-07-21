import Entity from "./entity.mjs";
import ImageDrawable from "./components/imageDrawable.mjs";
import Position from "./components/position.mjs";

export default class Zombie{
    createZombie(pos){
        const zombie = new Entity({
            pos: new Position(pos.width, pos.height),
            drawable: new ImageDrawable("assets/zombie.png")
        });
        zombie.pos.move(pos.x, pos.y);
        return zombie;
    }
}