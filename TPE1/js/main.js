/**@type {HTMLCanvasElement} */
let canva = document.getElementById('canvas');
let context = canva.getContext('2d');
context.textAlign = "center";
let canvasWidth = canva.width;
let canvasHeight = canva.height;
let selectedFig = null;
let clickedFig = null;

let figures = [];
let amount_fig = 30;//cantidad de figuras


function main() {
    paintCanvas()
    createFigure();
}
//Creacion de las figuras geometricas
function createFigure() {
    if (figures.length < amount_fig) {
        addFigure(figures.length < (amount_fig / 2));
        figures[figures.length - 1].sketch();
        setTimeout(() => {
            createFigure();
        }, 100);
    }
}
//dibujo las figuras
function draw() {
    paintCanvas();
    for (let i = 0; i < amount_fig; i++) {
        figures[i].sketch();
    }
}
//color del lienzo
function paintCanvas() {
    let color = 'rgb(245, 245, 245, 0)';
    const rect = new Rect(0, 0, canvasWidth - 1, canvasHeight - 1, color, context, true);
    rect.sketch();//draw
}
//agrego las figuras
function addFigure(style) {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    if (style == true) {
        let rect = new Rect(posX, posY, Math.round(Math.random() * 200), Math.round(Math.random() * 200), color, context, false);
        figures.push(rect);
    } else {
        let ellipse = new Ellipse(posX, posY, Math.round(Math.random() * 200), Math.round(Math.random() * 200), color, context, false);
        figures.push(ellipse);
    }
}
//color random de las figuras
function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//Ejercicio c
//cuando presiono el mouse
canva.addEventListener('mousedown', (e) => {
    selectedFig = verificacion(e.layerX, e.layerY);
    clickedFig = selectedFig;
});

// verifico si las coordenadas estan dentro del canva
function verificacion(x, y) {
    for (let i = 0; i < figures.length; i++) {
        let elemento = figures[i];
        if (elemento.isPointInside(x, y)) {
            return elemento;
        }
    }
    return null;
};
//cuando dejo de presionar se libera la imagen
canva.addEventListener('mouseup', () => {
    selectedFig = null;
});
//evento para mover la imagen con el mouse
function handleMouseMove(e) {
    if (selectedFig != null) {
        selectedFig.moveTo(e.layerX, e.layerY);
    }
    context.clearRect(0, 0, canva.width, canva.height);
    draw();
}
canva.addEventListener('mousemove', handleMouseMove);

//Ejercicio Bonus:
//La figura seleccionada se movera cuando se presione las teclas flechas
window.addEventListener("keydown", function (e) {
    //console.log(clickedFig);
    //verifico si la figura esta seleccionada
    if (clickedFig !== null) {
        //obtengo la tecla presionada
        let keypressed = e.key;
        //mover la figura segun la tecla presionada
        switch (keypressed) {
            case "ArrowLeft": //flecha izquierda
                clickedFig.posX -= 10;
                break;
            case "ArrowRight":
                clickedFig.posX += 10;
                break;
            case "ArrowUp":
                clickedFig.posY -= 10;
                break;
            case "ArrowDown":
                clickedFig.posY += 10;
                break;
            default:
                return; //Sino se presiono la tecla flecha 
        }
        context.clearRect(0, 0, canva.width, canva.height);
        draw();
    }
    console.log("No hay figura seleccionada");

});

