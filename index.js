var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth 
canvas.height = window.innerHeight
var c = canvas.getContext('2d');

var gradient

class Symbol{
    constructor(x, y, fontsize, canvasheight){
        this.characters = "生き残る生残きる生き残る楽しい"
        this.x = x
        this.y = y
        this.fontsize = fontsize
        this.canvasheight = canvasheight
        this.text = ''
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        context.fillText(this.text, this.x * this.fontsize, this.y * this.fontsize)
        if(this.y * this.fontsize > this.canvasheight && Math.random() > 0.98){
            this.y = 0
        }
        else{
            this.y += 1 
        }
    }
}
class Effect{
    constructor(canvaswidth, canvasheight){
        this.canvaswidth = canvaswidth
        this.canvasheight = canvasheight
        this.fontsize = 20
        this.colums = this.canvaswidth / this.fontsize
        this.symbol = []
        this.#initiate()
    }
    #initiate(){
         gradient = c.createRadialGradient(this.canvaswidth / 2, this.canvasheight / 2, 100, this.canvaswidth / 2, this.canvasheight / 2, 400)
        gradient.addColorStop(0, 'red')
        gradient.addColorStop(0.2, 'yellow')
        gradient.addColorStop(0.4, 'green')
        gradient.addColorStop(0.6, 'cyan')
        gradient.addColorStop(0.8, 'blue')
        gradient.addColorStop(1, 'magenta')
        for(let i = 0; i < this.colums; i++)
        {
            this.symbol[i] = new Symbol(i, 0, this.fontsize, this.canvasheight)
        }
    }
    resize(w, h){
        this.canvaswidth = w
        this.canvasheight = h
        this.colums = this.canvaswidth / this.fontsize
        this.symbol = []
        this.#initiate()
    }
}
const v = new Effect(canvas.width, canvas.height)
var lasttime = 0
var fps = 20
const nextframe = 1000/fps
var timer = 0
function animate(time){
    const dt = time - lasttime 
    lasttime = time
    if(timer > nextframe){
        c.fillStyle = "rgba(0, 0, 0, 0.05)"
        c.textAlign = 'center'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = gradient//'rgba(4, 223, 33, 1)'
        c.font = v.fontsize + 'px monospace'
        v.symbol.forEach(symbols => symbols.draw(c))
        timer = 0
    }
    else{
        timer += dt
    }
    requestAnimationFrame(animate)
}
animate(10)

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    v.resize(canvas.width, canvas.height)
})

