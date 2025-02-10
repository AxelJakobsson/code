import Game from "./Game.js";
import UserInterface from "./UserInterface.js";

export default class Dance {
    constructor(game) {
      this.game = game
      this.rhKeys = ["z", "x", "c"] // The buttons that it can choose between to add to the other array
      this.timeToSolve = 5000 // 5s to clear the buttons before it refreshes
      this.rhAmount = 3 // Amount of keys that you have to press
      this.pressButtons = [] // The buttons you have to press
      this.randomIndex = 0
      this.buttonsPressed = 0
      this.buttonPressDelay = 1000
      this.inputDelay = 0
      this.zKeyHandled = false
      this.xKeyHandled = false
      this.cKeyHandled = false
    }

    update(deltaTime) {
        this.timeToSolve += deltaTime
        this.buttonPressDelay += deltaTime
        this.inputDelay -= deltaTime

        if (this.timeToSolve >= 5000) {
            this.pressButtons.length=0
            this.timeToSolve = 0
            for (let i = 0; i < this.rhAmount; i++) {
                this.randomIndex = Math.floor(Math.random() * this.rhKeys.length)
                this.pressButtons.push(this.rhKeys[this.randomIndex])
                console.log(this.pressButtons)
            }
        }
        if (this.pressButtons[0] == "z") {
            if (this.game.input.keys.has("z") && !this.zKeyHandled && this.inputDelay < 0 ){
                this.game.input.keys.clear();
                this.zKeyHandled = true
                this.inputDelay = 0
                console.log("z pressed")
                this.pressButtons.shift()
                console.log(this.pressButtons)
                this.buttonsPressed += 1
            }
            else if (this.game.input.keys != "z" && this.game.input.keys.size < 0) {
                this.inputDelay = 2000
                this.timeToSolve = 4999
                console.log("incorrect input z")
            }
        }
        if (!this.game.input.keys.has("z")) {
            this.zKeyHandled = false;
        }
        if (this.pressButtons[0] == "x") {
            if (this.game.input.keys.has("x") && !this.xKeyHandled && this.inputDelay < 0){
                this.game.input.keys.clear();
                this.xKeyHandled = true
                this.inputDelay = 0
                console.log("x pressed")
                this.pressButtons.shift()
                console.log(this.pressButtons)
                this.buttonsPressed += 1
            }
            else if (this.game.input.keys != "x" && this.game.input.keys.size > 0) {
                this.inputDelay = 2000
                this.timeToSolve = 4999
                console.log("incorrect input x")
            }
        }
        if (!this.game.input.keys.has("x")) {
            this.xKeyHandled = false;
        }
        if (this.pressButtons[0] == "c") {
            if (this.game.input.keys.has("c") && !this.cKeyHandled && this.inputDelay < 0){
                this.game.input.keys.clear();
                this.cKeyHandled = true
                this.inputDelay = 0
                console.log("c pressed")
                this.pressButtons.shift()
                console.log(this.pressButtons)
                this.buttonsPressed += 1
            }
            else if (this.game.input.keys != "c" && this.game.input.keys.size > 0) {
                this.inputDelay = 2000
                this.timeToSolve = 4999
                console.log("incorrect input c")
            }
        }
        if (!this.game.input.keys.has("c")) {
            this.cKeyHandled = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "80px Ubuntu"
        ctx.fillText(this.pressButtons, 350, 100)
    }
}