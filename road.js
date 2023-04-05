class Road {
    constructor({ x, width, lanecount = 3 }) {
        this.x = x
        this.width = width
        this.lanecount = lanecount
        this.left = this.x - this.width / 2
        this.right = this.x + this.width / 2
        this.infinity = 10000000
        this.top = -this.infinity
        this.bottom = this.infinity

        const topLeft = { x: this.left, y: this.top }
        const topRight = { x: this.right, y: this.top }
        const bottomLeft = { x: this.left, y: this.bottom }
        const bottomRight = { x: this.right, y: this.bottom }
        this.border=[
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    

    // getLaneCenter(laneIndex) {
    //     const laneWidth = this.width / this.lanecount
    //     return ((this.left + laneWidth/2) +(Math.min(laneIndex, this.lanecount-1 )*laneWidth))
    // }

    draw(ctx) {
        ctx.lineWidth = 2
        ctx.strokeStyle = 'white'

        for (let i = 1; i <= this.lanecount-1; i++) {//1, lanecount-1 because we don't want to draw the border here
            let lanes = lerp(this.left, this.right, i / this.lanecount)

            ctx.setLineDash([20, 20]);

            ctx.beginPath() 
            ctx.moveTo(lanes, this.top)
            ctx.lineTo(lanes, this.bottom)
            ctx.stroke()
            ctx.closePath()
  
            ctx.setLineDash([])
            ctx.beginPath()
            this.border.map(borders => {
                ctx.moveTo(borders[0].x, borders[0].y)
                ctx.lineTo(borders[1].x, borders[1].y)
            })
            ctx.stroke()

        }

    }


}

