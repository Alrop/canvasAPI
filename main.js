/** @format */

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
// HERO MOVEMENT
const rightMove = [
	'photos/static_right.png',
	'photos/right1.png',
	'photos/right2.png',
	'photos/right3.png',
	'photos/right4.png',
];
const leftMove = [
	'photos/static_left.png',
	'photos/left1.png',
	'photos/left2.png',
	'photos/left3.png',
	'photos/left4.png',
];
let keyPress = 0;
let i = 0;
let faceDir = 'right';
// New Imaget, Saiskohan yhdistettyä yhteen käskyyn?

// BANANA
let bananaImage = new Image();
bananaImage.src = 'photos/banana.png';
bananaImage.onload = function () {
	ctx.drawImage(bananaImage, 0, 0);
};
// CITRUS
let lemonImage = new Image();
lemonImage.src = 'photos/lemon.png';
lemonImage.onload = function () {
	ctx.drawImage(lemonImage, 0, 0);
};
// ROCK COLLISION
let rockImage = new Image();
rockImage.src = 'photos/rock.png';
rockImage.onload = function () {
	ctx.drawImage(rockImage, 0, 0);
};

// ALEKSIN RIVIT
// prettier-ignore
// H: 28 riviä	W: 27
const map = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ' , ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#'],
	['#', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
];

const level = [];

