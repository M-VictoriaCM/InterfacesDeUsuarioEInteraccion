class Ellipse extends Figure {
    constructor(posX, posY, width, height, fill, context, style) {
        super(posX, posY, width, height, fill, context, style);
    }
    sketch() {
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.ellipse(this.posX, this.posY, this.width / 2, this.height / 2, 0, 0, (2 * Math.PI));
        this.context.fill();
        if (this.estilo)
            this.context.stroke();
    }
    
    isPointInside(x, y){
        let dx = (x- this.posX);
        let dy = (y- this.posY);
        let radiusX = (this.width / 2);
        let radiusY = (this.height/2);
        
        return (((dx * dx)/(radiusX * radiusX))+((dy * dy))/(radiusY * radiusY)<=1);
    }
    
}
