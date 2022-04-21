class mazeSquare {
    constructor(colIndex, rowIndex, xPos, yPos, background) {
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
        ctx.drawImage(this.background, (canvas.width / rows)* this.colIndex,
        (canvas.height / columns)* this.rowIndex,
        canvas.width / rows,
        canvas.height / columns
        );
    }
}