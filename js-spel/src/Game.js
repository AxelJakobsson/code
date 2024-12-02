// import Ball from "./Ball.js"
import GameObject from "./GameObject.js"
import Input from "./Input.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import UserInterface from "./UserInterface.js"

export default class Game { // Skapar klassen
    constructor(width, height){ // Klassens konstruktor
        this.width = width
        this.height = height
        this.input = new Input(this)
        this.player = new Player(427, 0, 50, 50, "Yellow", this)
        this.keys = new Set()

        this.ui = new UserInterface(this)
        this.score = 0
        this.elapsedTime = 0

        this.gameOver = false
        this.enemies = []
        this.pauseGame = false

        console.log("Ny instans av game ", this.width)
        // x, y, width, height, color, speed
        this.box = new GameObject(40, 100, 200, 200, "Purple")
        this.box1 = new GameObject(0, 0, 60, 60, "Green")
    }

    update(deltaTime) {
    if (this.gameOver) {
      return
    }
    if (!this.pauseGame){
      if (this.input.keys.has("Escape") && this.pauseGame == false && this.player.inputDelay > 1000) {
        this.player.inputDelay = 0
        this.ui.pauseGameText = "Paused"
        this.pauseGame = true
        console.log("pausing")
      }

      this.elapsedTime += deltaTime / 1000
      this.ui.update(deltaTime)

      this.player.update(deltaTime)
      if (Math.random() < 0.06) {
        console.log("Spawn enemy")
        this.enemies.push(
          // game, x, y, width, height, startX
          new Enemy(this, Math.random() * (this.width - 32), 450, 32, 32, Math.random() * (this.width - 32)), 
        )
      }

      // this.box.update(deltaTime)
      // this.box1.update(deltaTime)
      // this.ball.update(deltaTime)
      this.player.update(deltaTime)

      this.enemies.forEach((enemy) => {
          enemy.update(deltaTime)
          if (this.checkCollision(enemy, this.player)) {
            this.player.takeDamage(1)
            enemy.markedForDeletion = true
          }
        })
        this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
      }
      else {
        this.player.inputDelay += deltaTime
        

        if (this.input.keys.has("Escape")  && this.pauseGame == true && this.player.inputDelay > 1000) {
          this.ui.pauseGameText = ""
          this.pauseGame = false
          console.log("unpausing")
          this.player.inputDelay = 0
        }
      }
}

    

    draw(ctx) {

    //    this.box.draw(ctx)
    //    this.box1.draw(ctx)
    //    this.ball.draw(ctx)
    this.enemies.forEach((enemy) => {
        enemy.draw(ctx)
    })
      this.ui.draw(ctx)

       this.player.draw(ctx)
    }

    // takes object a and b, checks for overlaps, returns true if collision
    checkCollision(a, b) {
        return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
  }
}

