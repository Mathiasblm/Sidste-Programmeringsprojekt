let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

//------------------------------------------------------------
let columns = 5;
let rows = 5;
let sqWidth = canvas.width/rows;
let sqHeight = canvas.height/columns;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;

// visited
let visited = new Array();
// frontier
let frontier = new Array();

let sqBackground = new Image();
sqBackground.src = "sprites/X_junction/X_junction.png";
let sqBackground2 = new Image();
sqBackground2.src = "sprites/Path.png";

function generateMaze() {
    let mazeSquares = new Array();
    //laver et array af arrays og pusher en mazesquare ind i hver af dem
    for (let row = 0; row < rows; row++) {
        mazeSquares[row] = [];
        
        for (let col = 0; col < columns; col++) {
            let ms = new mazeSquare(col, row, sqWidth*row, sqHeight*col, sqBackground);
            mazeSquares[row].push(ms);
            ms.draw(); 

            //Adjacent walls til mazesquare
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
            
            //Adjecent mazesquares 2 felter væk (thick walls)
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
//laver start position til current mazesquare og tilføjer den til visited
let current = start;
visited.push(current);
current.wall = false;
console.log(current); 

function primAlgorithm() {
    //Tjekker om den current mazesquares adjecents allerede er med i frontiers og om de er visited. Hvis begge er false bliver adjecents tilføjet til frontiers.
    for(let i = 0; i < current.adjacents.length; i++) {
        if(frontier.includes(current.adjacents[i]) == false) {
            if(visited.includes(current.adjacents[i]) == false) {
                frontier.push(current.adjacents[i]);
            }
        }
    }
    //Vælger en tilfældig mazesquare fra frontiers og laver den til den nye current. Current bliver addet til visited.
    let frontierIndex = Math.floor(Math.random() * frontier.length);
    current = frontier[frontierIndex];
    visited.push(current);
    current.wall = false;
    console.log(current); 
    //Sletter current fra frontier array.
    frontier.splice(frontierIndex, 1);
}
primAlgorithm();

function drawMaze() {
    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            if(maze[i][j].wall == false) {
                maze[i][j].background = sqBackground2;
            }
            else if(maze[i][j].wall == true) {
                maze[i][j].background = sqBackground;
            } 
            maze[i][j].draw();
        }
    }
}
drawMaze();

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for(let col of maze) {
       for(let column of col) {
           column.draw();
       }
   }
}, 100);