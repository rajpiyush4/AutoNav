
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
        this.damaged = false
        // this.polygon
        this.#move() // this is a private method
        // this.#createPolygon()
    }

    update(roadBorders) {
        if(!this.damaged){
            this.#move()
            this.polygon = this.#createPolygon()
            this.damaged = this.#assessDamage(roadBorders)
        } 
        this.sensors.update(roadBorders)
        // console.log(this.#createPolygon())
        //  console.log( Math.tan(this.width / this.height)) 
    }

    #assessDamage(roadBorders) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polyIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        return false
    }
    //as the canvas is rotating and so we don't know cars coordinates, we need to calculate them
    #createPolygon() {
        const points = []
        const rad = Math.hypot(this.width, this.height)/2
        const alpha = Math.atan2(this.width, this.height)

        points.push(
            {
                x: this.x - Math.sin(this.angle - alpha) * rad,
                y: this.y - Math.cos(this.angle - alpha) * rad
            }
        )
        points.push(
            {
                x: this.x - Math.sin(this.angle + alpha) * rad,
                y: this.y - Math.cos(this.angle + alpha) * rad
            }
        )
        points.push(
            {
                x: this.x - Math.sin(Math.PI + (this.angle) - alpha) * rad,
                y: this.y - Math.cos(Math.PI + (this.angle) - alpha) * rad
            }
        )
        points.push(
            {
                x: this.x - Math.sin(Math.PI + (this.angle) + alpha) * rad,
                y: this.y - Math.cos(Math.PI + (this.angle) + alpha) * rad
            }
        )
        return points
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

    draw(ctx) {
        // ctx.fillStyle = this.color
        // ctx.save()
        // ctx.translate(this.x, this.y)
        // ctx.rotate(-this.angle)
        // ctx.beginPath()
        // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        // ctx.closePath()
        // ctx.restore()
        // console.log(this.damaged)
        if(this.damaged){
            ctx.fillStyle = 'red'
        }else{
        ctx.fillStyle = this.color
        }
        ctx.beginPath()
        ctx.moveTo(this.polygon[0].x , this.polygon[0].y)

        for (let i = 1; i < this.polygon.length;  i++) {//1 as already moved to first point previously
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y )
        }
        ctx.fill()
        this.sensors.draw(ctx)
    }
}