class s extends Character{
    constructor(){
        super();
        this.charact = document.getElementById('character');
    }
    status(){
        this.charact.getBoundingClientRect();
    }
    runner(){
        this.clean();
        this.charact.classList.add('run');
    }
    jump(){
        if(this.charact.classList.contains('run')){
            this.clean();
            this.charact.classList.add('jump');
            this.charact.addEventListener("animationend", ()=>{
                this.fall();
            });
        }
    }

    fall(){
        this.clean();
        this.charact.classList.add('fall');
        this.charact.addEventListener("animationend", ()=>{
            this.runner();
        });
    }

    clean(){
        this.charact.classList.remove('run');
        this.charact.classList.remove('jump');
        this.charact.classList.remove('fall');

        this.charact.removeEventListener("animationend", () => {

        });
    }
}