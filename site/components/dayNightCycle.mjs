export default class dayNightCycle{
    time = 0;
    waves = 0;
    draw(viewport, pos){
        const {context} = viewport
        context.fillStyle = "#000"
        context.globalAlpha = 0.3
        context.fillRect(pos.x, pos.y, 160, 80)
        context.globalAlpha = 1
        context.font = "30px comfortaa"
        context.fillText("Time: " + Math.floor(this.time / 62.5), pos.x + 20, pos.y + 30)
        context.fillText("Waves: " + this.waves, pos.x + 20, pos.y + 60)
        context.font = "10px arial"

        if(this.time >= 3750){
            context.globalAlpha = 0.4
            context.fillStyle = "#242c33"
            context.fillRect(0, 0, screen.width, screen.height)
            context.globalAlpha = 1
        }
    }

    update(){
        this.time++;
        if(this.time >= 7500){
            this.time %= 7500;
            this.waves++
        }
    }

    getWaves(){
        return this.waves;
    }

    getTime(){
        return this.time;
    }
}