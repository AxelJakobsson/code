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
        
    }


}