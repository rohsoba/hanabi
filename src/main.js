import {Firework} from "./firework"

let size = 500
let width = size
let height = size * 1.5
let dotSize = 1 / size
let context
export let sparkles = []
let nextShot = 0

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

    if (--nextShot <= 0) {
        nextShot = 40 + Math.random() * 20
        sparkles.push(new Firework())
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    context = canvas.getContext("2d")

    document.body.appendChild(canvas)
    draw()
})
