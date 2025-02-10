import GameObject from "./GameObject.js"
import Player from "./Player.js"

export default class Enemy extends GameObject {
  constructor(game, x, y, width, height, startX) {
    super(x, y, width, height, startX)
    this.game = game
    this.image = new Image()
    this.image.src = "./src/assets/Upd_SpriteSheets/Upd_SpriteSheets/Upd_Nisse_SpriteSheet_NoGrid.png"
    this.color = "green"
    this.speedX = 3
    this.markedForDeletion = false
    this.startX = 0
    this.removeTimer = 100
    this.health = 3
    this.y = 300
    this.height = 140
    this.width = 140

    this.frameWidth = 240
    this.frameHeight = 240
    this.frameX = 0
    this.frameY = 0
    this.flip = false
    this.maxFrames = 6
    this.fps = 12
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(deltaTime) {
   if (this.timer > this.interval) {
    this.frameX++
    this.timer = 0
  } else {
    this.timer += deltaTime
    return
  }

  if (this.frameX >= this.maxFrames) {
    this.frameX = 0
  }
  if (this.x + this.width > this.game.width) {
    this.x = this.game.width - this.width
    this.speedX = 3
  }

   if (this.x < 500 && this.x > 300) { // Remove the enemies if they are within player spawn
    this.markedForDeletion = true
   }
    if (this.x > 427) { 
        this.x -= this.speedX
    }
    else {
        this.x += this.speedX
        this.flip = true
    }

    if (this.x > this.game.width) {
    //   this.game.player.takeDamage(0)
      this.markedForDeletion = true
    }

  }

  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    ctx.drawImage(
      this.image,
      240 + this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height,
    )
    if (this.flip) {
      ctx.restore()
    }
  }

}