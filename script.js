//Global variable
let shipX = 375
let shipY = 700
let stars = []
let keys = []
let speed = 5

//Generate star field on load
for (let i = 0; i < 80; i++){
    stars.push(Math.floor(Math.random()*800))
}

//To do:
//define initial canvas
document.addEventListener('DOMContentLoaded', setupCanvas)


// //Initial movement scheme
// window.addEventListener('keypress', movement)

// function movement(e){
//     let speed = 15;
//     let key = e.keyCode;
//     if (key === 119){
//         console.log("up")
//         shipY -= speed;
//         // window.requestAnimationFrame(drawShip)
//     } else if (key === 115) {
//         console.log("down")
//         shipY += speed;
//     } else if (key === 100){
//         console.log("right")
//         shipX += speed;
//     } else if (key === 97){
//         console.log("left")
//         shipX -= speed;
//     }else {
//         console.log(e.keyCode)
//     }
// }

//advanced movement stuff?

window.addEventListener('keydown', keysDown, false)
function keysDown(e) {
    keys[e.key] = true;
}

window.addEventListener('keyup', keysUp, false)
function keysUp(e) {
    keys[e.key] = false;
    
}



//pre loads images for rendering
loadImages()

function loadImages(){
    player = new Image()
    player.src = 'assets/Player.png'
}


function setupCanvas(){
    let canvas = document.getElementById('canvas');
    
    canvas.width = 800;
    canvas.height = 800;
    
    drawStarfield()
    
}

//add optional scoreboard/message to the side
//
//JS stuff
//PLAYER
//  create movement functionality
function drawPlayer(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(player, shipX, shipY, 50, 50)
    // ctx.fillStyle = "red"
    // ctx.fillRect(shipX, shipY, 50, 50)
}

function drawStarfield(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    for (let i = 0; i < 80; i++){
        let y = (i+1)*10
        ctx.fillStyle = "white";
        ctx.fillRect(stars[i],y,4,4)
    }
}

function draw(){
    window.requestAnimationFrame(draw)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,800)
    if (keys.w && shipY > 0){
        shipY -= speed;
    } else if (keys.s && shipY < 750 ){
        shipY += speed;
    }
    
    if (keys.a && shipX > 0){
        shipX -= speed
    } else if (keys.d && shipX < 750){
        shipX += speed
    }
    drawStarfield()
    drawPlayer()
}

window.requestAnimationFrame(draw)

//
//WEAPONS
// basic weapon
//  bullet spawning?
//
//ENEMY
//  placeholder graphic
//  simple pixel graphic/animiation
//  spawn from random place on edge
//  walk across screen? Head to player?
//  touch = damage?
//
// GAMEPLAY
//  remove entity on hit
//  hit points?
//  score - per kill?
//  end game at certain score point? endless mode?