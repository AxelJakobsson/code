import Game from "./Game.js";
import GameObject from "./GameObject.js";
import Dance from "./Dance.js"
// import playerImage from "./assets/DeadMoves/DeadMoves/Sprites/Player_SpriteSheet_NoGrid.png"

export default class Player extends GameObject {
  constructor(x, y, width, height, color, game, speed) {
    super(x, y, width, height, color, game)
    // super(game, 0, 300, 128, 128, "#fff", 5)

    this.image = new Image()
    // this.image.src = "./src/assets/DinoSprites - vita.png"
    this.image.src = "./src/assets/Upd_SpriteSheets/Upd_SpriteSheets/Upd_Player_SpriteSheet_NoGrid.png"

    this.game = game

    this.speedX = 0
    this.speedY = 0
    this.frameWidth = 340
    this.frameHeight = 480
    this.frameX = 0
    this.frameY = 0
    this.flip = false
    this.maxFrames = 11
    this.fps = 12
    this.timer = 0
    this.interval = 1000 / this.fps

    this.iframesTimer = 100


    this.maxSpeedX = 0.04
    this.health = 3
    this.y = 130
    this.x = 300

    this.attackDelay = 0
    this.attackInterval = 100
    this.inputDelay = 0
  }


  update(deltaTime) {

    if (this.game.gameOver == true && this.game.input.keys.has("f")){
      console.log("game  not over")
      this.game.gameOver = false
    }

    this.inputDelay += deltaTime
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
      this.interval = 1000 / this.fps
      this.frameY = 0
      this.maxFrames = 10
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
          return
        }
    
        if (this.frameX >= this.maxFrames) {
          this.frameX = 0
        }
        if (this.x + this.width > this.game.width) {
          this.x = this.game.width - this.width
          this.speedX = 0
        }
    

        this.iframesTimer += deltaTime
      }  

    takeDamage(damage) {
      if(this.iframesTimer > 300){
        this.health -= damage
        this.game.ui.triggerFlash()
        this.iframesTimer = 0
      }
      if (this.health <= 0) {
        console.log("game over")
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
        589 + this.frameX * this.frameWidth,
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