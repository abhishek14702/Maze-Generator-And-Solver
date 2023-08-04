;(function() {
  // Check if the mazeSolver namespace is already defined, if not, initialize it as an empty object
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  // Define an object to hold CSS-related functions
  var css = mazeSolver.css = {};

  // Define an initialization function for the CSS module
  css.initialize = function () {
    css.queryViewport(); // Get viewport dimensions
    css.sizeBoxes(); // Set size for maze and controls
    mazeSolver.maze = new mazeSolver.Maze(50, 50); // Create a new maze with dimensions 50x50
    mazeSolver.view = new mazeSolver.MazeView(mazeSolver.maze); // Create a new view for the maze
    mazeSolver.events.bind(); // Bind events for maze generation and solving
  }

  // Define a function to query and store viewport dimensions
  css.queryViewport = function () {
    mazeSolver.windowWidth = $(window).width() - 120; // Subtract 120 pixels for the sidebar
    mazeSolver.windowHeight = $(window).height() - 40; // Subtract 40 pixels for margins
    mazeSolver.sidebarWidth = Math.floor(mazeSolver.windowWidth / 5); // Sidebar width is 1/5 of the window width
    mazeSolver.sidebarHeight = mazeSolver.windowHeight;
    mazeSolver.mazeWidth = mazeSolver.windowWidth - mazeSolver.sidebarWidth; // Maze width is window width minus sidebar width
    mazeSolver.mazeHeight = mazeSolver.windowHeight; // Maze height is window height
  }

  // Define a function to set the size of boxes (controls and maze)
  css.sizeBoxes = function () {
    var c = document.getElementById('controls');
    c.width = mazeSolver.sidebarWidth; // Set controls width
    // c.height = mazeSolver.sidebarHeight; // (This line is commented out)
    var m = document.getElementById('maze');
    m.width = mazeSolver.mazeWidth; // Set maze width
    m.height = mazeSolver.mazeHeight; // Set maze height
  }
}());
