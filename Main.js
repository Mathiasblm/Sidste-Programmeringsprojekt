let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;


ctx.fillStyle = "#34568B";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//------------------------------------------------------------


 
//_________________________________________________________________________

let columns = 25;
let rows = 25;
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
    current.draw();
}

function primAlgorithm() {
    console.log("Current is: Row " + current.rowIndex + " Col " + current.colIndex);
    console.log("The focus array: " + focus);
    focus.splice(0,1);
    console.log("The focus array: " + focus);
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

    // indexed is visited
    // focus is frontier


    //vælger start position
    let focusIndex = Math.floor(Math.random() * (focus.length));
    let newPath = focus[focusIndex];
    current = newPath;
    
    //****************************************************
    console.log("The chosen frontier Path is: Row " + newPath.rowIndex + " Col " + newPath.colIndex);
    console.log("Current is now: Row " + current.rowIndex + " Col " + current.colIndex);
    //****************************************************

    focus.splice([focusIndex],1);

    //****************************************************
    console.log("The focus array: " + focus);
    for(let i = 0; i < focus.length; i++){
        console.log(focus[i]);
    }
    //****************************************************

    current.status = "indexed";
    indexed.push(current);

    //****************************************************
    console.log("The indexed array: " + indexed);
    for(let i = 0; i < indexed.length; i++){
        console.log(indexed[i]);
    }
    //****************************************************
    

    
}
primAlgorithm();