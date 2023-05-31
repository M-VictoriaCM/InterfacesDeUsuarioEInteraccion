class Coin extends Character{
	constructor(posX){
        super();
		this.posX = posX;
    	this.element = this.createEnemyElement();
   
       
    }
    createEnemyElement(){
    	this.coin = document.createElement("div");
        this.coin.classList.add('coins');
        document.getElementById('container').appendChild(this.coin);
        return this.coin;

    }
   
    status(){
        super.status();
       
    }  
    detectCoinCollision(charact){
        const rectCharacter = charact.element.getBoundingClientRect();
        const rectCoin = this.coin.getBoundingClientRect();

        if(rectCharacter.left < rectCoin.right &&
            rectCharacter.right > rectCoin.left &&
            rectCharacter.top < rectCoin.bottom &&
            rectCharacter.bottom > rectCoin.top){
            return true;
        }else{
            return false;
        }
    }
}
