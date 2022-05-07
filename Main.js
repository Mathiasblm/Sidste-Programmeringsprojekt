let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

//------------------------------------------------------------
let columns = 25;
let rows = 25;
let sqWidth = canvas.width/rows;
let sqHeight = canvas.height/columns;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;

// visited
let visited = [];
// frontier
let frontier = [];

// wall Stuff
let wallcounter = 0;
let xJunction = new Image();
xJunction.src = "Sprites/X_junction/X_junction.png";

let EndUp = new Image();
EndUp.src = "Sprites/End/End_N.png";

let EndLeft = new Image();
EndLeft.src = "Sprites/End/End_W.png";

let EndDown = new Image();
EndDown.src = "Sprites/End/End_S.png";

let EndRight = new Image();
EndRight.src = "Sprites/End/End_E.png";

let Horisontal = new Image();
Horisontal.src = "Sprites/Straight/Straight_W.png";

let Vertical = new Image();
Vertical.src = "Sprites/Straight/Straight_N.png";

let TUp = new Image();
TUp.src = "Sprites/T_junction/T_junction_N.png";

let TLeft = new Image();
TLeft.src = "Sprites/T_junction/T_junction_W.png";

let TDown = new Image();
TDown.src = "Sprites/T_junction/T_junction_S.png";

let TRight = new Image();
TRight.src = "Sprites/T_junction/T_junction_E.png";

let TurnUpLeft = new Image();
TurnUpLeft.src = "Sprites/Turn/Turn_N_W.png";

let TurnUpRight = new Image();
TurnUpRight.src = "Sprites/Turn/Turn_E_N.png";

let TurnDownLeft = new Image();
TurnDownLeft.src = "Sprites/Turn/Turn_W_S.png";

let TurnDownRight = new Image();
TurnDownRight.src = "Sprites/Turn/Turn_S_E.png";

let path = new Image();
path.src = "sprites/Path.png";

