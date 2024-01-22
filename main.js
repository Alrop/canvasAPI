/** @format */
document.getElementById('bgMusic').play();
const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
// HERO MOVEMENT
let currentIMG = '';
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
let i = 0;
let score = 0;

let faceDir = 'right';
// New Imaget, Saiskohan yhdistettyä yhteen käskyyn?
// HERO
let heroImage = new Image();
heroImage.src = 'photos/static_right.png';
// BANANA
let bananaImage = new Image();
bananaImage.src = 'photos/banana.png';
// CITRUS
let lemonImage = new Image();
lemonImage.src = 'photos/lemon.png';
// ROCK COLLISION
let rockImage = new Image();
rockImage.src = 'photos/rock.png';

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

// MUTE OR NOT
function checkMute() {
	if (document.getElementById('bgMusic').muted === true) {
		document.getElementById('bgMusic').muted = false;
		document.getElementById('bananaCaught').muted = false;
		document.getElementById('lemonCaught').muted = false;
		document.getElementById('mute').src = 'photos/sound_on.png';
	} else {
		document.getElementById('bgMusic').muted = true;
		document.getElementById('bananaCaught').muted = true;
		document.getElementById('lemonCaught').muted = true;
		document.getElementById('mute').src = 'photos/sound_off.png';
	}
}

class Wall {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.width = 30;
		this.height = this.width;
	}
	draw() {
		ctx.drawImage(rockImage, this.x, this.y, this.width, this.height);
	}
}

// Jos i, j indexissä oleva symboli `#`, luo Wall objekti ja työnnä se level.array
map.forEach((row, i) => {
	row.forEach((tile, j) => {
		if (tile == '#') {
			level.push(new Wall((x = 30 * j - 30), (y = 30 * i - 30)));
		}
	});
});

// OBJECTS
class Hero {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		// Määritellään pelaajan koko
		this.height = 40;
		this.width = this.height;
	}
	draw() {
		ctx.drawImage(heroImage, this.x, this.y, this.width, this.height);
	}
}

class BananaFruit {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		// Banaanin koon määrittely || Normikoko 50x50
		this.width = 50;
		this.height = 50;
	}
	draw() {
		ctx.drawImage(bananaImage, this.x, this.y, this.width, this.height);
	}
	caught() {
		this.x = Math.round(2 + Math.random() * (canvas.width - 64));
		this.y = Math.round(32 + Math.random() * (canvas.height - 64));
	}
}

class LemonFruit {
	constructor() {
		this.x = Math.round(2 + Math.random() * (canvas.width - 64));
		this.y = Math.round(32 + Math.random() * (canvas.height - 64));
		this.x = Math.round(2 + Math.random() * (canvas.width - 64));
		this.y = Math.round(32 + Math.random() * (canvas.height - 64));
		// Situunan koon määrittely || Normikoko 50x50
		this.width = 50;
		this.height = 50;
	}
	draw() {
		ctx.drawImage(lemonImage, this.x, this.y, this.width, this.height);
	}
	throw() {
		this.x = Math.round(2 + Math.random() * (canvas.width - 64));
		this.y = Math.round(32 + Math.random() * (canvas.height - 64));
	}
}
character = new Hero(15, 20); // lähtö sijainti
banana = new BananaFruit(200, 150); // Banaanin lähtösijainti
lemons = [new LemonFruit(), new LemonFruit()]; // Arrayn sitruunat == kuinka monta sitruunaa kentällä

// TÖRMÄYS LASMIKEN ALKU
// Palauttaa True jos "unit" törmäisi "object" seuraavassa ruudussa
function collisionDetectionA({ unit, object }) {
	return (
		// Neliön törmäys moottori
		// Ylä seinä
		unit.y + unit.speedY <= object.y + object.height &&
		// Ala seinä
		unit.y + unit.height + unit.speedY >= object.y &&
		// Oikea seinä
		unit.x + unit.width + unit.speedX >= object.x &&
		// Vasen seinä
		unit.x + unit.speedX <= object.x + object.width
	);
}
// Vaihtoehtoinen törmäys laskin
// unit = hero	Object = Lemon // Banaana
function collisionDetectionB(unit, object) {
	return (
		// Neliön törmäys moottori
		// Ylä seinä
		unit.y <= object.y + object.height &&
		// Ala seinä
		unit.y + unit.height >= object.y &&
		// Oikea seinä
		unit.x + unit.width >= object.x &&
		// Vasen seinä
		unit.x <= object.x + object.width
	);
}

// TÖRMÄYS LASKINTEN LOPPU

