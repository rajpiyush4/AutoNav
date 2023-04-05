class Sensors{
    constructor(car){
        this.car = car
        this.rayLength = 100
        this.rayCount = 3
        this.raySpread = Math.PI/4
        this.rays=[]
        this.readings=[]
        this.#castRays()
    }

    update(roadBorders){
       this.#castRays()
       this.readings=[]

       for (let i = 0; i < this.rays.length; i++) {
        this.readings.push(
            this.#getReading(this.rays[i], roadBorders)
        )
       }
    }

    draw(ctx){
        ctx.strokeStyle = 'gold'
        ctx.lineWidth = 2  
        for (let i = 0; i < this.rayCount; i++) {
            ctx.beginPath()
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.stroke()
            
        } 
    }

    #castRays(){
        this.rays=[]
        for (let i = 0; i < this.rayCount; i++) {
               const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, i/(this.rayCount==1?.5: this.rayCount-1))+this.car.angle
               const start= {x: this.car.x, y: this.car.y}
                const end = {x: this.car.x - Math.sin(rayAngle)*this.rayLength, y: this.car.y - Math.cos(rayAngle)*this.rayLength}
                this.rays.push([start, end])
            
        }
    }
}