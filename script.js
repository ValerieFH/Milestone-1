//Global variables
let shipX = 375
let shipY = 700
let speed = 5

let player = {
    playerX: 375,
    playerY: 700,
    alive: true,
    speed: 5
}

let stars = []
let keys = []
let playerBullets = []
let enemyBullets = []
let enemies = []
let spawnFrequency = 200
let tick = 0

let testBullet = [{bulletX: 400, bulletY: 0}]

//Generate star field on load
for (let i = 0; i < 80; i++){
    stars.push([Math.floor(Math.random()*800), ((i+1)*10)])
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
    playerImg = new Image()
    playerImg.src = 'assets/Player.png'

    enemy1 = new Image()
    enemy1.src = 'assets/enemy-1.png'
}

//draws initial canvas
function setupCanvas(){
    let canvas = document.getElementById('canvas');
    
    canvas.width = 800;
    canvas.height = 800;
    
    drawStarfield()
    
}

//collision detection function
 
function hasCollided(a,b) {

}

//defines various draw elements - possibly refactor into classes

//player ship
function drawPlayer(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    //movement logic
    if (keys.w && player.playerY > 0){
        player.playerY -= player.speed;
    } else if (keys.s && player.playerY < 750 ){
        player.playerY += player.speed;
    }
    
    if (keys.a && player.playerX > 0){
        player.playerX -= player.speed
    } else if (keys.d && player.playerX < 750){
        player.playerX += player.speed
    }

    //fire bullets
    if (keys[" "] && tick % 10 === 0 ) { //modulus is for bullet delay
        playerBullets.push({
            bulletX: player.playerX + 23,
            bulletY: player.playerY - 4
        })
    }

    ctx.drawImage(playerImg, player.playerX, player.playerY, 50, 50)
    
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
    travelSpeed = 6;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    for (let i = 0; i < 80; i++){
        ctx.fillStyle = "white";
        ctx.fillRect(stars[i][0],stars[i][1],4,4)
        if (stars[i][1] > 800){
            stars[i][1] = 0
        } else {
            stars[i][1] += travelSpeed
        }
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
            if (enemy.enemyX > player.playerX+ 75){
                aim = "left"
            } else if (enemy.enemyX < player.playerX - 25){
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
        //improve angled attack to have more consistant speed?
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
//hit detection stuff
//add score which increases on enemy death
//start/restart screen

//BONUS
//more enemy types
//correct targeting speed
//music and sound effects
//traveling star field
//power ups?