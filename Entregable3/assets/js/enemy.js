class Enemy extends Character{
    constructor(posX){
        super();
		this.posX = posX;
    	this.element = this.createEnemyElement();
    	this.spawn();
       
    }
    createEnemyElement(){
    	this.enemy = document.createElement("div");
        this.enemy.classList.add('enemy');
        document.getElementById('container').appendChild(this.enemy);
        return this.enemy;

    }
    spawn() {
    this.element.style.left = this.posX + "px";
  }
    status(){
        super.status();
       
    }    
}
