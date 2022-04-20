//To do:
//define initial canvas
document.addEventListener('DOMContentLoaded', setupCanvas)
document.addEventListener('DOMContentLoaded', drawShip)

function setupCanvas(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 800;

    for (let i = 10; i < 800; i+=10){
        let x = Math.floor(Math.random()*800)
        ctx.fillStyle = "white";
        ctx.fillRect(x,i,4,4)
    }
    
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
        ctx.drawImage(testShip, 375, 375, 50, 50)
    }
}

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