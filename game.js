var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastPressed = false;
var timeout = 0;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}

function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;

	if (downPressed == true) {
		var newTop = positionTop + 1;
		var element = document.elementFromPoint(positionLeft, newTop + 46);


		if (element.classList.contains('cactus') == false) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk down';
	}
	if (upPressed == true) {
		var newTop = positionTop - 1;
		var element = document.elementFromPoint(positionLeft, newTop);

		if (element.classList.contains('cactus') == false) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk up';
	}

	if (upPressed == true) {
		var newTop = positionTop - 1;
		var element = document.elementFromPoint(newLeft + 32, positionTop);

		if (element.classList.contains('cactus') == false) {
			player.style.left = newLeft + 'px';
		}
		player.style.top = newTop + 'px';
		player.className = 'character walk up';
	}
	if (leftPressed == true) {
		var newLeft = positionLeft - 1;
		var element = document.elementFromPoint(newLeft, positionTop);


		if (element.classList.contains('cactus') == false) {
			player.style.left = newLeft + 'px';
		}
		player.className = 'character walk left';
	}
	if (rightPressed == true) {
		var newLeft = positionLeft + 1;
		var element = document.elementFromPoint(newLeft + 32, positionTop);

		if (element.classList.contains('cactus') == false) {
			player.style.left = newLeft + 'px';
		}
		player.className = 'character walk right';
	}
}

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

function myLoadFunction() {

    var start = document.getElementsByClassName('start')[0];
    start.addEventListener('click', startGame);
}
//This function is used so that when you press start the game starts, and also it shows the positions of the tanks
function startGame() {

    var start = document.getElementsByClassName('start')[0];
    start.style.display = 'none';
    start.removeEventListener('click', startGame)

    timeout = setInterval(move, 10);
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    positionTanks();
    settanks = setInterval(positionTanks, 3000)
}

function positionTanks() {
    var tanks = document.getElementsByClassName('tank');
    for(var i = 0; i < tanks.length; i++) {
        var random = Math.ceil(Math.random() * 10);
        tanks[i].style.top = random + '0vh';

        var bomb = document.createElement('div');
        bomb.classList = 'bomb';
        bomb.style.top = tanks[i].offsetTop + 25 +'px';
        bomb.style.left = tanks[i].offsetLeft + 50 + 'px';
        document.body.appendChild(bomb);

        moveBomb(bomb);
    }
}
//this function is used to make sure when the character goes near a bomb it should stay dead, and the game would ask you to play again
function gameOver() {
    clearInterval(timeout);
    clearInterval(settanks);
    document.removeEventListener('keydown', keydown);
    document.removeEventListener('keyup', keyup);

    var player = document.getElementById('player');
    player.classList = 'character stand down dead';
    var start = document.getElementsByClassName('start')[0];
    start.style.display = 'block';
    start.firstChild.nodeValue = 'Play Again?';
    start.addEventListener('click', restart);
}

function restart() {

    var bombs = document.getElementsByClassName('bomb');
    while(bombs[0]) {
        bombs[0].parentNode.removeChild(bombs[0]);
    }

    var explosions = document.getElementsByClassName('explosion');
    while(explosions[0]) {
        explosions[0].parentNode.removeChild(explosions[0]);
    }

    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
    lastPressed = false;

    var player = document.getElementById('player');
    player.classList = 'character stand down';
    player.style.left = 200 + 'px';
    player.style.top = 88 + 'vh';

    startGame();
}

//This function is used to make the bomb explode
function moveBomb(bomb) {


        var left = bomb.offsetLeft;
        var speed = Math.ceil(Math.random() * 30);
		var randomExplosion = Math.ceil(Math.random()*window.innerWidth)

        setInterval(function(){
            left--;

            if(left > randomExplosion) {
                bomb.style.left = left + 'px';
            }
                else {
                bomb.classList = 'explosion'
            }
        }, speed);
    

    var player = document.getElementById('player');
    var topLeft = document.elementFromPoint(player.offsetLeft, player.offsetTop);
    var topRight = document.elementFromPoint(player.offsetLeft, player.offsetTop);

    if (topLeft.classList.contains('explosion') || topRight.classList.contains('explosion'))
    {
        gameOver();
    }
}

document.addEventListener('DOMContentLoaded', myLoadFunction);