//use strict
//declaration of Enemy object
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.boundry = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if (this.x < this.boundry){
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//created Hero class
class Hero {
    constructor(){
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x=this.startX;
        this.y=this.startY;
        this.victory = false;
        this.sprite = 'images/char-horn-girl.png';  
        this.live = 5;
        this.score = 0;
        this.gameOver = false;

    } 
render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }

   handleInput(input){
       switch(input){
           case 'left':
           if (this.x > 0){
           this.x -= this.step;
            }
           break;
           case 'right':
           if (this.x < this.step * 4){
           this.x += this.step;
            }
           break;
           case 'up':
           if (this.y > 0){
               this.y -= this.jump;
            }
           break;
           case 'down':
           if(this.y < this.jump * 4){
           this.y += this.jump;
            }
           break;
        }

   }
resetHero(){
    this.y = this.startY;
    this.x = this.startX;
}

decreaseLive(){
    const liveCount = document.querySelector('.live');
    this.live--;
    alllives.pop();
    liveCount.innerHTML = this.live;
}

increaseScore(){
    const scoreC = document.querySelector('.score')
    this.score += 10;
    scoreC.innerHTML = this.score;
}
 checkGameOver(){
     if (this.live === 1 ){
         this.gameOver =true;
     }
 }

 reset() {
    const scoreCount = document.querySelector('.score');
    const livesCount = document.querySelector('.live');
    this.score = 0;
    this.live = 5;
    alllives =[ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540),new Lives(100, 540), new Lives(130, 540)];
    scoreCount.innerHTML = this.score;
    livesCount.innerHTML = this.live;
 }



update(){
    for (let enemy of allEnemies){
        if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x 
            && enemy.x < this.x + this.step/2 )){
        this.checkGameOver();
        this.resetHero();
        this.decreaseLive();
        }

        if (this.y === -28){
                this.increaseScore(); 
                this.resetHero();
        }
            }   
        }
    }

    

//declaration of playler     
const player = new Hero();

//declaration of bugs (by using Enemy object)
const bug1 = new Enemy(-101,0,200);
const bug2 = new Enemy(-101,83,300);
const bug3 = new Enemy(252,83,300);
const bug4 = new Enemy(151,166,400);


const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);


//declaration of Hearts object
var Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 27, 40);
}

//defined alllives array that includes Hearts
var alllives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540),new Lives(100, 540), new Lives(130, 540)];



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
