/** @format */
const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
// prettier-ignore
// W: 29(27) riviä	H: 21
var map = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
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
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
];
const level = [];
const fruits = [];

const size = 30;

class Wall {
	constructor({ position }) {
		this.position = position;
		this.width = size;
		this.height = size;
	}
	draw() {
		ctx.fillStyle = 'blue';
		ctx.fillRect(
			this.position.x * size - size,
			this.position.y * size - size,
			this.width,
			this.height
		);
	}
}

class BananaFruit {
	constructor({ position }) {
		this.position = position;
		this.width = size;
		this.height = size;
	}
	draw() {
		ctx.fillStyle = 'red';
		ctx.fillRect(
			this.position.x * size - size,
			this.position.y * size - size,
			this.width,
			this.height
		);
		console.log(map);
	}
	catch() {
		// map[this.position.y][this.position.x] = ' ';

		this.position.y = Math.floor(Math.random() * (21 - 1 + 1) + 1);
		this.position.x = Math.floor(Math.random() * (20 - 1 + 1) + 1);

		// reroll kunnes tyhjä kohta
		while (map[this.position.y][this.position.x] != ' ') {
			this.position.y = Math.floor(Math.random() * (24 - 1 + 1) + 1);
			this.position.x = Math.floor(Math.random() * (20 - 1 + 1) + 1);
			// console.log('pass');
			// console.log(this.position.x, this.position.y);
		}
		// map[this.position.x][this.position.y] = 'B';
		this.draw();
	}
}

class LemonFruit {
	constructor({ position }) {
		this.position = position;
		this.width = size;
		this.height = size;
	}
	draw() {
		ctx.fillStyle = 'orange';
		ctx.fillRect(
			this.position.x * size - size,
			this.position.y * size - size,
			this.width,
			this.height
		);
		console.log(map);
	}
	throw() {
		// map[this.position.y][this.position.x] = ' ';

		this.position.y = Math.floor(Math.random() * (21 - 1 + 1) + 1);
		this.position.x = Math.floor(Math.random() * (20 - 1 + 1) + 1);

		// reroll kunnes tyhjä kohta
		while (map[this.position.y][this.position.x] != ' ') {
			this.position.y = Math.floor(Math.random() * (24 - 1 + 1) + 1);
			this.position.x = Math.floor(Math.random() * (20 - 1 + 1) + 1);
			// console.log('pass');
			// console.log(this.position.x, this.position.y);
		}
		// map[this.position.x][this.position.y] = 'B';
		this.draw();
	}
}

// Jos i, j indexissä oleva symboli `#`, luo Wall objekti ja työnnä se level.array
// Banaani ja Sitruuna ei käytössä täällä
map.forEach((row, i) => {
	// console.log(row, i);
	row.forEach((symbol, j) => {
		// console.log(tile, j);
		switch (symbol) {
			case '#':
				level.push(
					new Wall({
						position: {
							x: j,
							y: i,
						},
					})
				);
				break;
			case 'B':
				fruits.push(
					new BananaFruit({
						position: {
							x: j,
							y: i,
						},
					})
				);
				break;

			case 'L':
				fruits.push(
					new LemonFruit({
						position: {
							x: j,
							y: i,
						},
					})
				);
				break;
		}
	});
});

// ei käytössä
function collisionDetection({ unit, object }) {
	return (
		// Neliön törmäys moottori
		// Ylä seinä
		unit.position.y <= object.position.y + object.height &&
		// Ala seinä
		unit.position.y + unit.height + unit.speedY >= object.position.y &&
		// Oikea seinä
		unit.position.x + unit.width + unit.speedX >= object.position.x &&
		// Vasen seinä
		unit.position.x <= object.position.x + object.width
	);
}

// piirrä seinät
level.forEach((wall) => {
	wall.draw();
});

// Määritä hetelmät
banana = new BananaFruit({
	position: { x: 2, y: 4 },
});
lemon = new LemonFruit({
	position: { x: 10, y: 10 },
});

// piirrä alkuperäiset hetelmät
banana.draw();
lemon.draw();

// lottoa uudet hetelmä paikat
banana.catch();
lemon.throw();

console.log(fruits);
