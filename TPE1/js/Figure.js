class Figure {
    constructor(posX, posY, width, height, fill, context, style) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.context = context;
        this.style = style;
    }

    sketch(){

    }

    moveTo(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    

    isPointInside(x, y){
        return null;
    }

   
    selected(style) {
        this.style = style;
    }

}
