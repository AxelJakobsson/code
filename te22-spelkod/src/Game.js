import Ball from "./Ball.js"
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
        this.player = new Player(0, 0, 50, 50, "Yellow", this)
        this.keys = new Set()

        this.projectiles = []
        this.enemies = []

        this.ui = new UserInterface(this)
        this.score = 0
        this.elapsedTime = 0
    
        this.gameOver = false

        console.log("Ny instans av game ", this.width)
        // x, y, width, height, color, speed
        this.box = new GameObject(40, 100, 200, 200, "Purple")
        this.box1 = new GameObject(0, 0, 60, 60, "Green")
        this.ball = new Ball(300, 400, 100, 100, "Blue")
    }

    update(deltaTime) {
        if (this.gameOver) {
            return
        }

        this.elapsedTime += deltaTime / 1000
        this.ui.update(deltaTime)
    
        this.player.update(deltaTime)
        this.projectiles.forEach((projectile) => {
          projectile.update(deltaTime)
        })
        if (Math.random() < 0.06) {
          console.log("Spawn enemy")
          this.enemies.push(
            new Enemy(this, Math.random() * (this.width - 32), 0, 32, 32),
          )

        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            if (this.checkCollision(enemy, this.player)) {
              this.player.takeDamage(10)
              enemy.markedForDeletion = true
            }
          })
        }

        // this.box.update(deltaTime)
        // this.box1.update(deltaTime)
        // this.ball.update(deltaTime)
        this.player.update(deltaTime)

        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            if (this.checkCollision(enemy, this.player)) {
              this.player.takeDamage(10)
              enemy.markedForDeletion = true
            }
          })
      
          this.projectiles.forEach((projectile) => {
            this.enemies.forEach((enemy) => {
              if (this.checkCollision(projectile, enemy)) {
                this.score += 10
                projectile.markedForDeletion = true
                enemy.markedForDeletion = true
              }
            })
          })
          this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
          this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
    } 

    draw(ctx) {
        this.projectiles.forEach((projectile) => {
            projectile.draw(ctx)
          })
          this.enemies.forEach((enemy) => {
            enemy.draw(ctx)
          })
          this.ui.draw(ctx)

    //    this.box.draw(ctx)
    //    this.box1.draw(ctx)
    //    this.ball.draw(ctx)
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

