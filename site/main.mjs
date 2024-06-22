import GameEngine from "./game.mjs"

const engine = new GameEngine()
window.engine = engine

async function start() {
    await engine.init()
    engine.start()
}
    
await start()