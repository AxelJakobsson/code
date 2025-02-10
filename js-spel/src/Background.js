import Layer from './Layer.js'

export default class Background {
    constructor(game) {
      this.game = game
      this.width = 854
      this.height = 480
      this.bg = new Image()
      this.bg.src = "./src/assets/DeadMoves/DeadMoves/Background/Background_Assembled.png"
    //   this.fg = new Image()
    //   this.fg.src = "./src/assets/DeadMoves/DeadMoves/Background/Background_Assembled.png"
  
      this.backgroundLayers = [
        new Layer(this.game, this.width, this.height, 1, this.bg),
        // new Layer(this.game, this.width, this.height, 0.3, this.fg)
      ]
    }
  
    update(deltaTime) {
      this.backgroundLayers.forEach(layer => {
        layer.update(deltaTime)
      })
    }
  
    draw(ctx) {
      this.backgroundLayers.forEach(layer => {
        layer.draw(ctx)
      })
    }
  
  }