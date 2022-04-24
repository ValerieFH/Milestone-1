//Global variables
let player = {
    x: 375,
    y: 700,
    width: 50,
    height: 50,
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
let score = 0
let titleY = -100

//Game Reset Variables
function reset(){
    player = {
        x: 375,
        y: 700,
        width: 50,
        height: 50,
        alive: true,
        speed: 5
    }
    
    keys = []
    playerBullets = []
    enemyBullets = []
    enemies = []
    spawnFrequency = 200
    tick = 0
    score = 0
}

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

    title = new Image()
    title.src = 'assets/title2.png'
}

//draws initial canvas
function setupCanvas(){
    window.requestAnimationFrame(setupCanvas)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 800;
    
    ctx.clearRect(0,0,800,800)
    drawStarfield(0)

    ctx.drawImage(title, 200, titleY)
    if (titleY < 250) {
        titleY += 3
        }

    ctx.font = '30px Courier New'
    ctx.fillText("Press N to start", 255, 475)

    if (keys.n) {
        delete keys.n
        window.requestAnimationFrame(draw)
    }
    
}

//end game state
function endGame(){
    window.requestAnimationFrame(endGame)
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 800;
    
    drawStarfield(0)

    ctx.font = '45px Courier New'
    ctx.fillText("GAME OVER", 255, 350)

    ctx.font = '30px Courier New'
    ctx.fillText("Score: " + score.toString(), 300, 425)

    ctx.font = '30px Courier New'
    ctx.fillText("Reload to restart", 245, 500)

}

//collision detection function
 
function hasCollided(a,b) {

    //sets vertices in less brain hurty terms
    let aLeftX = a.x;
    let aRightX = a.x + a.width;
    let aTopY = a.y;
    let aBotY = a.y + a.height;

    let bLeftX = b.x;
    let bRightX = b.x + b.width;
    let bTopY = b.y;
    let bBotY = b.y + b.height;

    //checks for horz collision then vert collision
    if (bRightX >= aLeftX && bLeftX < aRightX) {
        if (bBotY >= aTopY && bTopY < aBotY){
            return true;
        }
    }

    //check for a inside b
    if(bLeftX <= aLeftX && bRightX >= aRightX) {
        if(bTopY <= aTopY && bBotY >= aBotY){
            return true;
        }
    }

    //check for b inside a
    if(aLeftX <= bLeftX && aRightX >= bRightX){
        if(aTopY <= bTopY && aBotY >= bBotY){
            return true;
        }
    }

    //else no collision!
    return false;
}

//defines various draw elements - possibly refactor into classes

//player ship with moving and firing controls
function drawPlayer(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    //movement logic
    if (keys.w && player.y > 0){
        player.y -= player.speed;
    } else if (keys.s && player.y < 750 ){
        player.y += player.speed;
    }
    
    if (keys.a && player.x > 0){
        player.x -= player.speed
    } else if (keys.d && player.x < 750){
        player.x += player.speed
    }

    //fire bullets
    if (keys[" "] && tick % 10 === 0 ) { //modulus is for bullet delay
        playerBullets.push({
            x: player.x + 23,
            y: player.y - 4,
            width: 4,
            height: 4,
        })
    }

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
    
}

//player bullet drawing
function drawPlayerBullets(){
    let bulletVelocity = 10;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "red";

    for (let i = 0; i < playerBullets.length; i++){
        let bullet = playerBullets[i]
        if (bullet.y < 0){
            playerBullets.splice(i,1)
            i--
        } else {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
            bullet.y -= bulletVelocity
        }
    }
}

//Starfield drawing
function drawStarfield(speed){
    travelSpeed = speed;
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

//enemy spawning and drawing, with frequency variable
function drawEnemies(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    //generates new enemy
    if (tick % spawnFrequency === 0){
        let randomX = Math.floor(Math.random()*750)
        enemies.push({
            x: randomX,
            y: -50,
            width: 50,
            height: 50,
            alive: true,
            speed: 3
        })
    }

    //spawn speed control
    if (tick % 500 === 0 && spawnFrequency > 50){
        spawnFrequency -= 10
        //console.log("Spawn increased")
    }

    //drawing function
    for (let i = 0; i < enemies.length; i++){
        let enemy = enemies[i]
        if (!enemy.alive || enemy.y > 850){
            enemies.splice(i,1)
            i--
        } else {
            ctx.drawImage(enemy1, enemy.x, enemy.y, enemy.width, enemy.height)
            enemy.y += enemy.speed
        }

    }
}

//enemy bullets spawning
function fireEnemyBullets(){
    let enemyDelay = 30; //refire rate of enemies
    for (let i = 0; i < enemies.length; i++){
        let enemy = enemies[i]
        if (enemy.y > 100 && enemy.y < 700 && tick % enemyDelay === 0){
            //compares x axis to player and aims shot left or right depending
            let aim = "straight"
            if (enemy.x > player.x+ 75){
                aim = "left"
            } else if (enemy.x < player.x - 25){
                aim = "right"
            }
            enemyBullets.push({
                x: enemy.x + 23,
                y: enemy.y + 54,
                width: 4,
                height: 4,
                targetAim: aim
            })
        }
    }
}

//enemy bullet drawing
function drawEnemyBullets(){
    let bulletVelocity = 8;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "chartreuse";

    for (let i = 0; i < enemyBullets.length; i++){
        let bullet = enemyBullets[i]
        if (bullet.y > 805){
            enemyBullets.splice(i,1)
            i--
        } else {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
            //improve angled attack to have more consistant speed?
            if (bullet.targetAim === "right"){
                bullet.y += bulletVelocity/2
                bullet.x += bulletVelocity/2
            } else if (bullet.targetAim === "left"){
                bullet.y += bulletVelocity/2
                bullet.x -= bulletVelocity/2
            } else {
            bullet.y += bulletVelocity
            }
        }
        
    }
}

//collision checking loop

function collisions(){
    //checks if player bullets have hit enemy
    for (let i = 0; i < playerBullets.length; i++){
        for (let j = 0; j <enemies.length; j++){
            if (hasCollided(playerBullets[i],enemies[j])){
                //console.log("Enemy hit!");
                playerBullets.splice(i,1)
                i--
                enemies.splice(j,1)
                j--
                score += 10
            }
        }
    }

    //checks if enemy bullets have hit player
    for (let i = 0; i < enemyBullets.length; i++){
        if (hasCollided(enemyBullets[i],player)){
            //console.log("Player hit!");
            //player.alive = false
            window.requestAnimationFrame(endGame)
        }
    }

    //checks if enemy ship has hit player
    for (let i = 0; i < enemies.length; i++){
        if (hasCollided(enemies[i],player)){
            //console.log("Player crashed!");
            //player.alive = false
            window.requestAnimationFrame(endGame)
        }
    }
}

//Draws score on screen
function drawScore(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.font = '21px Courier New'
    ctx.fillText("Score: " + score.toString(), 20, 30)
}

//main draw loop
function draw(){
    
        window.requestAnimationFrame(draw)
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,800,800)
        collisions()
        drawStarfield(4)
        drawScore()
        drawPlayer()
        drawPlayerBullets()
        drawEnemies()
        fireEnemyBullets()
        drawEnemyBullets()
        tick++
}

//window.requestAnimationFrame(setupCanvas)

//REQUIRED TODOS

//BONUS
//player shield/hp
//more enemy types
//correct targeting speed
//music and sound effects
//add additional starfield with different travel speed
//power ups?