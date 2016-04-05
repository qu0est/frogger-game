// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 60;
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
    this.width = 20;
    this.height = 60;
};
//Checks when player and enemy collide and resets when they do
Player.prototype.checkCollisions = function () {
    allEnemies.forEach(function(enemy) {
    // reference to enemy in here is the actual object in the array!
    if((this.x + this.width) >= (enemy.x) && 
    (this.x) <= (enemy.x + enemy.width) && 
    (this.y + this.height) >= (enemy.y) && 
    (this.y) <= (enemy.y + enemy.height)){
         this.resetGame();
         alert('DO NOT BUG OUT, TRY AGAIN!!!')
         console.log(player.x);
        }
    }.bind(this));
};
//Keeps player in confines of game
Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);

    if (this.x < 40 || this.x > 400) {
        if(this.x < 40){
            this.x = 0;
        }else{
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if(this.y < 0){
            this.resetGame();
            alert('YOU MADE IT!!!');
        }else{
            this.y = 400;
        }
    }
};
//Player position resets when collision occurs and when he reaches water
Player.prototype.resetGame = function () {
  this.x = 200;
  this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//allows player to move within the confines of the game
Player.prototype.handleInput = function(manuever){
    if (manuever == "right"){
        this.x = this.x + 80;
    }else if (manuever == "left"){
        this.x = this.x - 80;
    }else if (manuever == "down"){
        this.y = this.y + 50;
    }else if (manuever == "up"){
        this.y = this.y - 50;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//Creates enemy bugs
var enemy1 = new Enemy(10, 60);
var enemy2 = new Enemy(10, 200);
var enemy3 = new Enemy(150, 125);

var allEnemies = [enemy1, enemy2, enemy3,];

// Place the player object in a variable called player
var player = new Player(200,400);

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
    
