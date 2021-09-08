import {Sparkle} from "./sparkle"
import {Vector2d} from "./vector2d";
import {G} from "./global";

const FIREWORK_AR = 0.95
const SPARKLE_AR = 0.95

export class Firework extends Sparkle {

    constructor(x, y, z, size, life, v, sparkles) {
        super(x, y, z, size, life, v, FIREWORK_AR, G, sparkles)
    }

    finish() {
        for (let i = 0; i < 500; i++) {
            let size = Math.random() * 0.04
            let angle = Math.random() * 3 * Math.PI
            let vx = Math.cos(angle) * size
            let vy = Math.sin(angle) * size
            let life = 80 + Math.random() * 20 - 10
            new Sparkle(this.x, this.y, 0, 3, life, new Vector2d(vx, vy), SPARKLE_AR, G, this.sparkles)
        }
    }
}
