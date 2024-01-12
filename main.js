/** @format */
const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
// Movement keys (W, A, S, D)
let up = false,
	right = false,
	left = false,
	down = false;

// ALEKSIN RIVIT
const map = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
	['#', '#', ' ', ' ', ' ', '#', ' ', '#', '#'],
	['#', ' ', '#', '#', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', '#', '#', '#', '#', '#'],
	['#', '#', '#', '#', '#', '#'],
	['#', ' ', ' ', ' ', ' ', '#', ' ', '#', '#'],
	['#', ' ', '#', '#', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];
const level = [];

class Wall {
	constructor({ position }) {
		this.position = position;
		this.width = 30;
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
						x: 30 * j - 30,
						y: 30 * i - 30,
					},
				})
			);
		}
	});
});

// Määritellään pallo
class Component {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.color = 'red';
		this.radius = 12;
		this.speedX = 0;
		this.speedY = 0;
	}
	// Piiretään pallo
	draw() {
		ctx.beginPath();
		ctx.arc(this.width, this.height, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	// upataan pallo ja nopeus sille
	update() {
		this.draw();
		this.width += this.speedX;
		this.height += this.speedY;
	}
}
// Luodaan uusi pelihahmo
character = new Component(350, 150);

// Palauttaa True jos hahmo osuisi seinään seuraavassa ruudussa
function collisionDetection({ unit, wall }) {
	return (
		unit.height - unit.radius + unit.speedY <=
			wall.position.y + wall.height &&
		unit.width + unit.radius + unit.speedX >= wall.position.x &&
		unit.height + unit.radius + unit.speedY >= wall.position.y &&
		unit.width - unit.radius + unit.speedX <= wall.position.x + wall.width
	);
}

function animate() {
	requestAnimationFrame(animate);
	// Puhdista vanha ruutu ennen uuden piirtämistä
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Piirrä level.arrayn koordinaatit käyttäen Wall classin draw()
	level.forEach((square) => {
		square.draw();
		// Jos minkään seinän collisionDetection palauttaa True, pysäytä hahmo
		if (
			collisionDetection({
				unit: character,
				wall: square,
			})
		) {
			console.log('Collision detected');
			character.speedX = 0;
			character.speedY = 0;
		}
	});
	character.update();
}

// TAIJAN RIVIT
/* W: 800px    H: 600px
 */
// Tämä toimii testikuvana
// let char = 'photos/testPhoto.png';

// PUSH KEY
document.addEventListener('keydown', press);
function press(key) {
	console.log(key.keyCode + ' Mitä painettiin');
	character.speedX = 0;
	character.speedY = 0;
	if (key.keyCode == 65) {
		// A    left
		character.speedX = -5;
	}
	if (key.keyCode == 68) {
		// D    right
		character.speedX = 5;
	}
	if (key.keyCode == 87) {
		// W    up
		character.speedY = -5;
	}
	if (key.keyCode == 83) {
		// S    down
		character.speedY = 5;
	}
}

// RELEASE KEY
document.addEventListener('keyup', release);
function release(key) {
	character.speedX = 0;
	character.speedY = 0;
}

animate();
