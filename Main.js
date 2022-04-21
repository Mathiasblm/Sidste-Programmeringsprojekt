let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "#34568B";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let columns = 5;
let rows = 5;
let lines = [];
let sqWidth = canvas.width/rows;
let sqHeight = canvas.height/columns;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;
let gridCords = [];
let indexed = new Array();
let focus = new Array();

let sqBackground = new Image();
sqBackground.src = "sprites/X_junction/X_junction.png";
let sqBackground2 = new Image();
sqBackground2.src = "sprites/parth.png";

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

            if(mazeSquares[row-1]) {
                if(mazeSquares[row-1][col]) {
                    let left = mazeSquares[row-1][col];
                    ms.adjacents.push(left);
                    left.adjacents.push(ms);
                }
            }

            if(mazeSquares[row]) {
                if(mazeSquares[row][col-1]) {
                    let up = mazeSquares[row][col-1];
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

function primAlgorithm() {
    focus.splice(0,1);
    indexed.push(current);
    current.status = "indexed";
    current.background = sqBackground2;
    current.adjacents[0].background = sqBackground2;
    current.adjacents[1].background = sqBackground2;
    current.adjacents[2].background = sqBackground2;
    current.adjacents[3].background = sqBackground2;
    current.draw();
    
}
primAlgorithm();