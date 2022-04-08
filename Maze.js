class mazeSquare {
    constructor(rowIndex, colIndex, xPos, yPos, background) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.xPos = xPos;
        this.yPos = yPos;
        this.background = background;
        this.wall = true;
        this.status = "not indexed";
        this.adjacents = [];
        this.connections = [];
    }
    
    draw(background) {
        ctx.drawImage(this.background, (canvas.width / columns)* this.colIndex,
        (canvas.height / rows)* this.rowIndex,
        canvas.width / columns,
        canvas.height / rows
        );
    }
}