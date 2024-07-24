import World from "./world.mjs"
import { isDebug } from "./constants.mjs";
import BackgroundDrawable from "./components/backgroundDrawable.mjs";
import {snap, getOrigin, getCenter} from "./components/position.mjs"
import DebugDrawable from "./components/debugDrawable.mjs";
import Viewport from "./viewport.mjs";

/**
 * I'm responsible for all the rules of the game. I bring everything together.
 */
export default class GameEngine {
    /**
     * @prop {Viewport}
     */
    viewport;
    debugDrawable;
    isBuilding;
    background
    world = new World()

    async init() {
        const { player } = this.world
        const { buildingPreview } = this.world
        this.world.generateWorld();
        this.background = new BackgroundDrawable(this.world)

        await player?.drawable?.load()
        await buildingPreview?.drawable?.load()
        for (const entity of this.world.entities) {
            const promise  = entity?.drawable?.load()
        }
        const viewport = this.viewport = new Viewport(this.world);
        this.debugDrawable = new DebugDrawable(viewport, player.controls, this.world);
        player.controls.listen();
    }

    start() {
        const engine = this
        setInterval(() => {
            engine.draw()
        }, 16);
    }

    draw() {
        this.moveEntities()
        this.#drawBackground()
        this.drawEntities()
        this.updateTime()
        this.spawn()
        this.updateBuilding()
        this.placeBuilding()
        this.debugDrawable.draw()
        this.cleanup()
    }

    cleanup() {
        const { player } = this.world
        player.controls.reset()
    }

    spawn(){
        const { dayNightCycle } = this.world
        const { zombie } = this.world
        const { player } = this.world
        const zombieAmount = ((dayNightCycle.getWaves() * 10) % 100) + 10
        if(dayNightCycle.getTime() === 3750){
            for(let i = 0; i < zombieAmount; i++){
                this.world.place(zombie.createZombie(player.pos, {x: Math.floor(Math.random()*500) - 250 + player.pos.x, y: Math.floor(Math.random()*500) - 250 + player.pos.y}))
            }
        }
    }

    #drawBackground() {
        const {player} = this.world
        const pos = {
            x: player.pos.x,
            y: player.pos.y,
            ...this.viewport.getDims()
        }
        this.background.draw(this.viewport)
    }

    updateTime(){
        const { dayNightCycle } = this.world
        dayNightCycle.update()
        dayNightCycle.draw(this.viewport, {x: 50, y:screen.height * 0.8})
    }

    updateBuilding() {
        const { player: {controls}, builder } = this.world
        if (controls.isPressed('b')) {
            builder.toggleBuilding()
        }
        if (builder.building) {
            const buildName = controls.getBuildEntityName()
            if (buildName) {
                builder.selectBuildingEntity(buildName)
            }
            const buildingPreview = builder.currentBuildItem
            if (buildingPreview) {
                this.#drawBuildingPreview(buildingPreview)
            }
        }
    }

    #drawBuildingPreview(buildingPreview) {
        const pos = this.#getSnappedBuilding(buildingPreview)
        
        this.viewport.context.globalAlpha = 0.5;
        buildingPreview.drawable?.draw?.(this.viewport);
    }

    /**
     * @param {*} buildingPreview 
     * @returns {import("./components/position.mjs").Pos} the snapped world coordinates for the building
     */
    #getSnappedBuilding(buildingPreview) {
        const player = this.world.player
        const controls = player.controls
        const mousePos = this.viewport.toWorldCoordinates(controls.followMouse())
        const buildingOrigin = getOrigin(mousePos, buildingPreview.pos)
        return snap(buildingOrigin);
    }

    placeBuilding() {
        const { builder } = this.world
        const { player } = this.world
        const { controls } = player
        const buildEntity = builder.currentBuildItem
        if (builder.building && buildEntity && controls.leftClick) { 
            const building = builder.place()
            const pos = this.#getSnappedBuilding(building)
            building.pos.move(pos.x, pos.y)
            if (this.checkEntityCollision(building.pos).length === 0 && !player.pos.checkCollision(building.pos)) {
                this.world.place(building)
            }
        }
    }

    moveEntities() {
        // player/collision
        const player = this.world.player
        const speed = player.pos.speed
        const movement = player.controls.getMovement();
        const xdiff = movement.xdiff * speed;
        const ydiff = movement.ydiff * speed;
        const nextPos = player.pos.newPos(xdiff, ydiff);
        const collided = this.checkEntityCollision(nextPos)
        if(collided.length <= 0 && this.#isWithinWorld(nextPos)) {
            player.pos.move(nextPos.x, nextPos.y)
        } else {
            if(!collided.length <= 0){
                const noNoDirection = collided[0].pos.findNoNoDirection(nextPos)
                if(noNoDirection === "horizontal") player.pos.move(player.pos.x, nextPos.y)
                else player.pos.move(nextPos.x, player.pos.y)
            }
        }
    }

    /**
     * 
     * @param {import("./components/position.mjs").Region} region 
     */
    #isWithinWorld({x, y, width, height}) {
        const world = this.world
        const withinHorizontal = x >= 0 && x + width <= world.width
        const withinVertical = y >= 0 && y + height <= world.height
        return withinHorizontal && withinVertical
    }

    checkEntityCollision(pos) {
        return this.world.entities.filter(entity => entity.pos.checkCollision(pos))
    }

    drawEntities() {
        const { player } = this.world
        const center = this.viewport.getCenter()

        for (const entity of this.world.entities) {
            const screenPos = this.viewport.toScreenCoordinates(entity.pos)
            entity?.drawable?.draw?.(this.viewport)
        }

        this.#drawPlayer()
        
    }

    #drawPlayer() {
        const player = this.world.player
        player.pos.angle = player.controls.getMovement().angle
        const {width, height} = player.pos
        const center = this.viewport.getCenter()
        const pos = getOrigin({width, height, ...center})

        player?.drawable?.drawScreen?.(this.viewport, pos);
    }
}

