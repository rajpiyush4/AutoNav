class Sensors{
    constructor(car){
        this.car = car
        this.rayLength = 100
        this.rayCount = 5
        this.raySpread = Math.PI/3
        this.rays=[]
        this.readings=[]
        // this.#castRays()
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

    #getReading(ray, roadBorders){
           let touches = []
           for (let i = 0; i < roadBorders.length; i++) {
                 const touch = getIntersection(
                    ray[0],
                    ray[1],
                    roadBorders[i][0],
                    roadBorders[i][1]
                 )
                    if(touch){
                        touches.push(touch)
                    }
           }

           if(touches.length == 0){
            return null
           }
           else{
            const offsets = touches.map(touch => touch.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(touch => touch.offset == minOffset)
           }
    }

    draw(ctx){
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1]
            if(this.readings[i]){
                end = this.readings[i]
            }
            
            ctx.strokeStyle = 'gold'
            ctx.lineWidth = 2  
            ctx.beginPath()
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
            // ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()


            ctx.strokeStyle = 'red'
            ctx.lineWidth = 2  
            ctx.beginPath()
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y) //draw from tip of ray
            // ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
            ctx.lineTo(end.x, end.y)
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
