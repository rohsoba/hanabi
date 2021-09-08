import {Sparkle} from "./sparkle"
import {Vector2d} from "./vector2d";
import {G} from "./global";
import {sparkles} from "./main";

const FIREWORK_AR = 0.95
const SPARKLE_AR = 0.95

export class Firework extends Sparkle {

    constructor() {
        let speed = 0.1
        let one = (Math.PI / 180)
        let blur = one * 20 * Math.random() - one * 10
        let angle = Math.PI / 2 + blur
        let vx = Math.cos(angle) * speed
        let vy = Math.sin(angle) * speed
        let life = 80
        super(0, 0, 0, 10, life, new Vector2d(vx, vy), FIREWORK_AR, G)
    }

    finish() {
        for (let i = 0; i < 500; i++) {
            let size = Math.random() * 4
            let angle = Math.random() * 2 * Math.PI
            let vx = Math.cos(angle) * size / 100
            let vy = Math.sin(angle) * size / 100
            let life = 80 + Math.random() * 20 - 10
            sparkles.push(new Sparkle(this.x, this.y, 0, 3, life, new Vector2d(vx, vy), SPARKLE_AR, G))
        }
    }
}
