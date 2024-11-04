import GameObject from "./GameObject.js"

export default class Game { // Skapar klassen
    constructor(width, height){ // Klassens konstruktor
        this.width = width
        this.height = height
        console.log("Ny instans av game ", this.width)
        this.box = new GameObject(40, 100, 200, 200, "Purple")
    }

    update(deltaTime) {
        this.box.update(deltaTime)
    } 

    draw(ctx) {
       this.box.draw(ctx)
    }
}

