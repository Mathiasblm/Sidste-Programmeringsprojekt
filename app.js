


console.log("app.js says, maze is: ", maze);



let arr = [];



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
        arr.push(newRow);
    }
    
}
arrayToObj();
console.log(arr);



// sub_comment
function saveMaze() {

  console.log("saveMaze is called");
  let data = {
    Maze: arr
  };

  
  console.log(JSON.stringify(data));
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