class Wall {
	constructor({ position }) {
		this.position = position;
		this.width = 30;
		this.height = this.width;
	}
	draw() {
		ctx.drawImage(
			rockImage,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
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

// Määritellään hahmo
class Hero {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		// this.y ja this.x määrittävät pelaajan koon
		this.y = 40;
		this.x = this.y;
	}
	draw() {
		ctx.drawImage(heroImage, this.width, this.height, this.x, this.y);
	}
	update() {
		movement();
		this.draw();
		this.width += this.speedX;
		this.height += this.speedY;
	}
}

// Määritellään banaani lähtöruuduille
class BananaFruit {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		// Banaanin koon määrittely || Normikoko 50x50
		this.y = 50;
		this.x = 50;
	}
	draw() {
		ctx.drawImage(bananaImage, this.width, this.height);
	}
	caught() {
		this.width = Math.round(2 + Math.random() * (canvas.width - 64));
		this.height = Math.round(32 + Math.random() * (canvas.height - 64));
		this.draw();
	}
}

// Määritellään sitruuna jossain vaiheessa kentälle
class LemonFruit {
	constructor() {
		this.width = Math.round(2 + Math.random() * (canvas.width - 64));
		this.height = Math.round(32 + Math.random() * (canvas.height - 64));
		// Situunan koon määrittely || Normikoko 50x50
		this.y = 50;
		this.x = 50;
	}
	draw() {
		ctx.drawImage(lemonImage, this.width, this.height, this.x, this.y);
	}
	throw() {
		this.width = Math.round(2 + Math.random() * (canvas.width - 64));
		this.height = Math.round(32 + Math.random() * (canvas.height - 64));
		this.draw();
	}
}
// Toimisko ilman omaa nimeä (pelkkä new ....)
character = new Hero(15, 20); // lähtö sijainti
banana = new BananaFruit(220, 200); // Banaanin lähtösijainti

// Arrayn sitruunat == kuinka monta sitruunaa kentällä
lemons = [new LemonFruit(), new LemonFruit()];

// TÖRMÄYS LASKINTEN ALKU
// Palauttaa True jos "unit" törmäisi "object" seuraavassa ruudussa
function collisionDetectionA({ unit, object }) {
	return (
		// Neliön törmäys moottori
		// Ylä seinä
		unit.height + unit.speedY <= object.position.y + object.height &&
		// Ala seinä
		unit.height + unit.y + unit.speedY >= object.position.y &&
		// Oikea seinä
		unit.width + unit.x + unit.speedX >= object.position.x &&
		// Vasen seinä
		unit.width + unit.speedX <= object.position.x + object.width
	);
}
// Vaihtoehtoinen törmäys laskin
function collisionDetectionB({ unit, object }) {
	return (
		// Neliön törmäys moottori
		// Ylä seinä
		unit.height + unit.speedY <= object.height + object.y &&
		// Ala seinä
		unit.height + unit.y + unit.speedY >= object.height &&
		// Oikea seinä
		unit.width + unit.x + unit.speedX >= object.width &&
		// Vasen seinä
		unit.width + unit.speedX <= object.width + object.x
	);
}
// TÖRMÄYS LASKINTEN LOPPU

// ANIMATE LOOP ALKU
let animationId;
function animate() {
	animationId = requestAnimationFrame(animate);
	// Puhdista vanha ruutu ennen uuden piirtämistä
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Piirrä level.arrayn koordinaatit käyttäen Wall classin draw()
	level.forEach((square) => {
		square.draw();
		// Jos minkään seinän collisionDetectionA palauttaa True, pysäytä hahmo
		if (
			collisionDetectionA({
				unit: character,
				object: square,
			})
		) {
			console.log('Collision detected');
			character.speedX = 0;
			character.speedY = 0;
		}
	});

	banana.draw();
	// Banaani napataan
	if (
		collisionDetectionB({
			unit: character,
			object: banana,
		})
	) {
		console.log('Banaani karvaisessa kätösessä');
		banana.caught();
		// lottoa uudet sitruunan paikat
		lemons.forEach((lemon) => {
			lemon.throw();
		});
	}

	// Piirrä sitruunat
	lemons.forEach((lemon) => {
		lemon.draw();
		if (
			//Sitruuna napataan
			collisionDetectionB({
				unit: character,
				object: lemon,
			})
		) {
			console.log('Saatanan paha hetelmä');
			// pysäyttää ruudun
			cancelAnimationFrame(animationId);
		}
	});
	character.update();
}
// ANIMATE LOOP LOPPU

function movement() {
	let currentIMG = '';
	// NOT MOVEMENT
	if (keyPress === 0) {
		if (character.speedX < 0 || character.speedY < 0) {
			if (faceDir === 'right') {
				currentIMG = rightMove[0];
			} else {
				currentIMG = leftMove[0];
			}
		} else {
			if (faceDir === 'left') {
				currentIMG = leftMove[0];
			} else {
				currentIMG = rightMove[0];
			}
		}
		character.speedX = 0;
		character.speedY = 0;
	}
	// MOVEMENT
	else {
		if (i >= 4) {
			i = 1;
		}
		// Right
		if (keyPress === 68) {
			currentIMG = rightMove[i];
		}
		// Left
		if (keyPress === 65) {
			currentIMG = leftMove[i];
		}
		// Up & Down
		if (keyPress === 87 || 83) {
			if (faceDir === 'right') {
				currentIMG = rightMove[i];
			} else {
				currentIMG = leftMove[i];
			}
		}
		i += 1;
	}
	// Make new IMG
	heroImage = new Image();
	heroImage.src = currentIMG;
	// Tarpeeton, ja aiheuttaa apinan duplikaation kun kosketetaan sitruunaa
	// heroImage.onload = function () {
	// 	ctx.drawImage(heroImage, 0, 0);
	// };
}

// Liikkeet lyhyemmällä viiveellä, nopeampi reaktio nappiin
// PUSH KEY
document.addEventListener('keydown', press);
function press(key) {
	console.log(key.keyCode);
	character.speedX = 0;
	character.speedY = 0;
	keyPress = key.keyCode;
	if (key.keyCode === 65) {
		// A    left
		character.speedX = -2;
		faceDir = 'left';
	}
	if (key.keyCode === 68) {
		// D    right
		character.speedX = 2;
		faceDir = 'right';
	}
	if (key.keyCode === 87) {
		// W    up
		character.speedY = -2;
	}
	if (key.keyCode === 83) {
		// S    down
		character.speedY = 2;
	}
	// Tsekataan mihin suuntaan apina menee
}
// RELEASE KEY
document.addEventListener('keyup', release);
function release(key) {
	keyPress = 0;
}

animate();
