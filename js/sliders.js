;(function() {
  var value;
  
  // Loop through dimensions "x" and "y"
  ["x", "y"].forEach(function (dimension) {
    // Use jQuery to initialize a slider for the specified dimension
    $("#" + dimension + "-slider").slider({
      range: "min",
      value: 50,
      min: 10,
      max: 100,
      step: 1,
      slide: function( e, ui ) {
        // While sliding the slider, update the value in the corresponding #amount div element
        document.getElementById(dimension + "-dimension-value").innerHTML = ui.value;
      }
    });
    
    // Get the initial value of the slider
    value = $("#" + dimension + "-slider").slider("value");
    
    // Set the initial slider value in the corresponding div element
    document.getElementById(dimension + "-dimension-value").innerHTML = value;
  });
}());
