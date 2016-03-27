// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = Math.floor(Math.random() * 300);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.move;
    if (this.x >= 440){
        this.x = 0;
    }
};

Enemy.prototype.reset = function(){
    allEnemies.x = -200;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
    
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
    
    Player.prototype.update = function(dt) {
        if (this.y > 400 || this.y <= 0){
            this.y = 400
        } else if (this.x > 410 || this.x < 0){
            this.x = 200
        }
        //if (this.checkCollisons()) {
             //allEnemies.reset();
             //this.reset();
        // }
    };
   

   Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(manuever){
    if (manuever == "right"){
        this.x = this.x + 100;
    }else if (manuever == "left"){
        this.x = this.x - 100;
    }else if (manuever == "down"){
        this.y = this.y + 50;
    }else if (manuever == "up"){
        this.y = this.y - 50;
    }
};

Player.prototype.checkCollisions = function () {
   allEnemies.forEach(function(enemy) {
    // reference to enemy in here is the actual object in the array!
    if (this.x < allEnemies.x + 100 && 
            this.x + 100 > allEnemies.x && 
            this.y < allEnemies.y + 50 && 
            this.y + 50 > allEnemies.y) {
            alert('Game Over');
            console.log(enemy.x);
            this.reset();
            allEnemies.reset();
            break;
        }  
    })
};
   
    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy1 = new Enemy(10, 60);
var enemy2 = new Enemy(10, 200);
var enemy3 = new Enemy(150, 125);

var allEnemies = [enemy1, enemy2, enemy3,];

// Place the player object in a variable called player
var player = new Player(500,500);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    });

