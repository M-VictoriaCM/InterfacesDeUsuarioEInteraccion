"use strict";
/*=============== Configuracion del loop ===============*/

if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init);
}

function Init(){
    Loop();
}
/*=============== DECLARACIÓN DE VARIABLES ===============*/
let maxGameTime = 60; 
let timeLeft= maxGameTime;

let animationId;
let floorY = 42;
let floorX = 0; 

let speed = 0;
let speedY = 0;
let speedEscenario = 1280/3;
let gameSpeed = 1;
let gameSpeedInitial=gameSpeed;
let gameIncrease = 1;

let score =0;
const maxScore=10;
const increase = 5;
const decreaseTime = 2;
const increaseTime = 2;

let timeObstacles=2;
let obstacles = [];
let monedas = [];

let timeMaxEnemy = 4;
let timeMinEnemy = 2;
let timeRandom=0;

let characterY = floorY;
let characterX=200;
let stopped = false;
let jumping= false;

let impulse = 1000;
let gravity = 2500;

let action = new Action();
let coins = new Coin(200);
let noColision = false;

let floor = document.querySelector('.floor');
let contenedor = document.getElementById('container');
 /*=============== Configuracion del loop ===============*/
function Loop(){
    animationId =requestAnimationFrame(Loop);
    let currentTime = new Date();
    let time = currentTime;
    let deltaTime = (currentTime - time)/ 1000;
    
    if(!stopped){
       Update(deltaTime); 
       //Detener el juego cuando se alcanza un puntaje maximo o se acaba el tiempo
       if( increaseScores() >= maxScore || timeLeft<= 0){
        cancelAnimationFrame(animationId);
       }
    }
    CheckGameEnd(deltaTime);
}
function Update(deltaTime) {/*Funcion principal del juego */
    moveCharacter(deltaTime); 
    moveFloor(deltaTime);
    createObstacles(deltaTime);
    moverObstacles(deltaTime);
    DectionColision();


    speedY -= gravity * deltaTime;

    let colisionMoneda = coins.detectCoinCollision(action);
    if(colisionMoneda){
      increaseScores();
      coins.coin.remove();
      speedTime();
    }
    
} 

function CheckGameEnd(deltaTime){
  timeLeft-= deltaTime;
  timeLeft= Math.max(timeLeft, 0); //Se asegura que el tiempo no sea negativo
  updatetimeLeft();
  //Se verifica si se acabo el tiempo y el jugador esta ganando
  if(timeLeft<= 0 && score < maxScore){
    //El jugador perdio
    gameOver(); 
  }
}
function updatetimeLeft(){
  //Para mostrar en el HTML
  const elementtimeLeft= document.querySelector('.time_left');
  elementtimeLeft.textContent = Math.ceil(timeLeft);//Se redondea para mostrar un numero entero
}

/*======================== ESCENARIOS =========================*/
function moveFloor(deltaTime){/*Esta funcion mueve el suelo*/
    floorX += computeOffset(deltaTime);
    floor.style.left = -(floorX % contenedor.clientWidth) + "px";
}
/*===================== ESTADOS DEL JUEGO =====================*/
function gameOver(){/*esta funcion se ejecuta cuando el personaje pierde */
  action.crash();
  let gameOve = document.querySelector(".game-over");
  gameOve.style.display = "block";

  // Pausar todas las animaciones en el juego
  const allElements = document.querySelectorAll('*');
  allElements.forEach((element) => {
    const computedStyle = getComputedStyle(element);
    const animationName = computedStyle.animationName;

    if (animationName !== "none") {
      element.style.animationPlayState = "paused";
    }
  });
  // Cancelar la animación recursiva
  cancelAnimationFrame(animationId);
  //Se reinician las variales de speedocidad, puntaje y tiempo restante
  speed =0;
  speedY = 0;
  gameSpeed = gameSpeedInitial;
  score = 0;
  timeLeft= maxGameTime;

  increaseScores();
  updatetimeLeft();
}

