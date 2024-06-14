import Controls from "./components/controls.mjs";
import ImageDrawable from "./components/imageDrawable.mjs";
import Position from "./components/position.mjs";
import Entity from "./entity.mjs";

const defaultConfiguration = {
    width: 20000,
    height: 10000,
    treeDensity: 10,
    stoneDensity: 10
}

export default class World {
    player = this.#createPlayer()
    entities = []
    width;
    height;

    generateWorld({width, height, treeDensity, stoneDensity} = defaultConfiguration) {
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < treeDensity/45000000) {
                    const tree = this.#createTree(i, j)
                    this.entities.push(tree)
                }
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < stoneDensity/45000000) {
                    const stone = this.#createStone(i, j)
                    this.entities.push(stone)
                }
            }
        }
    }

    getMovableEntities() {
        return this.entities.filter(({anchored}) => (!anchored))
    }

    #createPlayer() {
        const player = new Entity({
            pos: new Position(170, 150),
            drawable: new ImageDrawable("assets/player.png"),
            controls: new Controls()
        })
        player.drawable.load();
        return player;
    }

    #createTree(x, y) {
        console.log('tree')
        const tree = new Entity({
            pos: new Position(300, 300),
            drawable: new ImageDrawable("assets/tree.png")
        });
        tree.pos.move(x, y);
        tree.drawable.load()
        return tree;
    }

    #createStone(x, y) {
        console.log('stone')
        const stone = new Entity({
            pos: new Position(200, 200),
            drawable: new ImageDrawable("assets/stone.png")
        });
        stone.pos.move(x, y)
        stone.drawable.load()
        return stone;
    }
}
