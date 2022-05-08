


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
            newMazeObj.background = maze[i][j].background.src;
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

function getAndDisplayMaze(){

    //console.log(see_maze_id_input.value);
    let value = see_maze_id_input.value;

    fetch("/displayMaze/" +  value)
    .then(response => response.json())
    .then(data => {
        
        console.log(JSON.stringify(data));
        // {"result":[{"_id":2,"Maze": [[{}, {}, {}...]] }] }
        // object med array i
        // array med object i
        // object med 2 keys i
        // den 2 key har value af nested array

        

    });
}

