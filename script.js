//Global variables
let shipX = 375
let shipY = 700
let stars = []
let keys = []
let speed = 5
let playerBullets = []
let enemyBullets = []
let enemies = []
let spawnFrequency = 200
let tick = 0

let testBullet = [{bulletX: 400, bulletY: 0}]

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

    enemy1 = new Image()
    enemy1.src = 'assets/enemy-1.png'
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

//enemy spawning and drawing (?)
function drawEnemies(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    if (tick % spawnFrequency === 0){
        let randomX = Math.floor(Math.random()*750)
        enemies.push({
            enemyX: randomX,
            enemyY: -50,
            alive: true,
            speed: 3
        })
    }

    if (tick % 500 === 0 && spawnFrequency > 50){
        spawnFrequency -= 10
        console.log("Spawn increased")
    }

    for (let i = 0; i < enemies.length; i++){
        let enemy = enemies[i]
        if (!enemy.alive || enemy.enemyY > 850){
            enemies.splice(i,1)
            i--
        } else {
            ctx.drawImage(enemy1, enemy.enemyX, enemy.enemyY, 50, 50)
            enemy.enemyY += enemy.speed
        }

    }
}

//enemy bullets

function fireEnemyBullets(){
    let enemyDelay = 30;
    for (let i = 0; i < enemies.length; i++){
        let enemy = enemies[i]
        if (enemy.enemyY > 100 && enemy.enemyY < 700 && tick % enemyDelay === 0){
            let aim = "straight"
            if (enemy.enemyX > shipX + 75){
                aim = "left"
            } else if (enemy.enemyX < shipX - 25){
                aim = "right"
            }
            enemyBullets.push({
                bulletX: enemy.enemyX + 23,
                bulletY: enemy.enemyY + 54,
                targetAim: aim
            })
        }
    }
}

function drawEnemyBullets(){
    let bulletVelocity = 8;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "green";

    for (let i = 0; i < enemyBullets.length; i++){
        let bullet = enemyBullets[i]
        ctx.fillRect(bullet.bulletX,bullet.bulletY,4,4)
        if (bullet.targetAim === "right"){
            bullet.bulletY += bulletVelocity/2
            bullet.bulletX += bulletVelocity/2
        } else if (bullet.targetAim === "left"){
            bullet.bulletY += bulletVelocity/2
            bullet.bulletX -= bulletVelocity/2
        } else {
        bullet.bulletY += bulletVelocity
        }
        
    }
}

//main draw loop
function draw(){
    window.requestAnimationFrame(draw)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,800)
    //collison checks
    drawStarfield()
    drawPlayer()
    drawPlayerBullets()
    drawEnemies()
    fireEnemyBullets()
    drawEnemyBullets()
    tick++
}

window.requestAnimationFrame(draw)

//REQUIRED TODOS
//add enemy bullets
//hit detection stuff
//add score which increases on enemy death
//start/restart screen

//BONUS
//more enemy types
//music and sound effects
//traveling star field
//power ups?