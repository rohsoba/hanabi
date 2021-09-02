
let size = 300
let lineWidth = 1 / size
let canvas = document.createElement("canvas")
canvas.width = size
canvas.height = size
let context = canvas.getContext("2d")

let sparkles = []
sparkles.push(new Sparkle(0, 0))

function draw() {
    context.save()
    context.translate(size/2, size/2)
    context.scale(size*2, -size*2)
    context.fillStyle = "black"
    context.fillRect(-1, -1, 1, 1)

    sparkles.forEach(s => {
        context.fillStyle = "white"
        context.beginPath()
        context.arc(s.x, s.y, s.size, 0, Math.PI*2, false)
        context.closePath()

    })
    context.restore()

    requestAnimationFrame(draw)
}

class Sparkle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 10 / size
        this.time = 0
        this.life = 100
    }

    next() {
        this.time++
    }

    isEnd() {
        return this.time >= this.life
    }
}

window.onload = function () {
    document.body.appendChild(canvas)
    draw()
}
