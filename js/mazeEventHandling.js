;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  var events = window.mazeSolver.events = {};

  events.bind = function () {
    // Create an array to store the 'Generate' buttons
    this.generateButtons = [];
  
    // Push the 'Generate' and 'Generate Random' buttons into the generateButtons array
    this.generateButtons.push(document.getElementById('generate'));
    this.generateButtons.push(document.getElementById('generate-random'));
  
    // Attach a click event listener to each 'Generate' button
    this.generateButtons.forEach(function (btn) {
      btn.addEventListener('click', events.generateMaze, false);
    });
  
    // Get the HTML element representing the maze
    this.mazeDiv = document.getElementById('maze');
  
    // Attach a click event listener to the maze element for solving the maze
    this.mazeDiv.addEventListener('click', events.solveMaze.bind(this), false);
  };
  

  events.generateMaze = function () {
    // If maze rendering is already in progress, exit the function
    if (mazeSolver.view.rendering) {
      return;
    }
  
    // Check if this function was triggered by the 'Generate' button
    // If so, retrieve the maze dimensions from the HTML elements
    if (this.id === 'generate') {
      var x = document.getElementById('x-dimension-value').innerHTML;
      var y = document.getElementById('y-dimension-value').innerHTML;
    }
  
    // Query the viewport for dimensions and size maze boxes
    mazeSolver.css.queryViewport();
    mazeSolver.css.sizeBoxes();
  
    // Create a new maze using the specified dimensions (x and y)
    mazeSolver.maze = new mazeSolver.Maze(y, x);
  
    // Create a new maze view with the generated maze
    mazeSolver.view = new mazeSolver.MazeView(mazeSolver.maze);
  };
  

  events.solveMaze = function (e) {
    // If maze rendering is in progress, exit the function
    if (mazeSolver.view.rendering) {
      return;
    }
  
    // Get the x and y coordinates of the clicked cell
    var x = e.target.getAttribute('data-x');
    var y = e.target.getAttribute('data-y');
  
    // If x or y is missing, exit the function
    if (!x || !y) {
      return;
    }
  
    // If a starting point has already been chosen
    if (mazeSolver.startCoord) {
      // Check if the selected cell matches the starting point
      if (mazeSolver.startCoord[0] == y && mazeSolver.startCoord[1] == x) {
        // Display a message if the chosen destination is the same as the starting point
        document.getElementById('click-message').innerHTML = "Please choose a destination away from your starting point...";
        return;
      }
  
      // Set the ending coordinates and update the class of the ending cell
      mazeSolver.endCoord = [y, x];
      mazeSolver.endDiv = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
      mazeSolver.endDiv.className += ' end';
    } else {
      // If a starting point hasn't been chosen yet
      if (mazeSolver.startDiv) {
        // Reset the view if a previous starting point was chosen
        mazeSolver.view._reset();
      }
  
      // Set the starting coordinates and update the class of the starting cell
      mazeSolver.startCoord = [y, x];
      mazeSolver.startDiv = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
      mazeSolver.startDiv.className += ' start';
  
      // Update the click message to prompt the user to choose a destination
      document.getElementById('click-message').innerHTML = "Now choose your destination...";
      return;
    }
  
    // Disable maze generation buttons and display a message
    events.disableButtons();
    document.getElementById('click-message').innerHTML = 'Solving, please stand by...';
  
    // Solve the maze using the chosen algorithm (currently using the solve method)
    mazeSolver.maze.solve(mazeSolver.endCoord[0], mazeSolver.endCoord[1]);
  
    // Render the solved path on the maze view
    mazeSolver.view.renderPath(mazeSolver.startCoord[0], mazeSolver.startCoord[1]);
  
    // Reset the starting and ending coordinates for future solving attempts
    mazeSolver.startCoord = null;
    mazeSolver.endCoord = null;
  };
  

  events.disableButtons = function () {
    this.generateButtons.forEach(function (btn) {
      btn.disabled = 'disabled';
    });
  }

  events.enableButtons = function () {
    this.generateButtons.forEach(function (btn) {
      btn.disabled = null;
    });
  }
}());
