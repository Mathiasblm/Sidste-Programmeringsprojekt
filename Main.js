let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "#795548";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let columns = 10;
let rows = 10;
let lines = [];
let sqWidth = canvas.width/columns;
let sqHeight = canvas.height/rows;
let canvasX = (window.outerWidth - canvas.width)/2;
let canvasY = (window.outerHeight - canvas.height)/2;



window.onload = function() {
        // vertical lines
    for (let i = 0; i <= columns; i++){
      lines.push(new Line(
          (sqWidth*i),
          0,
          (sqWidth*i),
          canvas.height
      ));
    }

    // Horizontal lines
    for (let i = 0; i <= rows; i++){
      lines.push(new Line(
          0,
          (sqHeight * i),
          canvas.width,
          (sqHeight * i)
      ));
    }
    console.log(lines);
}

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let line of lines) {
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