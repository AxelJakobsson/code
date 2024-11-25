import GameObject from "./GameObject";

export default class Projectile extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.speedY = -4
    this.color = "yellow"
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y < 0) {
      this.markedForDeletion = true
    }
  }
}