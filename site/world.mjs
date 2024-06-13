import Entity from "./entity.mjs";
import Player from "./player.mjs"

const defaultConfiguration = {
    width: 20000,
    height: 10000,
    treeDensity: 10,
    stoneDensity: 10
}

export default class World {
    player = new Player()
    entities = []
    width;
    height;

    generateWorld({width, height, treeDensity, stoneDensity} = defaultConfiguration) {
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < treeDensity/15000000) {
                    const tree = this.#createTree(i, j)
                    this.entities.push(tree)
                }
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < stoneDensity/15000000) {
                    const stone = this.#createStone(i, j)
                    this.entities.push(stone)
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
        console.log('tree')
        const tree = new Entity("assets/tree.png", 300, 300);
        tree.move(x, y)
        return tree;
    }

    #createStone(x, y) {
        console.log('stone')
        const stone = new Entity("assets/stone.png", 200, 200);
        stone.move(x, y)
        return stone;
    }
}
