
class Car {
    constructor({ x, y, width, height, color }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.speed = 0
        this.acceleration = .2
        this.friction = .05
        this.maxspeed = 3
        this.angle = 0
        this.controls = new Controls()
        this.sensors = new Sensors(this)
        this.#move() // this is a private method
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.angle)
        ctx.beginPath()
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        ctx.closePath()
        ctx.restore()
        this.sensors.draw(ctx)
    }
    update(roadBorders) {
        this.#move()
        this.sensors.update(roadBorders)

    }
    #move() {
        if (this.speed > 0) {
            this.speed = this.speed - this.friction
        }
        if (this.speed < 0) {
            this.speed = this.speed + this.friction
        }
        if (Math.abs(this.speed) < this.friction) {
            //otherwise the car will never stop but will keep going at a very slow speed
            this.speed = 0
        }
        if (this.speed > this.maxspeed + 3) {
            this.speed = this.maxspeed + 3
        }
        if (this.speed < -this.maxspeed) {
            this.speed = -this.maxspeed
        }

        if (this.controls.forward) {
            this.speed = this.speed + this.acceleration
        }
        if (this.controls.back) {
            this.speed = this.speed - this.acceleration

        }
        // this.y -= this.speed
        this.x -= this.speed * Math.sin(this.angle)
        this.y -= this.speed * Math.cos(this.angle)


        if (this.controls.left) {
            this.angle += .03

        }
        if (this.controls.right) {
            this.angle -= .03

        }
    }

}