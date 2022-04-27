let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;


//ctx.fillStyle = "#34568B";
//ctx.fillRect(0, 0, canvas.width, canvas.height);
//------------------------------------------------------------

    function runLoad(param){
        if(!param){
            return
        }
        var c=document.getElementById('canvas'),
        ctx=c.getContext('2d'),
        pi = Math.PI,
        xCenter = c.width/2,
        yCenter = c.height/2,
        radius = c.width/3,
        startSize = radius/3,
        num=5,
        posX=[],posY=[],angle,size,i;
    
        window.setInterval(function() {
        num++;
        ctx.clearRect ( 0 , 0 , xCenter*2 , yCenter*2 );
        for (i=0; i<9; i++){
            ctx.beginPath();
            ctx.fillStyle = 'rgba(69,99,255,'+.1*i+')';
            if (posX.length==i){
            angle = pi*i*.25;
            posX[i] = xCenter + radius * Math.cos(angle);
            posY[i] = yCenter + radius * Math.sin(angle);
            }
            ctx.arc(
            posX[(i+num)%8],
            posY[(i+num)%8],
            startSize/9*i,
            0, pi*2, 1); 
            ctx.fill();
        }
        }, 100);
    };
    runLoad();
 
//_________________________________________________________________________

let columns = 5;
let rows = 5;
let lines = [];
let sqWidth = canvas.width/rows;
let sqHeight = canvas.height/columns;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;
let gridCords = [];
// visited
let indexed = new Array();
// frontier
let focus = new Array();

let sqBackground = new Image();
sqBackground.src = "sprites/X_junction/X_junction.png";
let sqBackground2 = new Image();
sqBackground2.src = "sprites/Path.png";

/*
window.onload = function() {
        // vertical lines
    for (let i = 0; i < rowumns; i++){
      lines.push(new Line(
          (sqWidth*i),
          0,
          (sqWidth*i),
          canvas.height
      ));
        
        // Horizontal lines
        for (let j = 0; j < cols; j++){
            lines.push(new Line(
                0,
                (sqHeight * j),
                canvas.width,
                (sqHeight * j)
            ));
            gridCords.push([sqWidth*i, sqHeight * j]);
        }
    }
    console.log(lines);
    console.log(gridCords);
}

*/

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for(let col of maze)
    for(let column of col)
        column.draw();
    for(let line of lines) {
        line.draw();
 
    }
}, 1000, 100);
    
function generateMaze() {
    let mazeSquares = [];
    for (let row = 0; row < rows; row++) {
        mazeSquares[row] = [];
        
        for (let col = 0; col < columns; col++) {
            let ms = new mazeSquare(col, row, sqWidth*row, sqHeight * col, sqBackground, 0, 0);
            mazeSquares[row].push(ms);
            ms.draw(); 

            // Adjacents to new Path

            if(mazeSquares[row-1]) {
                if(mazeSquares[row-1][col]) {
                    let left = mazeSquares[row-1][col];
                    ms.adjacentsWalls.push(left);
                    left.adjacentsWalls.push(ms);
                }
            }

            if(mazeSquares[row]) {
                if(mazeSquares[row][col-1]) {
                    let up = mazeSquares[row][col-1];
                    ms.adjacentsWalls.push(up);
                    up.adjacentsWalls.push(ms);
                }
            }

            if(mazeSquares[row-2]) {
                if(mazeSquares[row-2][col]) {
                    let left = mazeSquares[row-2][col];
                    ms.adjacents.push(left);
                    left.adjacents.push(ms);
                }
            }

            if(mazeSquares[row]) {
                if(mazeSquares[row][col-2]) {
                    let up = mazeSquares[row][col-2];
                    ms.adjacents.push(up);
                    up.adjacents.push(ms);
                }
            }
        }
    }
    return mazeSquares
}

let maze = generateMaze();
console.log(maze);

//vælger start position
let startY = Math.floor(Math.random() * maze.length);
let startX = Math.floor(Math.random() * maze[startY].length);
let start = maze[startY][startX];
focus.push(start);
let current = start;
console.log(start); 

function drawBackground(){
    current.background = sqBackground2;
    for(let i = 0; i < current.adjacents.length; i++){
        current.adjacents[i].background = sqBackground2;
    }
}

function primAlgorithm() {
    focus.splice(0,1);
    // tilføj til dem er er kigget på
    indexed.push(current);
    current.status = "indexed";
    
    
    drawBackground();

    for(let i = 0; i < current.adjacents.length; i++){
        
        if(current.adjacents[i].status == "not_indexed"){
            focus.push(current.adjacents[i]);
        }
    }
    console.log(focus);
    //runLoad(param);
    current.draw();
    
}
primAlgorithm();