import {Vector2d} from "./vector2d"
import {Firework} from "./firework"

let size = 500
let width = size
let height = size * 1.5
let dotSize = 1 / size
let context
let sparkles = []
const G = new Vector2d(0, -0.0001)
const AR = 0.95

function draw() {
    context.save()

    context.scale(size / 2, -size / 2)
    context.translate(1, -2.9)
    context.fillStyle = "black"
    context.fillRect(-1, -0.1, 2, 3)

    sparkles.forEach(s => {
        context.fillStyle = "white"
        context.beginPath()
        context.arc(s.x, s.y, s.size() * dotSize, 0, Math.PI * 2, false)
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

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    context = canvas.getContext("2d")

    let speed = 0.1
    let angle = Math.PI / 2
    let vx = Math.cos(angle) * speed
    let vy = Math.sin(angle) * speed
    let life = 80
    new Firework(0, 0, 0, 10, life, new Vector2d(vx, vy), sparkles)

    document.body.appendChild(canvas)
    draw()
})
