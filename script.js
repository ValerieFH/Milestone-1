//Global variables
let shipX = 375
let shipY = 700
let stars = []
let keys = []
let speed = 5
let playerBullets = []
let enemyBullets = []
let tick = 0

let testBullet = [{bulletX: 400, bulletY: 696}]

//Generate star field on load
for (let i = 0; i < 80; i++){
    stars.push(Math.floor(Math.random()*800))
}

//Sets up initial Canvas and adds keypress listeners
document.addEventListener('DOMContentLoaded', setupCanvas)

window.addEventListener('keydown', keysDown, false)
    function keysDown(e) {
        keys[e.key] = true;
        //console.log(keys)
    }

window.addEventListener('keyup', keysUp, false)
    function keysUp(e) {
        keys[e.key] = false;
        //console.log(keys)
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

//defines various draw elements - possibly refactor into classes

//player ship
function drawPlayer(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    //movement logic
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

    //fire bullets
    if (keys[" "] && tick % 10 === 0 ) { //modulus is for bullet delay
        playerBullets.push({
            bulletX: shipX + 23,
            bulletY: shipY - 4
        })
    }

    ctx.drawImage(player, shipX, shipY, 50, 50)
    
}

//bullet drawing
function drawPlayerBullets(){
    let bulletVelocity = 10;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "red";

    for (let i = 0; i < playerBullets.length; i++){
        let bullet = playerBullets[i]
        ctx.fillRect(bullet.bulletX,bullet.bulletY,4,4)
        bullet.bulletY -= bulletVelocity
    }
}

//Starfield drawing
function drawStarfield(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    for (let i = 0; i < 80; i++){
        let y = (i+1)*10
        ctx.fillStyle = "white";
        ctx.fillRect(stars[i],y,4,4)
    }
}


//main draw loop
function draw(){
    window.requestAnimationFrame(draw)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,800)
    //collison checks
    //
    drawStarfield()
    drawPlayer()
    drawPlayerBullets()
    tick++
}

window.requestAnimationFrame(draw)

//REQUIRED TODOS
//Add player bullets
//add enemies
//add enemy bullets
//hit detection stuff
//add score which increases on enemy death
//start/restart screen

//BONUS
//music and sound effects
//traveling star field
//power ups?