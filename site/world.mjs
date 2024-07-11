import Builder from "./builder.mjs";

const defaultConfiguration = {
    width: 20000,
    height: 10000,
    treeDensity: 10,
    stoneDensity: 10
}

export default class World {
    builder = new Builder()
    player = this.builder.createPlayer()
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
                    this.place(this.builder.createTree(i, j))
                }
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const flip = Math.random()
                if (flip < stoneDensity/45000000) {
                    this.place(this.builder.createStone(i, j))
                }
            }
        }
    }

    place(entity) {
        this.entities.push(entity);
    }

    getMovableEntities() {
        return this.entities;
    }
}
