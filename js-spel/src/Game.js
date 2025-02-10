// import Ball from "./Ball"
import GameObject from "./GameObject.js"
import Input from "./Input.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import UserInterface from "./UserInterface.js"
import Dance from "./Dance.js"
import Background from "./Background.js"

export default class Game { // Skapar klassen
    constructor(width, height){ // Klassens konstruktor
        this.width = width
        this.height = height
        this.input = new Input(this)
        this.player = new Player(0, 0, 250, 400, "Yellow", this)
        this.keys = new Set()
        this.dance = new Dance(this)

        this.ui = new UserInterface(this)
        this.score = 0
        this.elapsedTime = 0
        this.background = new Background(this)
        this.speed = 0
        

        this.gameOver = false
        this.enemies = []
        this.pauseGame = false

        console.log("Ny instans av game ", this.width)

        this.gameObjects = [
          new GameObject(this, 0, 100, 20, 20, '#f00', 100),
          new GameObject(this, 0, 200, 20, 20, '#0f0', 200),
          new GameObject(this, 0, 300, 20, 20, '#00f', 300)
        ]
    }

    update(deltaTime) {
    if (this.gameOver) {
      return
    }
    this.background.update(deltaTime);

    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime)
    });

    this.ui.update(deltaTime)

    this.player.update(deltaTime)
    this.dance.update(deltaTime)


    if (!this.pauseGame){
      if (this.input.keys.has("Escape") && this.pauseGame == false && this.player.inputDelay > 1000) {
        this.player.inputDelay = 0
        this.ui.pauseGameText = "Paused"
        this.pauseGame = true
        console.log("pausing")
      }

      this.elapsedTime += deltaTime / 1000

      if (Math.random() < 0.01) {
        console.log("Spawn enemy")
        if (Math.random() > 0.6) {
          this.enemies.push(
            // game, x, y, width, height, startX
            new Enemy(this, 750, 450, 32, 32, 750),
          )
        }
        if (Math.random() < 0.4) {
          this.enemies.push(
            // game, x, y, width, height, startX
            new Enemy(this, 0, 450, 32, 32, 0), 
          )
        }
      }

      this.enemies.forEach((enemy) => {
          enemy.update(deltaTime)
          if (this.checkCollision(enemy, this.player)) {
            this.player.takeDamage(1)
            enemy.markedForDeletion = true
          }
          if (this.dance.buttonsPressed == this.dance.rhAmount) {
            // this.enemies.forEach((enemy) => {
            //   console.log("remove enemy")
            //   enemy.markedForDeletion = true
            // }) // removes all enemies
            enemy.markedForDeletion = true
            this.dance.buttonsPressed = 0
            this.score += 100
            this.dance.timeToSolve = 5000
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
      

      this.background.draw(ctx)
      this.gameObjects.forEach(gameObject => {
       gameObject.draw(ctx)
     })

        this.background.backgroundLayers[0].draw(ctx)
        
        
        this.enemies.forEach((enemy) => {
          enemy.draw(ctx)
        })

        this.player.draw(ctx)
        this.ui.draw(ctx)
        this.dance.draw(ctx)
      }

    // takes object a and b, checks for overlaps, returns true if collision
    checkCollision(a, b) {
        return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
  }
}

