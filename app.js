


//console.log("app.js says, maze is: ", maze);


let total_mazes_input = document.getElementById("TOTAL_MAZES_INPUT");
let see_maze_id_input = document.getElementById("SEE_MAZE_ID_INPUT");
let object = [];
let mazeIdNum = 0;


function arrayToObj(){
    
    for(let i = 0; i < rows; i++){
        let newRow = [];
        for(let j = 0; j < columns; j++){
            
            let newMazeObj = {};
            newMazeObj.rowIndex = maze[i][j].rowIndex; 
            //console.log(maze[i][j].rowIndex);
            newMazeObj.colIndex = maze[i][j].colIndex;
            //console.log(maze[i][j].colIndex);
            newMazeObj.xPos = maze[i][j].xPos;
            //console.log(maze[i][j].xPos);
            newMazeObj.yPos = maze[i][j].yPos;
            //console.log(maze[i][j].yPos);
            
            let a = maze[i][j].background.src;
            let searchString = 'http://localhost:3001/';
            a = a.replace(searchString,"");
            //console.log(a);
            newMazeObj.background = a;
            if(maze[i][j].wall == false) {
                newMazeObj.background = "Sprites/Path.png";
            }
            
            //console.log(maze[i][j].background.src);
            newMazeObj.wall = maze[i][j].wall;
            //console.log(maze[i][j].wall);

            
            newRow.push(newMazeObj);
            
            

        }
        object.push(newRow);
    }
    
}
arrayToObj();
//console.log(arr);



// sub_comment
function saveMaze() {

  console.log("saveMaze is called");
  let data = {
    Maze: object
  };
  // set id of object to num fx. 1,2,3...
  data._id = mazeIdNum;
  
  //console.log(JSON.stringify(data));
  fetch('./saveTheMaze', {
      
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  .then(response => response.json())
  .then(data => {


    console.log('Maze inserted:', data);
    alert("Maze is saved!");
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    

}



function getNumOfMazes(){

    fetch("/numOfMazes")
    .then(response => response.json())
    // object with num of arrays
    .then(data => {
        
        //console.log(data.Mazes.length);
        total_mazes_input.value = data.Mazes.length;


        // if mazes is removed manual in db, then update maze id var
        // can duplicate id's if it is not the last id removed, but one in the middel
        if(mazeIdNum < data.Mazes.length){
            mazeIdNum = data.Mazes.length;
        }

        mazeIdNum = data.Mazes.length + 1;
    
    });
}

let newMaze = [];

function getAndDisplayMaze(){

    //console.log(see_maze_id_input.value);
    let value = see_maze_id_input.value;

    fetch("/displayMaze/" +  value)
    .then(response => response.json())
    .then(data => {
        
        //console.log(JSON.stringify(data));
        // {"result":[{"_id":2,"Maze": [[{}, {}, {}...]] }] }
        // object med array i
        // array med object i
        // object med 2 keys i
        // den 2 key har value af nested array

        console.log(data);

        newMaze = [];

        let obj = data;
        //console.log(obj[Object.keys(obj)[0]][0].Maze);
        let newLoopMaze = obj[Object.keys(obj)[0]][0].Maze;
        
        
        //console.log(loopMaze);

        
        
        for(let i = 0; i < rows; i++){
            let newRow = [];
            for(let j = 0; j < columns; j++){


                if(newLoopMaze[i][j].background == "Sprites/Path.png"){
                    newLoopMaze[i][j].background = path;
                }
                if(newLoopMaze[i][j].background == "Sprites/X_junction/X_junction.png"){
                    newLoopMaze[i][j].background = xJunction;
                }
                if(newLoopMaze[i][j].background == "Sprites/End/End_N.png"){
                    newLoopMaze[i][j].background = EndUp;
                }
                if(newLoopMaze[i][j].background == "Sprites/End/End_W.png"){
                    newLoopMaze[i][j].background = EndLeft;
                }
                if(newLoopMaze[i][j].background == "Sprites/End/End_S.png"){
                    newLoopMaze[i][j].background = EndDown;
                }
                if(newLoopMaze[i][j].background == "Sprites/End/End_E.png"){
                    newLoopMaze[i][j].background = EndRight;
                }
                if(newLoopMaze[i][j].background == "Sprites/Straight/Straight_W.png"){
                    newLoopMaze[i][j].background = Horisontal;
                }
                if(newLoopMaze[i][j].background == "Sprites/Straight/Straight_N.png"){
                    newLoopMaze[i][j].background = Vertical;
                }
                if(newLoopMaze[i][j].background == "Sprites/T_junction/T_junction_N.png"){
                    newLoopMaze[i][j].background = TUp;
                }
                if(newLoopMaze[i][j].background == "Sprites/T_junction/T_junction_W.png"){
                    newLoopMaze[i][j].background = TLeft;
                }
                if(newLoopMaze[i][j].background == "Sprites/T_junction/T_junction_S.png"){
                    newLoopMaze[i][j].background = TDown;
                }
                if(newLoopMaze[i][j].background == "Sprites/T_junction/T_junction_E.png"){
                    newLoopMaze[i][j].background = TRight;
                }
                if(newLoopMaze[i][j].background == "Sprites/Turn/Turn_N_W.png"){
                    newLoopMaze[i][j].background = TurnUpLeft;
                }
                if(newLoopMaze[i][j].background == "Sprites/Turn/Turn_E_N.png"){
                    newLoopMaze[i][j].background = TurnUpRight;
                }
                if(newLoopMaze[i][j].background == "Sprites/Turn/Turn_W_S.png"){
                    newLoopMaze[i][j].background = TurnDownLeft;
                }
                if(newLoopMaze[i][j].background == "Sprites/Turn/Turn_S_E.png"){
                    newLoopMaze[i][j].background = TurnDownRight;
                }


                
                let ms = new mazeSquare(
                    newLoopMaze[i][j].colIndex, 
                    newLoopMaze[i][j].rowIndex, 
                    newLoopMaze[i][j].xPos, 
                    newLoopMaze[i][j].yPos, newLoopMaze[i][j].background);
                
                
                
                newRow.push(ms);
                
                
    
            }
            newMaze.push(newRow);
        }
        console.log("new maze is: ", newMaze);

        objectMaze = newMaze;
        
        

    });
}


