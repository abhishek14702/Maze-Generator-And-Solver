;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  var Maze = mazeSolver.Maze = function (yMax, xMax) {
    this.x = xMax || Math.floor(Math.random() * 90) + 10;
    this.y = yMax || Math.floor(Math.random() * 90) + 10;
    this.dataStore = this._generate();
    this._randomizePrim();
  }
  // 

  Maze.prototype._generate = function () {
    // Create an empty array to store rows of cells
    var dataStore = [];
  
    // Loop through each row (y-axis) of the maze
    for (var y = 0; y < this.y; y++) {
      // Create an empty array to store cells in the current row
      var row = [];
  
      // Loop through each column (x-axis) of the maze
      for (var x = 0; x < this.x; x++) {
        // Create a new cell object and add it to the current row
        row.push(new mazeSolver.Cell(y, x));
      }
  
      // Add the row of cells to the dataStore array
      dataStore.push(row);
    }
  
    // Return the fully generated dataStore containing the maze structure
    return dataStore;
  }
  
// Prim's algorithm for generating a maze (http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm)  
Maze.prototype._randomizePrim = function () {
  // Select a RANDOM cell
  var y = Math.floor(Math.random() * this.y);
  var x = Math.floor(Math.random() * this.x);
  var cell = this.dataStore[y][x];

  // Mark cell as part of the maze
  cell.inMaze = true;

  // Calculate total number of cells in the maze
  var totalCells = this.x * this.y;
  var inMazeCount = 1;

  // Create a queue to store walls to be considered
  var q = [];

  // Add initial cell's walls to the queue
  this._addWalls(cell, q);

  var otherCell;
  
  // Main loop to connect cells using Prim's algorithm
  while (q.length) {
    // Pick a RANDOM wall from the queue
    var r = Math.floor(Math.random() * q.length);
    r = q.splice(r, 1)[0];

    // Check if the cell at the other side of the wall exists
    if (this.dataStore[r.cur[0]] && this.dataStore[r.cur[0]][r.cur[1]]) {
      cell = this.dataStore[r.cur[0]][r.cur[1]];
    }

    // Check if the selected cell is already in the maze
    if (cell.inMaze) {
      continue;
    }

    // Open the wall between the current cell and the other cell
    cell.adjacents.push([r.prev[0], r.prev[1]]);
    otherCell = this.dataStore[r.prev[0]][r.prev[1]];
    otherCell.adjacents.push([r.cur[0], r.cur[1]]);

    // Mark the current cell as part of the maze
    cell.inMaze = true;
    inMazeCount++;

    // If all cells are in the maze, exit the loop
    if (inMazeCount === totalCells) {
      return;
    }

    // Add the current cell's walls to the queue
    this._addWalls(cell, q);
  }
}

//add walls of a given cell to the queue q for consideration during the maze generation process
Maze.prototype._addWalls = function (cell, q) {
  var x = cell.x;
  var y = cell.y;

  // Loop through directions (up and down, left and right)
  [1, -1].forEach(function (d) {
    // Create an object to represent a wall
    var obj = {};

    // Define the previous and current coordinates for the wall
    obj.prev = [y, x];
    obj.cur = [y + d, x];

    // Push the wall object to the queue
    q.push(obj);

    // Create another wall object for the perpendicular direction
    obj = {};
    obj.prev = [y, x];
    obj.cur = [y, x + d];

    // Push the second wall object to the queue
    q.push(obj);
  });
}



Maze.prototype.solve = function (y, x) {
  // Reset parent pointers for all cells
  this._resetParentPointers();

  // Create an object to keep track of seen coordinates
  var seen = { undefined: true };

  var coord, cell, x, y;
  var q = [[y, x]];

  var lastSeen;

  // Breadth-First Search (BFS) loop 
  while (q.length) {
    // Get the first coordinate from the queue
    coord = q.shift();
    lastSeen = coord;

    // Mark the coordinate as seen
    seen[coord] = true;

    y = coord[0];
    x = coord[1];
    cell = this.dataStore[y][x];

    // Iterate through adjacent coordinates of the current cell
    cell.adjacents.forEach(function (adj) {
      if (!seen[adj]) {
        var adjY = adj[0];
        var adjX = adj[1];

        // Set the parent of the adjacent cell to the current cell
        this.dataStore[adjY][adjX].parent = cell;

        // Enqueue the adjacent coordinate for further exploration
        q.push(adj);
      }
    }.bind(this));
  }

  // Return the last seen coordinate after completing BFS
  return lastSeen;
}
  Maze.prototype.countSteps = function (y, x) {
    //counts the number of steps from start (provided) to already computed end coord
    //to be used for percentage color shading
    this.numberOfSteps = 0;
    var cell = this.dataStore[y][x];
    while (cell) {
      this.numberOfSteps++;
      cell = cell.parent;
    }
  }

  Maze.prototype._resetParentPointers = function () {
    for (var y = 0; y < this.y; y++) {
      for (var x = 0; x < this.x; x++) {
        this.dataStore[y][x].parent = undefined;
      }
    }
  }
}());
