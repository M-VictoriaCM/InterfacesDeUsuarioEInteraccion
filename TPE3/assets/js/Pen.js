/*
* @author M.Victoria Cabello Molina
* Esta clase utiliza para dibujar y borrar en el canvas
* @param {number} posX - posicion del eje X
* @param {number} posY - posicion del eje Y
* @param {String} fill - color o relleno
* @param {CanvasRenderingContext2} context - Contexto del canvas que se va a dibujar
* @param {number} width - ancho del trazo del lapiz o el borrador
*/
class Pen{
	constructor(posX, posY, fill, context, width){
		this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = context;
        this.fill = fill;
        this.width = width;
	}//contructor

    /*
    * Mueve la posicion actual del puntero a las coordenadas especificas por los argumentos 
    * @param {number} posX 
    * @para {number} posY
    * @returns {posX, posY} - actualiza las coordenadas
    */
	moveTo(posX, posY) {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }

    /*
    * Dibuja la linea en el canvas desde la posicion anterior hasta la actual
    * @returns {void}
    */
    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.fillStyle = this.fill;//color de la linea
        this.ctx.lineWidth = this.width;//ancho de la linea
        context.lineJoin = context.lineCap = 'round';//estilo de la linea
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
	
}

/*Pen(e.offsetX, e.offsetY, colorPicker, context, sizeSlider); 

/*let startDraw = (e) => {
	isDrawing = true;
	prevMouseX = e.offsetX;
	prevMouseY = e.offsetY
	context.lineJoin = context.lineCap = 'round';//estilo de la
	context.lineWidth = penWidth;//ancho de la linea
	context.strokeStyle = selectedColor;//color de la linea
	context.fillStyle = selectedColor;
	context.beginPath();
}
*/