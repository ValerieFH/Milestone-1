//Global variable
let shipX = 375
let shipY = 700
let stars = []
let test = 0

//Generate star field on load
for (let i = 0; i < 80; i++){
    stars.push(Math.floor(Math.random()*800))
}

//To do:
//define initial canvas
document.addEventListener('DOMContentLoaded', setupCanvas)
//document.addEventListener('DOMContentLoaded', draw)

window.addEventListener('keypress', movement)

function movement(e){
    
    let key = e.keyCode;
    if (key === 119){
        console.log("up")
        shipY -= 3;
        window.requestAnimationFrame(drawShip)
    } else if (key === 115) {
        console.log("down")
    } else if (key === 100){
        console.log("right")
    } else if (key === 97){
        console.log("left")
    }else {
        console.log(e.keyCode)
    }

}

function setupCanvas(){
    let canvas = document.getElementById('canvas');
    //let ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 800;

    drawStarfield()
    
}

//add optional scoreboard/message to the side
//
//JS stuff
//PLAYER
//  create movement functionality
function drawShip(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let testShip = new Image();
    testShip.src = 'assets/Player.png'
    testShip.onload = function(){
        ctx.drawImage(testShip, shipX, shipY, 50, 50)
    }
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
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,800)
    drawStarfield()
    drawShip()
    window.requestAnimationFrame(draw)
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