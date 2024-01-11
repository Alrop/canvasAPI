/** @format */
const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
// Movement keys (W, A, S, D)
let up = false,
    right = false,
    left = false,
    down = false;


// ALEKSIN RIVIT
/*
const map = [
	['#', '#', '#', '#', '#', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', '#', '#', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', '#', '#', '#', '#', '#'],
];
const level = [];

class Wall {
	constructor({ position }) {
		this.position = position;
		this.width = 50;
		this.height = this.width;
	}
	draw() {
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

// Jos i, j indexissä oleva symboli `#`, luo Wall objekti ja työnnä se level.array
map.forEach((row, i) => {
	// console.log(row, i);
	row.forEach((tile, j) => {
		// console.log(tile, j);
		if (tile == '#') {
			level.push(
				new Wall({
					position: {
						x: 50 * j,
						y: 50 * i,
					},
				})
			);
		}
	});
});

class Character {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 18;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.closePath();
	}




    
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

const player = new Character({
	position: {
		x: 50 * 1.5,
		y: 50 * 1.5,
	},
	velocity: {
		x: 1,
		y: 0,
	},
});

// Palauttaa True jos hahmo osuisi seinään seuraavassa ruudussa
function collisionDetection({ unit, wall }) {
	return (
		unit.position.y - unit.radius + unit.velocity.y <=
			wall.position.y + wall.height &&
		unit.position.x + unit.radius + unit.velocity.x >= wall.position.x &&
		unit.position.y + unit.radius + unit.velocity.y >= wall.position.y &&
		unit.position.x - unit.radius + unit.velocity.x <=
			wall.position.x + wall.width
	);
}

function animate() {
	requestAnimationFrame(animate);
	// Puhdista vanha ruutu ennen uuden piirtämistä
//	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Piirrä level.arrayn koordinaatit käyttäen Wall classin draw()
	level.forEach((square) => {
		square.draw();
		// Jos minkään seinän collisionDetection palauttaa True, pysäytä hahmo
		if (
			collisionDetection({
				unit: player,
				wall: square,
			})
		) {
			console.log('Collision detected');
			player.velocity.x = 0;
			player.velocity.y = 0;
		}
	});
	player.update();
}
animate()
*/






// TAIJAN RIVIT
/* W: 800px    H: 600px
*/
// Tämä toimii testikuvana 
// let char = 'photos/testPhoto.png';


function startGame() {
    // Luodaan uusi pelihahmo
    character = new component(50, 50, "red", 0, 320);
}
// Luodaan hahmo peliareenalle
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    // Määritellään neliö
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // UPDATE sijainnin määrittelyyn
    this.update = function() {    
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // Uuden sijainnin/tyylin määrittely tehdään täällä
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    // CLEAR ettei jää vanaa perään    
    this.clear = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}


// PUSH KEY
document.addEventListener("keydown", press);
function press(key) {
    console.log(key.keyCode + " Mitä painettiin")
    character.speedX = 0;
    character.speedY = 0;    
    if (key.keyCode == 65) { // A    left
        character.speedX = -5; } 
    if (key.keyCode == 68) {  // D    right
        character.speedX = 5; }
    if (key.keyCode == 87) { // W    up
        character.speedY = -5; }
    if (key.keyCode == 83) {  // S    down
        character.speedY = 5; }
    character.newPos();
    character.clear();
    character.update();
}