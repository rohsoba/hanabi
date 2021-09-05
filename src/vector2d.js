export class Vector2d {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(v) {
        this.x += v.x
        this.y += v.y
    }

    times(m) {
        this.x *= m
        this.y *= m
    }
}
