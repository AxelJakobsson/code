export default class Layer {
    constructor(game, width, height, speed, image) {
      this.game = game
      this.width = width
      this.height = height
      this.speed = speed
      this.image = image
      this.x = 0
      this.y = 0
    }
  
    update(deltaTime) {
      if (this.x <= -this.width) {
        this.x = 0
      }
      this.x -= this.game.speed * this.speed
    }
  
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }