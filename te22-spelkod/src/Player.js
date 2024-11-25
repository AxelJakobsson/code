import GameObject from "./GameObject";
import Projectile from "./Projectile";

export default class Player extends GameObject {
  constructor(x, y, width, height, color, game, speed) {
    super(x, y, width, height, color, game)
    this.image = new Image()
    this.image.src = "./src/assets/DinoSprites - vita.png"
    
    this.game = game

    this.speedX = 0
    this.speedY = 0
    this.frameWidth = 24
    this.frameHeight = 24
    this.frameX = 0
    this.flip = false
    this.frameY = 0
    this.maxFrames = 7
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps


    this.maxSpeedX = 0.04
    this.health = 100
    this.y = 450

    this.attackDelay = 0
    this.attackInterval = 100
  }


  update(deltaTime) {
    if (this.game.input.keys.has("ArrowLeft")) {
      this.speedX -= this.maxSpeedX
      this.flip = true
    }
    if (this.game.input.keys.has("ArrowRight")) {
      this.speedX += this.maxSpeedX
      this.flip = false
    }
    if (
      this.game.input.keys.has("ArrowRight") &&
      this.game.input.keys.has("ArrowLeft")
    ) {
      this.speedX = 0
    }

    if (this.game.input.keys.has("ArrowDown")){
      this.speedX = 0
    }

    



    if (this.game.input.keys.has(" ") || this.game.input.keys.has("ArrowUp")) {
      this.attack()
    }


    if (this.y >= 430){
      this.y = 430
      this.grounded = true
    } else {
      this.grounded = false
    }

    if (this.speedX !== 0 || this.speedY !== 0) {
      this.interval = 1000 / this.fps
      this.frameY = 0
      this.maxFrames = 9
    } else {
      this.interval = 10000 / this.fps
      this.frameY = 0
      this.maxFrames = 2
    }


    if (this.game.input.keys.has("e")) {
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
      this.x += this.speedX
        if (this.x < 0) {
          this.x = 0
          this.speedX = 0
        }


        if (this.timer > this.interval) {
          this.frameX++
          this.timer = 0
        } else {
          this.timer += deltaTime
        }
    
        if (this.frameX >= this.maxFrames) {
          this.frameX = 0
        }
        if (this.x + this.width > this.game.width) {
          this.x = this.game.width - this.width
          this.speedX = 0
        }
    
        if (this.attackDelay > 0) {
          this.attackDelay -= deltaTime
        }
      }  


    attack() {
      if (this.attackDelay > 0) return
    
      this.attackDelay = this.attackInterval
  
      this.game.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width / 2 - 2,
          this.y,
          4,
          4
        )
      )
    }
  
    takeDamage(damage) {
      this.health -= damage
      this.game.ui.triggerFlash()
      if (this.health <= 0) {
        this.game.gameOver = true
      }
    }

    draw(ctx) {
      if (this.flip) {
        ctx.save()
        ctx.scale(-1, 1)
      }
      ctx.drawImage(
        this.image,
        this.frameX * this.frameWidth,
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