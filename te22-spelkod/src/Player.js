import GameObject from "./GameObject";

export default class Player extends GameObject {
  constructor(x, y, width, height, color, game, speed) {
    super(x, y, width, height, color, game)
    this.game = game
    this.image = new Image()
    this.image.src = "./src/assets/DinoSprites - vita.png"

    this.speedX = 0
    this.speedY = 0

    this.frameWidth = 24
    this.frameHeight = 24
    this.frameX = 0
    this.frameY = 0
    this.flip = false
    this.maxFrames = 6
    this.fps = 5
    this.timer = 0
    this.interval = 1000 / this.fps

    this.maxSpeed = 2.4
    this.grounded = false
    this.gravity = 1
    this.maxGravity = 3
    this.jumpVar = 40
  }


  update(deltaTime) {
    if (this.game.input.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
      this.flip = true
    } else if (this.game.input.keys.has("ArrowRight")) {
      this.flip = false
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.input.keys.has("ArrowUp") && this.grounded == true) {
      this.speedY = -this.jumpVar
    } else if (this.game.input.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    if (this.y >= 430){
      this.y = 430
      this.grounded = true
    } else {
      this.grounded = false
    }


    if (this.game.input.keys.has("e")) {
      console.log("e")
      this.width += 1
      this.height += 1
    }

    if (this.game.input.keys.has("r")) {
      console.log("r")
      if (this.width > 0 && this.height > 0) {
        this.width -= 1
        this.height -= 1
      }
      else {
        console.log("too small")
      }
    }
    if (this.game.input.keys.has("x")) {
      console.log("X: " + this.x + "Y: " + this.y)
    }

    if (this.grounded == false) {
      if (this.gravity < this.maxGravity) {
        this.gravity += 0.5
        this.timerGravity = 0
      }
      else {
        this.timerGravity += deltaTime
      }
    }
    else {
      this.gravity = 1
    }

      this.x += this.speedX
      this.y += this.speedY


      this.y += this.gravity

      if (this.timer > this.interval) {
        this.frameX++
        this.timer = 0
      } else {
        this.timer += deltaTime
      }

      if (this.frameX >= this.maxFrames) {
        this.frameX = 0
      }

      if (this.speedX !== 0) {
        this.frameY = 0
        this.maxFrames = 24
      } else {
        this.frameY = 0
        this.maxFrames = 2
      }

      if (this.speedY < 0) {
        this.frameY = 0
        this.maxFrames = 24
      }

      if (this.gravity == this.maxGravity) {
        this.frameY = 0
        this.maxFrames = 24
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
