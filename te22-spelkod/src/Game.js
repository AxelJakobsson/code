import Ball from "./Ball.js"
import GameObject from "./GameObject.js"
import Input from "./Input.js"
import Player from "./Player.js"

export default class Game { // Skapar klassen
    constructor(width, height){ // Klassens konstruktor
        this.width = width
        this.height = height
        this.input = new Input(this)
        this.player = new Player(0, 0, 50, 50, "Yellow", this)

        console.log("Ny instans av game ", this.width)
        // x, y, width, height, color, speed
        this.box = new GameObject(40, 100, 200, 200, "Purple")
        this.box1 = new GameObject(0, 0, 60, 60, "Green")
        this.ball = new Ball(300, 400, 100, 100, "Blue")
    }

    update(deltaTime) {
        this.box.update(deltaTime)
        this.box1.update(deltaTime)
        this.ball.update(deltaTime)
        this.player.update(deltaTime)
    } 

    draw(ctx) {
       this.box.draw(ctx)
       this.box1.draw(ctx)
       this.ball.draw(ctx)
       this.player.draw(ctx)
    }
}

