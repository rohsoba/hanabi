export class Sparkle {
    constructor(x, y, z, size, life, v, ar, g) {
        this.x = x
        this.y = y
        this.z = z
        this._size = size
        this.time = 0
        this.life = life
        this.v = v
        this.ar = ar
        this.g = g
    }

    next() {
        this.x += this.v.x
        this.y += this.v.y

        this.v.times(this.ar)
        this.v.add(this.g)

        this.time++
    }

    isEnd() {
        return this.time >= this.life
    }

    size() {
        return this._size * ((this.life - this.time) / this.life)
    }
}
