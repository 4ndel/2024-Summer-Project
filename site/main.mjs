import GameEngine from "./game.mjs"

const engine = new GameEngine()

async function start() {
    await engine.init()
    engine.start()
}
    
await start()

