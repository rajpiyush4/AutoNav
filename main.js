const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
 canvas.width = 200
 canvas.height = window.innerHeight

 const road = new Road({x:canvas.width/2,width:canvas.width*0.9 || 200,})
const carDimensions = {
    x: 100,
    y: 100,
    width: 30,
    height: 50,
    color: 'whitesmoke'
}
const car = new Car(carDimensions)
const traffic = [
    new Car({x:road.getLaneCenter(1), y:-100,width:30,height:50,color:'red'}),
]

function animate(){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.border)
        
    }
    car.update(road.border)
    canvas.height = window.innerHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(0, -car.y+canvas.height*.7)

    road.draw(ctx)
    car.draw(ctx)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx)
    }
    ctx.restore()
    requestAnimationFrame(animate)
}
animate()
console.log(road.border, road.border.lengths, Sensors.rays)
