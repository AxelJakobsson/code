import GameObject from "./GameObject";

export default class Player extends GameObject{
    constructor(x, y, width, height, color, game, speed){ 
        super(x, y, width, height, color, game)
    this.game = game
    this.speedX = 0
    this.speedY = 0
    this.maxSpeedX = 0.5
    this.maxSpeedY = 1
    }


    update(deltaTime) {
        if(this.game.input.keys.has("ArrowLeft")){
            console.log("pil vänster")
            this.speedX -= this.maxSpeedX
        }
        if(this.game.input.keys.has("ArrowRight")){
            console.log("pil höger")
            this.speedX += this.maxSpeedX
        }
        if (!this.game.input.keys.has("ArrowRight") && !this.game.input.keys.has("ArrowLeft")) {
            this.speedX = 0
        }

        if (this.game.input.keysUp.has("ArrowUp")){
            this.y -= 5
        }


        if (this.y > 430){
            console.log("reached floor")
        }
        else {
            this.y += 3
        }
        

        if (this.game.input.keys.has("e")){
            console.log("e")
                this.width += 1
                this.height += 1
        }

        if (this.game.input.keys.has("r")){
            console.log("r")
            if (this.width > 0 && this.height > 0){
                this.width -= 1
                this.height -= 1
            }
            else {
                console.log("too small")
            }
        }
        this.x += this.speedX
    }


}