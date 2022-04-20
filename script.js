//To do:
//define initial canvas
document.addEventListener('DOMContentLoaded', SetupCanvas)

function SetupCanvas(){
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
//  placeholder graphic
// figure out simple pixel graphics
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