function generateMaze() {
    let mazeSquares = new Array();
    //laver et array af arrays og pusher en mazesquare ind i hver af dem
    for (let row = 0; row < rows; row++) {
        mazeSquares[row] = [];
        
        for (let col = 0; col < columns; col++) {
            let ms = new mazeSquare(col, row, sqWidth*row, sqHeight*col, xJunction);
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
for(let i = 0; i < start.adjacents.length; i++) {
    frontier.push(start.adjacents[i]);
};
current.wall = false;
//console.log(current); 

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
    let randomFrontierIndex = Math.floor(Math.random() * frontier.length);
    current = frontier[randomFrontierIndex];
    
    let validPath = [];
    
    for(let i = 0; i < current.adjacents.length; i++) {
        
        if(current.adjacents[i].wall == false) {
            validPath.push(current.adjacents[i]);
        }
    }
    
    let randomPathIndex = Math.floor(Math.random() * validPath.length);
    let validPathIndex = validPath[randomPathIndex];
    
    // hvis Op
    if(Math.sign(current.rowIndex - validPathIndex.rowIndex) == 1){
        maze[current.rowIndex - 1][current.colIndex].wall = false;
        //console.log("Test 1 ", maze[current.rowIndex - 1][current.colIndex])
    }
    
    // hvis Ned
    if(Math.sign(current.rowIndex - validPathIndex.rowIndex) == -1){
        maze[current.rowIndex + 1][current.colIndex].wall = false;
        //console.log("Test 2 ", maze[current.rowIndex + 1][current.colIndex])
    }
    
    // hvis Højre
    if(Math.sign(current.colIndex - validPathIndex.colIndex) == 1){
        maze[current.rowIndex][current.colIndex - 1].wall = false;
        //console.log("Test 3 ", maze[current.rowIndex][current.colIndex - 1])
    }
    
    // hvis Venstre
    if(Math.sign(current.colIndex - validPathIndex.colIndex) == -1){
        maze[current.rowIndex][current.colIndex + 1].wall = false;
        //console.log("Test 4 ", maze[current.rowIndex][current.colIndex + 1])
    }
    visited.push(current);
    current.wall = false;
    //console.log(current);
    //Sletter current fra frontier array.
    frontier.splice(randomFrontierIndex, 1);
}
//console.log("Before While ", maze);

while(frontier.length > 0) {
    primAlgorithm();
}


// Wall spritecranberry picker tm
function pickWall() {
    // Loop gennem alle squares
    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            // Hvis der er 4 adjacentWalls (aka. feltet ikke er i kanten) så brug denne kode til walludregning
            if(maze[i][j].adjacentsWalls.length == 4) {
                // tæller hvor mange adjacent walls der er
                for(let t = 0; t < maze[i][j].adjacentsWalls.length; t++) {
                    if(maze[i][j].adjacentsWalls[t].wall == true) {
                        wallcounter += 1;
                    }
                }
                //console.log("Wall har " + wallcounter + " adjecent walls");
                switch(wallcounter) {     
                    case 0:
                        break;
                
                    case 1:
                        // Endestykke
                        //console.log("case 1 was used")
                        if(maze[i][j].adjacentsWalls[0].wall == true) {
                            maze[i][j].background = EndUp;
                            //console.log("case 1 UP");
                        }
                        if(maze[i][j].adjacentsWalls[1].wall == true) {
                            maze[i][j].background = EndLeft;
                            //console.log("case 1 LEFT");
                        }
                        if(maze[i][j].adjacentsWalls[2].wall == true) {
                            maze[i][j].background = EndRight;
                            //console.log("case 1 RIGHT");
                        }
                        if(maze[i][j].adjacentsWalls[3].wall == true) {
                            maze[i][j].background = EndDown;
                            //console.log("case 1 DOWN");
                        }
                        wallcounter = 0;
                        break;
                
                    case 2:
                        // Hjørner og lige vægge
                        //console.log("case 2 was used")
                        if(maze[i][j].adjacentsWalls[0].wall == true) {
                            if(maze[i][j].adjacentsWalls[3].wall == true) {
                                maze[i][j].background = Vertical;
                            }
                        }
                        if(maze[i][j].adjacentsWalls[1].wall == true) {
                            if(maze[i][j].adjacentsWalls[2].wall == true) {
                                maze[i][j].background = Horisontal;
                            }
                        }
                        if(maze[i][j].adjacentsWalls[0].wall == true) {
                            if(maze[i][j].adjacentsWalls[2].wall == true) {
                                maze[i][j].background = TurnUpRight;
                            }
                        }
                        if(maze[i][j].adjacentsWalls[0].wall == true) {
                            if(maze[i][j].adjacentsWalls[1].wall == true) {
                                maze[i][j].background = TurnUpLeft;
                            }
                        }
                        if(maze[i][j].adjacentsWalls[3].wall == true) {
                            if(maze[i][j].adjacentsWalls[2].wall == true) {
                                maze[i][j].background = TurnDownRight;
                            }
                        }
                        if(maze[i][j].adjacentsWalls[3].wall == true) {
                            if(maze[i][j].adjacentsWalls[1].wall == true) {
                                maze[i][j].background = TurnDownLeft;
                            }
                        }
                        wallcounter = 0;
                        break;
                
                    case 3:
                        if(maze[i][j].adjacentsWalls[0].wall == false) {
                            maze[i][j].background = TDown;
                        }
                        if(maze[i][j].adjacentsWalls[1].wall == false) {
                            maze[i][j].background = TRight;
                        }
                        if(maze[i][j].adjacentsWalls[2].wall == false) {
                            maze[i][j].background = TLeft;
                        }
                        if(maze[i][j].adjacentsWalls[3].wall == false) {
                            maze[i][j].background = TUp;
                        }
                        wallcounter = 0;
                        break;

                    case 4:
                        wallcounter = 0;
                        break;
                }
            }
        }
    }
}




function drawMaze() {
    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            if(maze[i][j].wall == false) {
                maze[i][j].background = path;
            }
            maze[i][j].draw();
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for(let col of maze) {
       for(let row of col) {
           row.draw();
       }
   }
   drawMaze();
}, 100);

pickWall();
//console.log("wallcounter: " + wallcounter);