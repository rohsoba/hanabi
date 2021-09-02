
import "./vector2d"

class Sparkle {
    constructor(x, y, z, size, life, v) {
        this.x = x
        this.y = y
        this.z = z
        this._size = size
        this.time = 0
        this.life = life
        this.v = v
    }

    next() {
        this.x += this.v.x
        this.y += this.v.y

        this.v.times(AR)
        this.v.add(G)

        this.time++
    }

    isEnd() {
        return this.time >= this.life
    }

    size() {
        return this._size * ((this.life - this.time) / this.life)
    }
}

let size = 500
let dotSize = 1 / size
let context
let sparkles
const G = new Vector2d(0, -0.0001)
const AR = 0.95

function draw() {
    context.save()

    context.translate(size/2, size/2)
    context.scale(size/2, -size/2)
    context.fillStyle = "black"
    context.fillRect(-1, -1, 2, 2)

    sparkles.forEach(s => {
        context.fillStyle = "white"
        context.beginPath()
        context.arc(s.x, s.y, s.size(), 0, Math.PI*2, false)
        context.closePath()
        context.fill()
    })

    context.restore()

    next()

    requestAnimationFrame(draw)
}

function next() {
    sparkles.forEach(s => {
        s.next()
    })
    sparkles = sparkles.filter(s => !s.isEnd())
}

window.addEventListener('DOMContentLoaded', event => {
    let canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    context = canvas.getContext("2d")

    sparkles = []
    for (let i = 0; i < 500; i++) {
        let size = Math.random() * 0.04
        let angle = Math.random() * 3 * Math.PI
        let vx = Math.cos(angle) * size
        let vy = Math.sin(angle) * size
        let life = 80 + Math.random() * 20 - 10
        sparkles.push(new Sparkle(0, 0, 0, dotSize*3, life, new Vector2d(vx, vy)))
    }

    document.body.appendChild(canvas)
    draw()
})
