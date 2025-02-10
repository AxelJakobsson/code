import Game from "./Game.js";
import Background from "./Background.js"
import Dance from "./Dance.js"

export default class UserInterface {
    constructor(game) {
      this.game = game
      this.color = ["black", "red", "blue", "purple"]
      this.flashTime = 0
      this.color_number = 1
      this.color_length = this.color.length
      this.delay = 500
      this.array = []
      this.array.length = (2 ** 32) -1
      this.delay_time = 5000
      this.pauseGameText = ""
      this.background = new Image();
      this.background.src = "./src/assets/DeadMoves/DeadMoves/Background/Background_Assembled.png";

      this.dance = new Dance()
    }
  
    update(deltaTime) {
      if (this.flashTime > 0) {
        this.flashTime -= deltaTime
        if (this.flashTime < 0) {
          this.flashTime = 0
        }
      }

    //   if(this.game.input.keys.has("c")){
    //     this.triggerFlash()
    //   }
    // if(this.game.input.keys.has("x") && this.delay <= 0){
    //     if (this.color_number > this.color_length){
    //         this.color_number = 0
    //         this.delay = 500
    //     }
    //     else {
    //         this.color_number += 1
    //         this.delay = 500
    //     }
    // }
    if (this.delay > 0) {
        this.delay -= deltaTime
      }
    }
  
    draw(ctx) {
      if (this.flashTime > 0) {
        ctx.fillStyle = "rgba(0, 0, 0, 1)"
        ctx.fillRect(0, 0, this.game.width, this.game.height)
      }
      ctx.fillStyle = this.color[this.color_number]
      ctx.font = "20px Ubuntu"
      ctx.fillText(`Score: ${this.game.score}`, 20, 40)
  
      ctx.fillStyle = "white"
      ctx.font = "20px Ubuntu"
      ctx.fillText(`Time: ${this.game.elapsedTime.toFixed(1)}s`, 20, 70)
  
      ctx.fillStyle = "white"
      ctx.font = "20px Ubuntu"
      ctx.fillText(`Health: ${this.game.player.health}`, 20, 100)

      ctx.fillStyle = "black"
      ctx.font = "100px Ubuntu"
      ctx.fillText(this.pauseGameText, 300, 480/2)
    }
  
    triggerFlash(duration) {
      this.flashTime = duration || 0.1
    }
  }