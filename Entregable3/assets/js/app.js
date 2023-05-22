"use strict";

const action = new Action();

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e){
    if(e.keyCode === 32){
        action.jump();
    }
} 

setInterval(gameLoop, 50);

function gameLoop(){

}