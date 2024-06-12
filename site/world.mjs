import Entity from "./entity.mjs";
import Player from "./player.mjs"

const defaultConfiguration = {
    width: 1000,
    height: 1000,
    treeDensity: 0.001
}

export default class World {
    player = new Player()
    entities = []
    width;
    height;

    generateWorld({width, height, treeDensity, stoneDensity} = defaultConfiguration) {
        this.width = width;
        this.height = height;
        var img = new Image();
        img.src = "assets/tree.png";
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < treeDensity) {
                    const tree = this.#createTree(i, j)
                    this.entities.push(tree)
                }
            }
        }
    }

    getMovableEntities() {
        return this.entities.filter(({anchored}) => (!anchored))
    }

    getWithinBounds(x, y, width, height) {
        return this.entities.filter(entity => {
            // TODO return if this entity dimensions collide with the bounds
            entity.x, entity.y, entity.width, entity.height
            return true
        });
    }

    #createTree(x, y) {
        console.log('creating tree')
        const tree = new Entity("assets/tree.png", 50, 50);
        tree.move(x, y)
        return tree;
    }
}
