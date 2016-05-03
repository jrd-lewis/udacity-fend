/** Helpful variables to avoid repition. */
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var COLLISION_WIDTH = 79;
var COLLISION_HEIGHT = 0;
var LEFT_COLUMN = 0;
var RIGHT_COLUMN = 505;
var RIGHT_WALL = 595;
var BOTTOM_ROW = 404;
var TOP_ROW = -11;
/**
 * Check if the player is in the same square as an enemy.
 * @function isSameSquare
 * @param {Player} player - The player being checked.
 * @param {Enemy} enemy - The enemy being checked.
 */
var isSameSquare = function(player, enemy) {
	return (player.x >= enemy.x - COLLISION_WIDTH && player.x < enemy.x + TILE_WIDTH && player.y >= enemy.y + COLLISION_HEIGHT && player.y < enemy.y + TILE_HEIGHT);
};
/**
 * Creates a new Character.
 * @class
 * @param {int} x - The initial x position of the character.
 * @param {int} y - The initial y position of the character.
 * @param {string} sprite - The sprite of the character.
 */
var Character = function(x, y, sprite) {
	this.x = x;
	this.y = y;
	this.sprite = sprite;
};
/** Draws the character on the screen.
 * @function render
 */
Character.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
 * Creates a new Enemy.
 * @class
 * @param {int} x - The initial x position of the enemy.
 * @param {int} y - The initial y position of the enemy.
 */
var Enemy = function(x, y) {
	Character.call(this, x, y, 'images/enemy-bug.png');
};
/** Adds the render function to the Enemy class and sets the constructor */
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
/** Updates the enemy's position, required method for game.
 * @function render
 * @param {int} dt - A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
	if (this.x < RIGHT_WALL) {
		this.x += TILE_WIDTH * dt;
	} else {
		this.x = LEFT_COLUMN;
	}
};
/**
 * Creates a new Player.
 * @class
 */
var Player = function() {
	var sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
	/** Chooses one of the character sprites at random for the player to use. */
	this.chosenChar = sprites[Math.floor((Math.random() * 5) + 0)];
	this.yStart = 404;
	if (this.chosenChar === sprites[4]) {
		this.yStart = 415;
	}
	Character.call(this, 202, this.yStart, this.chosenChar);
	this.score = 0;
};
/** Adds the render function to the Player class and sets the constructor */
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
/** Resets the player to their starting position.
 * @function reset
 */
Player.prototype.reset = function() {
	this.x = 202;
	this.y = this.yStart;
};
/** Resets the player and increases their score if they make it across the canvas.
 * @function update
 */
Player.prototype.update = function() {
	// If the player made it across, resets them and increases their score.
	if (this.y <= 10) {
		this.reset();
		this.score += 100;
	}
};
/** Displays the player's score in the upper left corner of the canvas.
 * @function displayScore
 */
Player.prototype.displayScore = function() {
	ctx.font = '13pt Impact';
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.strokeText('Score: ' + this.score, 15, 75);
	ctx.fillText('Score: ' + this.score, 15, 75);
};
/** Moves the player according to the value of the key being pressed.
 * @function handleInput
 * @param {string} x - The value assigned to the key being pressed.
 */
Player.prototype.handleInput = function(e) {
	switch (e) {
		case 'left':
			if (this.x > LEFT_COLUMN) {
				/** Moves the player left by the width of the tiles */
				this.x -= TILE_WIDTH;
			} else {
				this.x = RIGHT_COLUMN;
			}
			break;
		case 'right':
			if (this.x < RIGHT_COLUMN) {
				/** Moves the player right by the width of the tiles */
				this.x += TILE_WIDTH;
			} else {
				this.x = LEFT_COLUMN;
			}
			break;
		case 'up':
			if (this.y > TOP_ROW) {
				/** Moves the player up by the height of the tiles */
				this.y -= TILE_HEIGHT;
			} else {
				this.reset();
			}
			break;
		case 'down':
			if (this.y < BOTTOM_ROW) {
				/** Moves the player up by the height of the tiles */
				this.y += TILE_HEIGHT;
			}
			break;
	}
	this.update();
};
/** Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */
var allEnemies = [];
allEnemies[0] = new Enemy(0, 62);
allEnemies[1] = new Enemy(303, 62);
allEnemies[2] = new Enemy(TILE_WIDTH, 145);
allEnemies[3] = new Enemy(0, 228);
var player = new Player();
/** This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left', // Left Arrow key
		38: 'up', // Up Arrow key
		39: 'right', // Right Arrow key
		40: 'down', // Down Arrow key
		65: 'left', // A key
		68: 'right', // D key
		83: 'down', // S key
		87: 'up', // W key
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
