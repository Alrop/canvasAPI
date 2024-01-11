let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
// ALEKSIN RIVIT

















// TAIJAN RIVIT
/* W: 800px    H: 600px
*/
// Tämä toimii testikuvana 
// let char = 'photos/testPhoto.png';

function startGame() {
    ctx.fillStyle = "blue";
    ctx.fillRect(150, 150, 50, 50);
    myGamePiece = new component(50, 50, "blue", 10, 120);
}

// MOVEMENT
// Näitä muokattava oman näköiseksi
document.addEventListener("keydown", function (event) {
    keystate_Player[event.key] = true;
})
document.addEventListener("keyup", function (event) {
    keyState_Player[event.key] = false;
});

// MOVEMENT KEYS "W A S D"