function increaseScores(){/*Funcion para incrementar el puntaje */
  score += 1;
  let scoreElement = document.querySelector('.score');
  scoreElement.textContent = score;
}
function speedTime(){
  gameSpeed += gameIncrease;
  timeLeft-= decreaseTime;
  updatetimeLeft();
}


/*===================== ENEMIGOS =====================*/
function createObstacles(deltaTime){/*Funcion para crear los enemigos */
  if (Math.random() >= 0.5) {
    const posX = contenedor.clientWidth;

    // Comprueba si hay un enemigo existente en la misma posición
    const hasExistingEnemy = obstacles.some((obstacle) => obstacle.posX === posX);

    if (!hasExistingEnemy) {
      const enemy = new Enemy();
      enemy.posX = posX;
      enemy.element.style.left = posX + "px";
      obstacles.push(enemy);
    }

    timeObstacles = calculateTimeCreationObstacles();
  }
}

function calculateTimeCreationObstacles() { /*Calculo el tiempo en el cual se generan los enemigos */
  return timeMinEnemy + Math.random() * 
  (timeMaxEnemy - timeMinEnemy) / gamespeed;
}
function computeOffset(deltaTime){
    timeObstacles -= deltaTime;
    if(timeObstacles <= 0){
        createObstacles(deltaTime);
        timeObstacles = calculateTimeCreationObstacles();
    }
}

function moverObstacles(deltaTime) {/*Funcion para mover los enemigos y hacerlos desplzar*/
  removeObstaclesInvisibles();
  const containerWidth = contenedor.clientWidth;
  
  for (let i = obstacles.length - 1; i >= 0; i -= 1) {
    const obstacle = obstacles[i];
    const desplazamiento = calculateObstacleDisplacement(deltaTime);

    obstacle.posX -= desplazamiento;

    if (obstacle.posX < -obstacle.clientWidth) {
      removeObstacle(i);
      
    } else {
      obstacle.element.style.left = obstacle.posX + "px";
    }
  }
}
function removeObstaclesInvisibles() {/*Esta funcion es para que no se multiplique la imagen */
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    if (obstacle.posX + obstacle.clientWidth < 0) {
      removeObstacle(i);
    }
  }
}
function calculateObstacleDisplacement(deltaTime){/*Esta funcion es para calcular el tiempo del desplazamiento */
   timeObstacles -= deltaTime;
  if (timeObstacles <= 0) {
    createObstacles(deltaTime);
    timeObstacles = calculateTimeCreationObstacles();
  } 
  return speedEscenario * deltaTime;
}

function removeObstacle(index) {
  const obstacle = obstacles[index];
  obstacle.parentNode.removeChild(obstacle);
  obstacles.splice(index, 1);
}
/*===================== MONEDAS =====================*/

/*===================== ACCIONES DEL PERSONAJE =====================*/
function moveCharacter(deltaTime){/*Esta funcion es para mover el personaje */
    characterY += speed * deltaTime;
    if(characterY < floorY){
        touchFloor();
    }
}
function jump(){/*Esta funcion es para que el personaje salte */
    if(characterY === floorY){
        jumping= true;
        speedY = impulse;
        action.jump();
    }
}
function touchFloor(){/*Esta funcion es para corra el personaje */
    characterY = floorY;
    speedY = 0;
    if(jumping){
        action.runner();
    }
    jumping= false;
}
function starry(){/*Esta funcion es para que el personaje pierda*/
    action.crash();
    stopped = true;
}

/*===================== PERSONAJE VS. ENEMIGOS =====================*/
function DectionColision(){ /*Esta funcion es para que el personaje detecte el enemigo y pierda */
    for(let i=0; i< obstacles.length; i++){
        if(obstacles[i].posX > characterY + action.getWidth()){
        }else if(isCollision(obstacles[i])){
          gameOver();
        }
    }
}
function isCollision(obstacle){
    return action.detectCollision(obstacle);
}


/*===================== COMANDO =====================*/
function handleKeyDown(e){ /*Comando del juego */
    if(e.keyCode === 32){
      jump();
    }
} 
document.addEventListener('keydown', handleKeyDown);








