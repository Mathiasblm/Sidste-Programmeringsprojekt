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
    let mazeSquares = [];
    //laver et array af arrays og pusher en mazesquare ind i hver af dem
    for (let row = 0; row < rows; row++) {
        mazeSquares[row] = [];
        
        for (let col = 0; col < columns; col++) {
            let ms = new mazeSquare(col, row, sqWidth, sqHeight, xJunction);
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
//console.log(maze);

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
    }
    
    // hvis Ned
    if(Math.sign(current.rowIndex - validPathIndex.rowIndex) == -1){
        maze[current.rowIndex + 1][current.colIndex].wall = false;
    }
    
    // hvis Højre
    if(Math.sign(current.colIndex - validPathIndex.colIndex) == 1){
        maze[current.rowIndex][current.colIndex - 1].wall = false;
    }
    
    // hvis Venstre
    if(Math.sign(current.colIndex - validPathIndex.colIndex) == -1){
        maze[current.rowIndex][current.colIndex + 1].wall = false;
    }
    visited.push(current);
    current.wall = false;
    
    //Sletter current fra frontier array.
    frontier.splice(randomFrontierIndex, 1);
}

while(frontier.length > 0) {
    primAlgorithm();
}


// Wall spritecranberry picker tm
function pickWall() {
    // Loop gennem alle squares
    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            
            //Særtilfælde for kanter (up/down)
            if(i == 0 || i == columns-1) {
                //fravælger hjørner
                if(j !== 0 && j !== columns-1) {
                    for(let t = 0; t < maze[i][j].adjacentsWalls.length; t++) {
                        if(maze[i][j].adjacentsWalls[t].wall == true) {
                            wallcounter += 1;
                        }
                    }
                    switch(wallcounter) {
                        case 0:
                            break;

                        case 1:
                            //Endestykke
                            maze[i][j].background = Vertical;
                            wallcounter = 0;
                            break;

                        case 2:
                            maze[i][j].background = Horisontal;
                            wallcounter = 0;
                            break;

                        case 3:
                            if(i == 0) {
                                maze[i][j].background = TDown;
                            }
                            
                            if(i == columns-1) {
                                maze[i][j].background = TUp;
                            }
                            wallcounter = 0;
                            break;
                    }
                }
            }
            
            //Særtilfælde for kanter (left/right)
            if(j == 0 || j == rows-1) {
                if(i !== 0 && i !== rows-1) {
                    for(let t = 0; t < maze[i][j].adjacentsWalls.length; t++) {
                        if(maze[i][j].adjacentsWalls[t].wall == true) {
                            wallcounter += 1;
                        }
                    }
                    switch(wallcounter) {
                        case 0:
                            break;

                        case 1:
                            maze[i][j].background = Horisontal;
                            wallcounter = 0;
                            break;

                        case 2:
                            maze[i][j].background = Vertical;
                            wallcounter = 0;
                            break;

                        case 3:
                            if(j == 0) {
                                maze[i][j].background = TRight;
                            }
                            
                            if(j == columns-1) {
                                maze[i][j].background = TLeft;
                            }
                            wallcounter = 0;
                            break;
                    }
                }
            }
            //særtilfælde hjørner
            if(i == 0 && j == 0 || i == 0 && j == rows-1 || i == columns-1 && j == 0 || i == columns-1 && j == rows-1) {
                for(let t = 0; t < maze[i][j].adjacentsWalls.length; t++) {
                    if(maze[i][j].adjacentsWalls[t].wall == true) {
                        wallcounter += 1;
                    }
                }
                switch(wallcounter) {
                    case 0:
                        break;

                    case 1:
                        if(i == 0) {
                            if(maze[i][j].adjacentsWalls[0].wall == true) {
                                maze[i][j].background = Horisontal;
                            }
                            if(maze[i][j].adjacentsWalls[1].wall == true) {
                                maze[i][j].background = Vertical;
                            }
                        }
                        
                        if(i == columns-1) {
                            if(maze[i][j].adjacentsWalls[0].wall == true) {
                                maze[i][j].background = Vertical;
                            }
                            if(maze[i][j].adjacentsWalls[1].wall == true) {
                                maze[i][j].background = Horisontal;
                            }
                        }
                        wallcounter = 0;
                        break;

                    case 2:
                        if(i == 0 && j == 0) {
                            maze[i][j].background = TurnDownRight;
                        }
                        if(i == 0 && j == rows-1) {
                            maze[i][j].background = TurnDownLeft;
                        }
                        if(i == columns-1 && j == 0) {
                            maze[i][j].background = TurnUpRight;
                        }
                        if(i == columns-1 && j == rows-1) {
                            maze[i][j].background = TurnUpLeft;
                        }
                        
                        wallcounter = 0;
                        break;
                    }
                }
            // Hvis der er 4 adjacentWalls (aka. feltet ikke er i kanten) så brug denne kode til walludregning
            if(maze[i][j].adjacentsWalls.length == 4) {
                // tæller hvor mange adjacent walls der er
                for(let t = 0; t < maze[i][j].adjacentsWalls.length; t++) {
                    if(maze[i][j].adjacentsWalls[t].wall == true) {
                        wallcounter += 1;
                    }
                }
                
                switch(wallcounter) {     
                    case 0:
                        break;
                
                    case 1:
                        // Endestykke
                        if(maze[i][j].adjacentsWalls[0].wall == true) {
                            maze[i][j].background = EndUp;
                        }
                        if(maze[i][j].adjacentsWalls[1].wall == true) {
                            maze[i][j].background = EndLeft;
                        }
                        if(maze[i][j].adjacentsWalls[2].wall == true) {
                            maze[i][j].background = EndRight;
                        }
                        if(maze[i][j].adjacentsWalls[3].wall == true) {
                            maze[i][j].background = EndDown;
                        }
                        wallcounter = 0;
                        break;
                
                    case 2:
                        // Hjørner og lige vægge
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
                        // T Stykker
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
                        // + Stykker (er allerede lavet som standard)
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
            if(objectMaze[i][j].wall == false) {
                objectMaze[i][j].background = path;
            }
            objectMaze[i][j].draw();
        }
    }
}

let objectMaze = maze;



setInterval(function() {


    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
   for(let col of objectMaze) {
       for(let row of col) {
           row.draw();
       }
   }

   
    drawMaze();
   

    

}, 100);

pickWall();