let animationId;
// ANIMATE LOOP ALKU
function animate() {
	animationId = requestAnimationFrame(animate);
	// Puhdista vanha ruutu ennen uuden piirtämistä
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	character.draw();

	// Piiretään alussa banaanit ja sitruunat ja sit tsekataan sijainnit
	banana.draw();
	lemons.forEach((lemon) => {
		lemon.draw();
	});

	// Piirrä level.arrayn koordinaatit käyttäen Wall classin draw()

	level.forEach((square) => {
		square.draw();
		// Tarkistetaan osuuko banaan seinään tai pelaajaan. Jos kyllä niin lottoa uusi paikka, muuten piirrä
		if (collisionDetectionB(banana, square)) {
			while (
				collisionDetectionB(banana, square) ||
				collisionDetectionB(banana, character)
			) {
				banana.caught();
			}
		} else {
			banana.draw();
		}

		// Tarkistetaan osuuko minkään sitruunan uusi paikka seinään, pelaajaan, tai banaaniin. Jos kyllä niin lottoa uusi paikka, muuten piirrä
		lemons.forEach((lemon) => {
			if (collisionDetectionB(lemon, square)) {
				while (
					collisionDetectionB(lemon, square) ||
					collisionDetectionB(lemon, character) ||
					collisionDetectionB(lemon, banana)
				) {
					lemon.throw();
				}
			} else {
				lemon.draw();
			}
			// Banaani napataan

			if (
				collisionDetectionA({
					unit: character,
					object: banana,
				})
			) {
				console.log('Banaani karvaisessa kätösessä');
				document.getElementById('bananaCaught').play();
				banana.caught();
				score += 1;
				document.getElementById('points').innerHTML = score;

				// lottoa uudet sitruunan paikat
				lemons.forEach((lemon) => {
					lemon.throw();
				});
			}
			//Sitruuna napataan
			if (
				collisionDetectionA({
					unit: character,
					object: lemon,
				})
			) {
				console.log('Saatanan paha hetelmä');
				document.getElementById('bgMusic').muted = true;
				document.getElementById('lemonCaught').play();
				ctx.fillStyle = 'red';
				ctx.font = '48px serif';
				ctx.textAlign = 'center';

				ctx.fillText('Game Over', canvas.width / 2, 200);
				ctx.fillText('Your score: ' + score, canvas.width / 2, 250);
				// pysäyttää ruudun
				cancelAnimationFrame(animationId);
			}
		});
	});
}
// ANIMATE LOOP LOPPU

// MOVEMENTS
function movement() {
	// Täällä tsekataan osuuko apina seinään jolloin ylimääräinen luuppaus loppuu
	level.forEach((square) => {
		// Jos minkään seinän collisionDetection palauttaa True, pysäytä hahmo
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
	// Täällä asetetaan myös apinan uusi koordinaatio
	character.x += character.speedX;
	character.y += character.speedY;
	if (i >= 4) {
		i = 1;
	}
	if (character.speedX === 0 && character.speedY === 0) {
		if (faceDir === 'right') {
			currentIMG = rightMove[0];
		} else {
			currentIMG = leftMove[0];
		}
	}
	if (character.speedY > 0 || character.speedY < 0) {
		if (faceDir === 'right') {
			currentIMG = rightMove[i];
		} else {
			currentIMG = leftMove[i];
		}
	}
	if (character.speedX > 0) {
		currentIMG = rightMove[i];
	}
	if (character.speedX < 0) {
		currentIMG = leftMove[i];
	}
	i += 1;
	heroImage = new Image();
	heroImage.src = currentIMG;
}
// Näihin valitettavasti jää viive liikkumisen aloitukseen mutta animaatio ainakin toimii
// PUSH KEY
document.addEventListener('keydown', press);
function press(key) {
	console.log(key.keyCode);
	character.speedX = 0;
	character.speedY = 0;
	keyPress = key.keyCode;
	if (key.keyCode === 65) {
		// A    left
		character.speedX = -8;
		faceDir = 'left';
	}
	if (key.keyCode === 68) {
		// D    right
		character.speedX = 8;
		faceDir = 'right';
	}
	if (key.keyCode === 87) {
		// W    up
		character.speedY = -8;
	}
	if (key.keyCode === 83) {
		// S    down
		character.speedY = 8;
	}
	movement();
}
// RELEASE KEY
document.addEventListener('keyup', release);
function release(key) {
	i = 0;
	if (key.keyCode === 65 || key.keyCode === 68) {
		// A    left		D	right
		character.speedX = 0;
	}
	if (key.keyCode === 87 || key.keyCode === 83) {
		// W    up			S	down
		character.speedY = 0;
	}
	movement();
}
animate();
