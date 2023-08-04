//immediately-invoked function expression
;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {}; //initializes an empty object 
  }

  var Cell = mazeSolver.Cell = function (y,x) {
    //properties of the cell
    this.y = y;
    this.x = x;
    this.adjacents = [];
    this.inMaze = false;
    this.parent;
  }
}());
