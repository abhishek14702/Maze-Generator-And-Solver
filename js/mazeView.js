;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  var MazeView = mazeSolver.MazeView = function (maze) {
    this.maze = maze;
    this.setCellSize();
    this.render();
  }

  MazeView.prototype.setCellSize = function () {
    // Calculate the cell size based on the dimensions of the maze and the available display area
    this.cellSize = Math.floor(Math.min(
      Math.floor(mazeSolver.mazeHeight / this.maze.y), // Calculate the maximum cell size based on height
      Math.floor(mazeSolver.mazeWidth / this.maze.x)   // Calculate the maximum cell size based on width
    ));
  };
  
  MazeView.prototype._reset = function () {
    // Select all elements with data-x and data-y attributes
    var elements = document.querySelectorAll('[data-x][data-y]');
  
    // Loop through each element and reset their classes and background color
    Array.prototype.forEach.call(elements, function (el) {
      // Remove classes 'current', 'seen', and 'explored' using regular expressions
      ['current', 'seen', 'explored'].forEach(function (klass) {
        el.className = el.className.replace(new RegExp(klass, 'g'), '');
      });
  
      // Reset the background color to its default state
      el.style.background = null;
    });
  
    // Remove the 'start' and 'end' classes from the start and end cells
    mazeSolver.startDiv.className = mazeSolver.startDiv.className.replace(new RegExp('start', 'g'), '');
    mazeSolver.endDiv.className = mazeSolver.endDiv.className.replace(new RegExp('end', 'g'), '');
  };
  

  MazeView.prototype.render = function () {
    this._generateHTML();
  }

  MazeView.prototype._generateHTML = function () {
    var mazeDiv = document.getElementById('maze');
    mazeDiv.style.opacity = '0';
  
    // Use a timeout to delay the rendering process for a smooth fade-in effect
    setTimeout(function () {
      mazeDiv.innerHTML = null;
  
      // Set the width and height of the maze container based on the cell size and maze dimensions
      mazeDiv.style.width = this.cellSize * this.maze.x + 10 + 'px';
      mazeDiv.style.height = this.cellSize * this.maze.y + 10 + 'px';
  
      // Loop through rows and columns to create maze cells
      for (var y = 0; y < this.maze.y; y++) {
        var row = document.createElement('div');
        row.className = 'maze-row';
  
        for (var x = 0; x < this.maze.x; x++) {
          var el = document.createElement('div');
          el.setAttribute('data-x', x);
          el.setAttribute('data-y', y);
          el.style.width = this.cellSize + 'px';
          el.style.height = this.cellSize + 'px';
  
          var classes = ['maze-cell'];
  
          // Determine the open walls of the current cell based on its adjacent cells
          this.maze.dataStore[y][x].adjacents.forEach(function (adj) {
            if (adj[0] < y) {
              classes.push('up-open');
            } else if (adj[0] > y) {
              classes.push('down-open');
            } else if (adj[1] > x) {
              classes.push('right-open');
            } else {
              classes.push('left-open');
            }
          });
  
          el.className = classes.join(' ');
  
          row.appendChild(el);
        }
  
        mazeDiv.appendChild(row);
      }
  
      // After generating the maze structure, fade it in by changing opacity
      mazeDiv.style.opacity = '1';
    }.bind(this), 150);
  };
  
  MazeView.prototype.renderPath = function (y, x) {
    this.maze.countSteps(y,x);
    //TO DO insert variable colors?
    this.colors = mazeSolver.stepColors('#000000','#ffff00', this.maze.numberOfSteps);
    this.rendering = true;
    var cell = this.maze.dataStore[y][x];
    var el;

    this.count = 1;
    pathTrace = setInterval(function () {
      cell = this._goToNextCell(cell);
      if (!cell) {
        clearInterval(pathTrace);
        this.rendering = false;
        mazeSolver.startCoord = null;
        mazeSolver.endCoord = null;
        mazeSolver.events.enableButtons();
        document.getElementById('click-message').innerHTML = "Click any two locations in the maze to find the shortest path between them!";
      }
    }.bind(this), 25);
  }

  MazeView.prototype._goToNextCell = function (cell) {
    el = document.querySelector('[data-x="' + cell.x + '"][data-y="' + cell.y + '"]');
    el.style.background = this.colors[this.count];

    this.count++;
    return cell.parent;
  }
}());
