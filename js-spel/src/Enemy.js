import GameObject from "./GameObject"
import Player from "./Player"

export default class Enemy extends GameObject {
  constructor(game, x, y, width, height, startX) {
    super(x, y, width, height, startX)
    this.game = game
    this.color = "green"
    this.speedX = 0.5 + Math.random() * 2
    this.markedForDeletion = false
    this.startX = 0
    this.removeTimer = 100
  }

  update(deltaTime) {
   // this.x += this.speedX

   if (this.x < 429 && this.x > 426.5) { // Remove the enemies if they are within player spawn
    this.markedForDeletion = true
   }
    if (this.x > 427) {
        this.x -= this.speedX
    }
    else {
        this.x += this.speedX
    }

    if (this.x > this.game.width) {
    //   this.game.player.takeDamage(0)
      this.markedForDeletion = true
    }
  }
}