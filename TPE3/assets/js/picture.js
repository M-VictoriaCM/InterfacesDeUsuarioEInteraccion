/*
* @author M.Victoria Cabello Molina
* Esta clase representa a las imagenes que se subiran
* @param @type {CanvasRenderingContext2D} context - es un objeto de contexto 2D utilizado para dibujar en el canvas
* @param {number} width - es el ancho
* @param {number} height - es el alto
*/
class Imagen {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.originalImageData = null;
    } // constructor()

    init() {
        this.ctx.fillStyle = '#ebebee';
        this.ctx.fillRect(0, 0, this.width, this.height);
    } // inic()

    upLoadImage(canvas, file) {

        let miImg = null;
        miImg = new Image();
        miImg.src = URL.createObjectURL(file);
        miImg.width = canvas.width;
        miImg.height = canvas.height;
        let context = this.ctx;
        let self = this;
        miImg.onload = function () {

            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let targetWidth = canvas.width;
            let targetHeight = targetWidth / aspectRatio;
            if (targetHeight > canvas.height) {
                targetHeight = canvas.height;
                targetWidth = targetHeight * aspectRatio;
            }
            context.drawImage(this, 0, 0, targetWidth, targetHeight);
            // Copia de la imagen con los pixeles originales
            self.originalImageData = self.ctx.getImageData(0, 0, self.width, self.height);
        }
    }
     /*
    * Este metodo es para volver a la imagen a su estado original.llama al método 
    * putImageData() del contexto con los datos de píxeles originales para restaurar 
    * la imagen a su estado original
    */
     restoreOriginal() {
        if (!this.originalImageData) {
            return;
        }
        //Reemplazamos con la imagen original(es decir, la copia).
        this.ctx.putImageData(this.originalImageData, 0, 0);
    }

    /*
    * Invierte la cromatica de la imagen, convierte una imagen positiva en negativa y viceversa
    * @returns {void}
    */

    negative() {
        //obtencion de datos de la imagen
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);

        //iteracion de los pixeles de la imagen, para cambiar los valores de RGB
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i]; //Rojo
            imageData.data[i + 1] = 255 - imageData.data[i + 1];//Verde
            imageData.data[i + 2] = 255 - imageData.data[i + 2]; //Azul
        }
        //putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);
    }

    /*
    *  Da un aspecto vintage en las imagenes
    * @returns {void} 
    */
    sepia() {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;

        //se debe iterar los datos de los pixeles y se cambian los valores RGB de cada pixel:
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            /*
            * Se utiliza los valores de los coeficientes (0.393,0.769,0.189, 0.349, 0.686, 0.168, 0.272, 0.534, 0.131);
            * son los que se utilizan para este filtro.
            * Se debe hacer un algoritmo con una operacion matematica que es una multiplicacion de matrices.
                |0.393 0.769 0.189|     | red |
                |0.349 0.686 0.168|  *  |green|  la operacion basicamente es fila * columna
                |0.272 0.534 0.131|     |blue |

            */
            data[i] = Math.min(255, (0.393 * red) + (0.769 * green) + (0.189 * blue)); //red
            data[i + 1] = Math.min(255, (0.349 * red) + (0.686 * green) + (0.168 * blue));//green
            data[i + 2] = Math.min(255, (0.272 * red) + (0.534 * green) + (0.131 * blue)); //blue
        }
        //putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);
    }
    /*

    *Modifica el brillo de la imagen dependiendo del input del frontend

    * @param {number} sizeGlossValue - este dato es elegido desde el frontend
    */
    brightnessValue(sizeGlossValue) {
        if (!this.originalImageData) {
            return;
        }
        /*
        * Utilizo método createImageData() para crear una copia de los datos de píxeles de la imagen original.
        */
        let imageData = this.ctx.createImageData(this.originalImageData);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            /*
            * Recorremos los pixeles de la imagen y en cada iteracion se actualizan los valores.
            * En este la imagen es la copia de la original
            */
            data[i] = this.originalImageData.data[i] + sizeGlossValue; // rojo
            data[i + 1] = this.originalImageData.data[i + 1] + sizeGlossValue; // verde
            data[i + 2] = this.originalImageData.data[i + 2] + sizeGlossValue; // azul
            data[i + 3] = this.originalImageData.data[i + 3]; // transparencia
        }
        //putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);
    }
    /*
    * Primero la imagen se convierte a escalas de grises y luego  se binariza en un umbral de 128
    * Despues se actualiza la imagen con putImageData
    * @returns {void} 
     */
    binarize() {
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;
        //Convertir la imagen a escala de grise
        for (let i = 0; i < data.length; i += 4) {
            let half = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = half; //Rojo
            data[i + 1] = half; //Verde
            data[i + 2] = half; //Azul
        }
        //aplica la binarizacion a la imagen
        let threshold = 128;
        for (let i = 0; i < data.length; i += 4) {
            let half = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (half > threshold) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            }
        }
        //putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);

    }
    /* Detecta los bordes de la imagen dependiendo de la intensidad de la imagen 
    * @returns {void} 
    */
    edgeDetection(){
    	if(!this.originalImageData){
    		return;
    	}//Creacion de una copia de los pixeles de la imagen original
    	let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;
        let width = imageData.width;
        let height = imageData.height;

        //Se definicion del Kernel para la detencion de bordes
        const kernelX =[[-1, 0, 1],
				        [-2, 0, 2],
				        [-1, 0, 1]];

		const kernelY =[[-1, -2, -1],
				        [ 0,  0, 0],
				        [ 1,  2, 1]];
        //intensidad de los pixeles
	    let grayScala = new Array(width * height);
	    for (let i = 0; i < data.length; i += 4){
	    	let r = data[i];
	    	let g = data[i + 1];
	    	let b = data[i +2];

	    	let gray = (r + g + b)/ 3;
	    	grayScala[i /4] =gray;
	    }
        //Detectar los bordes utilizando los kernels de convolucion
	    let edgeData = new Array(width * height);
	    for (let y = 1; y < height - 1; y++){
	    	for (let x = 1; x < width - 1; x++){
	    		let magX = 0, magY =0;

	    		let index = y * width + x;
	    		for (let j = -1; j <=1; j++){
	    			for (let i = -1; i <=1; i++){
	    				let pixel = index + (j * width + i);
	    				magX += grayScala[pixel] * kernelX[j + 1][i + 1];
	    				magY += grayScala[pixel] * kernelY[j + 1][i + 1];

	    			} 
	    		} 
	    		let magnitude = Math.sqrt(magX * magX + magY * magY);
	    		if (magnitude > 255) {
				  edgeData[index] = 255;
				} else {
				  edgeData[index] = magnitude;
				}
	    	}
	    }
        //Colorea los pixeles segun la intensidad de los bordes detectados
	    for (let i = 0; i < data.length; i += 4){
	    	let edgeValue = edgeData[i/4];
	    	data[i] = edgeValue;
	    	data[i + 1] = edgeValue;
	    	data[i + 2] = edgeValue;
	    }

		//putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);
    }

    /* Modifica la saturacion de la imagen 
    * @param {number} saturation - la cantidad de saturacion de la imagen que se desea cambiar. 
    */
    saturate(saturation){
        if(!this.originalImageData){
            return;
        }//Creacion de una copia de los pixeles de la imagen original
        let imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;
        /*
        * Matriz de saturacion: es una matriz de 3 x 3 que se usa para calcular la escala de grises de un pixel
        * los valores de la matriz indican la cantidad de rojo, verde y azul  
        */    
        let transformation = [ 
                            [0.213, 0.715, 0.072],
                            [0.213, 0.715, 0.072],
                            [0.213, 0.715, 0.072]
                            ];
        //Valores de ponderación de RBG para convertir en escala de grises                    
        let r = 0.3086;
        let g = 0.6084;
        let b = 0.082;
        //Calculo de los factores de saturacion
        let s = saturation;
        let s1 = 1 - s;

        //Iteracion sobre cada pixel y aplicacion de la saturacion
        for (let i = 0; i < data.length; i += 4){
            let R = data[i];
            let G = data[i + 1];
            let B = data[i + 2];

            //calculo del valor de la escala de grises del pixel
            let gray = (r * R) + (g * G) + (b * B);

            //Aplicacion y modificacion de la saturacion de los valores RGB
            data[i] = s * R +s1 * gray;
            data[i + 1] = s * G + s1 * gray;
            data[i + 2] = s * G + s1 * gray;  
        }
        //putImageData() para dibujar la imagen modificada en el canvas
        this.ctx.putImageData(imageData, 0, 0);
    }
    
}
