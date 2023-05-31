class Action extends Character{
    constructor(){
        super();
       
        this.charact = document.getElementById('character');
    }
    status(){
        this.charact.getBoundingClientRect();
    }
    getWidth(){
        this.charact.clientHeight;
    }
    runner(){//Metodo para que el personaje corra
        this.clean();
        this.charact.classList.add('run');
    }
    jump(){//Metodo para que el personaje salte
        if(this.charact.classList.contains('run')){
            this.clean();
            this.charact.classList.add('jump');
            this.charact.addEventListener("animationend", ()=>{
                this.fall();
            });
        }
    }

    fall(){//Metodo para que el personaje caiga
        this.clean();
        this.charact.classList.add('fall');
        this.charact.addEventListener("animationend", ()=>{
            this.runner();
        })
    }
    detectCollision(enemy){
       const characterRect = this.charact.getBoundingClientRect();
        const enemyRect = enemy.enemy.getBoundingClientRect();

    // Verificar si hay colisión entre los rectángulos del personaje y el enemigo
    if (
      characterRect.left < enemyRect.right &&
      characterRect.right > enemyRect.left &&
      characterRect.top < enemyRect.bottom &&
      characterRect.bottom > enemyRect.top) {
      // Colisión detectada, hacer algo (por ejemplo, llamar al método 'crash')
            
        return true;
        }else{
            return false;
        }   
    }
    
    crash(){//Metodo para que el personaje se estrelle
        this.clean();
        this.charact.classList.add('crash');
        this.charact.addEventListener("animationend", ()=>{
            this.crash();
        })
    }

    clean(){//Metodo para remover las clases
        this.charact.classList.remove('run');
        this.charact.classList.remove('jump');
        this.charact.classList.remove('fall');
        this.charact.removeEventListener("animationend", () => {
        });
    }
    
}