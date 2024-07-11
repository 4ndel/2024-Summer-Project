import Entity from "./entity.mjs";
import Controls from "./components/controls.mjs";
import ImageDrawable from "./components/imageDrawable.mjs";
import Position from "./components/position.mjs";

const DEFAULT_BUILD_ITEM = 'wall';

/**
 * I keep track of what you're building and when you're building :D
 */
export default class Builder {
    building = false;
    currentBuildItem;
    baseLocation;
    baseBuilt = false;

    toggleBuilding() {
        this.setBuilding(!this.building)
    }
    
    setBuilding(value) {
        this.building = value
        if (this.building) {
            this.currentBuildItem = this.createBuildingEntity(DEFAULT_BUILD_ITEM)
        } else {
            this.currentBuildItem = undefined
        }
    }

    selectBuildingEntity(itemName) {
        this.currentBuildItem = this.createBuildingEntity(itemName)
    }

    createPlayer() {
        const player = new Entity({
            pos: new Position(170, 150),
            drawable: new ImageDrawable("assets/player.png"),
            controls: new Controls()
        })
        return player;
    }

    createTree(x, y) {
        const tree = new Entity({
            pos: new Position(300, 300),
            drawable: new ImageDrawable("assets/tree.png")
        });
        tree.pos.move(x, y);
        return tree;
    }

    createStone(x, y) {
        const stone = new Entity({
            pos: new Position(200, 200),
            drawable: new ImageDrawable("assets/stone.png")
        });
        stone.pos.move(x, y)
        return stone;
    }

    createWall() {
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 120;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/wall.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createDoor() {
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 120;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/door.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createSlowTrap(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 120;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/slow-trap.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createArrowTower(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/arrow-tower.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createCannonTower(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/cannon-tower.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createMeleeTower(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/melee-tower.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createBombTower(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/bomb-tower.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createMageTower(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/mage-tower.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createHarvester(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/harvester.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createGoldMine(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/gold-mine.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    createGoldStash(){
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(!this.baseBuilt){
            const size = 180;
            const entity = new Entity({
                pos: new Position(size, size),
                drawable: new ImageDrawable('assets/gold-stash.png')
            });
            entity.pos.move(x, y)
            return entity
        }
        return null
    }

    place(){
        const size = this.currentBuildItem.pos.width
        let x = 0
        let y = 0
        if(this.currentBuildItem != undefined){
            x = this.currentBuildItem.pos.x
            y = this.currentBuildItem.pos.y
        }
        if(this.currentBuildItem.drawable.imgSrc === 'assets/gold-stash.png'){
            this.baseBuilt = true;
            this.baseLocation = (x, y)
        }
        const entity = new Entity({
            pos: new Position(size, size),
            drawable: new ImageDrawable(this.currentBuildItem.drawable.imgSrc)
        });
        entity.pos.move(x, y)
        return entity
    }

    createBuildingEntity(itemName) {
        switch (itemName) {
            case 'wall': 
                return this.createWall()
            case 'door': 
                return this.createDoor()
            case 'slow-trap': 
                return this.createSlowTrap()
            case 'arrow-tower': 
                return this.createArrowTower()
            case 'cannon-tower': 
                return this.createCannonTower()
            case 'melee-tower': 
                return this.createMeleeTower()
            case 'bomb-tower': 
                return this.createBombTower()
            case 'mage-tower': 
                return this.createMageTower()
            case 'harvester': 
                return this.createHarvester()
            case 'gold-mine': 
                return this.createGoldMine()
            case 'gold-stash': 
                return this.createGoldStash()
        }
    }
}