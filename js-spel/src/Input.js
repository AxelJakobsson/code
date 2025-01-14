export default class Input {
    constructor() {
        this.game = game
        this.keys = new Set()
        this.keysUp = new Set()
        // this.keysUp = new Set()


        window.addEventListener("keydown", (event) => {
            // console.log(event.key)
            this.keys.add(event.key)
        })



        window.addEventListener("keyup", (event) => {
            this.keysUp.add(event.key)
            this.keys.delete(event.key)
        })

        // window.addEventListener("mousemove", (event) => {
        //     console.log("X: " + event.offsetX + " Y: " + event.offsetY)
        // })
    }
}