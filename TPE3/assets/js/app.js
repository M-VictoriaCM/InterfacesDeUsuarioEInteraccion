
"use strict";
/** @type {HTMLCanvasElement} */
//Configuracion del canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
//Configuracion de las herramientas
const toolBtns = document.querySelectorAll(".tool");
const colorPicker = document.getElementById("color-picker");
const sizeSlider = document.getElementById("size-slider");
const colorBtn = document.querySelectorAll(".colors .option");
let selectedColor;
let penWidth;

//Configuracion de las opciones
const clearCanvas = document.querySelector(".clear-canvas");
const saveCanvas = document.querySelector(".save-img");

let mouseUp = true;
let mouseDown = false;
let penClick = false;
let myPen = null;
let picture =null;

/*
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*								Acciones del Mouse
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
canvas.addEventListener('mousedown', (e)=>{
	mouseDown= true;
	mouseUp = false;
	myPen = new Pen(e.offsetX, e.offsetY, selectedColor, context, penWidth); 
});

canvas.addEventListener('mouseup', (e)=>{
	mouseDown = true;
	mouseUp=false;
	myPen= null;
});
canvas.addEventListener('mousemove', (e) =>{
	if((mouseDown) && (penClick) && (myPen !== null)){
		myPen.moveTo(e.offsetX, e.offsetY);
		myPen.draw();
	}
});
/*
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*								Acciones de los botones -  paint
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
document.getElementById('pen').addEventListener('click', (e)=>{
	penClick= true;
	penWidth = 5;
	selectedColor = "black";
})
document.getElementById('eraser').addEventListener('click', (e)=>{
	penClick= true;
	penWidth = 5;
	selectedColor = "#ebebee";

});

sizeSlider.addEventListener("change", () => {
	penWidth = sizeSlider.value;
});

colorBtn.forEach(btn => {
	btn.addEventListener("click", () => {
		document.querySelector(".options .selected").classList.remove(".selected");
		selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
	});
});

colorPicker.addEventListener('change', () => {
	colorPicker.parentElement.style.background = colorPicker.value;
	colorPicker.parentElement.click();
});
/*
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*					Acciones de los botones - opciones de control
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
clearCanvas.addEventListener('click', () => {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	setCanvasBackground();
});

let file_input = document.getElementById("file");
file_input.addEventListener("change", (e) => {
    picture.upLoadImage(canvas, e.target.files[0]);
});

saveCanvas.addEventListener("click", () => {
	let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
});

let btnRestore= document.getElementById("restore");
btnRestore.addEventListener("click", function(){
	picture.restoreOriginal();
});

/*
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*							Acciones de los botones - FILTROS
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
//------------------------- FILTROS - SIMPLES  -------------------------*/
let btn_negative = document.getElementById("btnNegative");
btn_negative.addEventListener("click", (e)=>{
	picture.negative();
});

let btn_sepia = document.getElementById("btnSepia");
btn_sepia.addEventListener("click", (e)=>{
	picture.sepia();
});

let sizeGloss = document.getElementById("size-gloss"); 
sizeGloss.addEventListener("input", function(){
	let sizeGlossValue = parseInt(this.value);
	picture.brightnessValue(sizeGlossValue);
});


let sizeUmbral = document.getElementById("size-umbral"); 
sizeUmbral.addEventListener("click", (e)=>{
	picture.binarize();
});

//------------------------- FILTROS - AVANZADOS  -------------------------*/
let sizeSaturate = document.getElementById("size-saturate"); 
sizeSaturate.addEventListener("click", function(){
	picture.saturate(1.5); //1.5 es un factor para aumentar la saturacion en un 50%
	
});

let btn_sobel = document.getElementById("sobel");
btn_sobel.addEventListener("click", (e)=>{
	picture.edgeDetection();
});

/*
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*							METODO PRINCIPAL
*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const setCanvasBackground = () => {
	picture.init();
}
	
//Metodo principal	
window.addEventListener('load', (e)=>{
	picture = new Imagen(context, canvasWidth, canvasHeight);
    picture.init();
})