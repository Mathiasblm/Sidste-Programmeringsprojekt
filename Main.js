let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height = 600;

ctx.fillStyle = "#795548";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let columns = 20;
let rows = 20;
let lines = [];
let sqWidth = canvas.width/columns;
let sqHeight = canvas.height/rows;
let canvasX = (window.innerWidth - canvas.width)/2;
let canvasY = (window.innerHeight - canvas.height)/2;


window.onload = function() {
        // vertical lines
    console.log("this is porn");
    for (let i = 0; i <= columns; i++){
        console.log("doggy");
      lines.push(new Line(
          canvasX + ((canvas.width/columns) * i),
          canvasY,
          canvasX + ((canvas.width/columns) * i),
          canvasY + canvas.height
      ));

    }

    // Horizontal lines
    for (let i = 0; i <= rows; i++){
        console.log("style");
      lines.push(new Line(
          canvasX,
          canvasY + ((canvas.height/rows) * i),
          canvasX + canvas.width,
          canvasY + ((canvas.height/rows) * i)
      ));

    }
    console.log(lines);
}

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let line of lines){
        line.draw();
    }
}, 1000, 100);
    



function generateMaze() {
    let mazeSquares = [];
    for (let y = 0; y < columns; y++) {
        mazeSquares[y] = [];
        for (let x = 0; x < rows; x++) {
            mazeSquares[y].push(new mazeSquare(
            x,
            y));
        }
    }
    return mazeSquares
}
console.log(generateMaze());

