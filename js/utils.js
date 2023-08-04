;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  // Define a function to generate an array of colors transitioning between two colors
  mazeSolver.stepColors = function (color1, color2, steps) {
    var diff = [];
    var logOffset = [];
    var curColor, curStep;
    var split1 = color1.match(/\w{2}/g); // Split color1 into its RGB components
    var split2 = color2.match(/\w{2}/g); // Split color2 into its RGB components
    var max = [1, 1, 1]; // Initialize max for each color to represent color1 > color2

    // Calculate differences and logOffset for each color component
    for (var i = 0; i < 3; i++) {
      var a = parseInt(split1[i], 16);
      var b = parseInt(split2[i], 16);
      if (a < b) {
        max[i] = 0;
      }
      diff.push(Math.abs(a - b));
      var totalSteps = Math.log2(steps);
      logOffset.push(diff[i] / totalSteps);
    }

    var result = [];

    // Generate an array of colors transitioning step by step
    for (var i = 1; i <= steps; i++) {
      curStep = ['#'];
      for (var j = 0; j < 3; j++) {
        if (max[j]) {
          curColor = parseInt(split2[j], 16) + Math.floor(logOffset[j] * Math.log2(i));
        } else {
          curColor = parseInt(split1[j], 16) + Math.floor(logOffset[j] * Math.log2(i));
        }
        curColorHex = curColor.toString(16);
        if (curColorHex.length == 1) { curColorHex += curColorHex };
        curStep.push(curColorHex);
      }

      result.push(curStep.join(''));
    }
    return result;
  }

  // Define a function to check if two arrays are equal
  mazeSolver.areEqual = function (arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  }

  // Define a function to prioritize adjacent cells based on direction towards destination
  mazeSolver.prioritizeAdjacentOrder = function (cur, dest, adjacents) {
    var cX = cur[1];
    var cY = cur[0];
    var dX = dest[1];
    var dY = dest[0];

    var order;
    if (cY <= dY && cX <= dX) {
      order = [1, 2, 0, 3];
    } else if (cY <= dY) {
      order = [2, 3, 0, 1];
    } else if (cY > dY && cX > dX) {
      order = [0, 3, 1, 2];
    } else {
      return adjacents;
    }

    var result = [];
    for (var i = 0; i <= order.length; i++) {
      if (adjacents[i]) {
        result.push(adjacents[i]);
      }
    }
    return result;
  }
}());
