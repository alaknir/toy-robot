(function() {
  var noOfSquare = 4;
  var x = 0;
  var y = 0;
  var f = "SOUTH";
  function renderLayout() {
    var tableLayout = document.getElementById("layout");
    var tableRowCells = [];
    var row = noOfSquare;
    while (row !== -1) {
      tableRowCells.push("<tr>");
      var cell = noOfSquare;
      while (cell !== -1) {
        tableRowCells.push('<td coordiantes="' + row + "," + cell + '"> ');
        tableRowCells.push("</td>");
        cell--;
      }
      tableRowCells.push("</tr>");
      row--;
    }
    tableLayout.innerHTML = tableRowCells.join("");
  }
  renderLayout();

  // move the robot by 1 place
  function move() {}

  // Placing the robot in a position
  function place(position) {}

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateLeft() {}

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateRight() {}

  // Rotate the robo to 90 degree based on the arrow pressed
  function report() {}

  // get the possible next directions
  function getPossibleDirections() {}

  // document.addEventListener("keypress", change);
  document.addEventListener("click", function(eve) {
    var targetId = eve.target.id;
    switch (targetId) {
      case "place":
        {
          var position = window.prompt(
            "Please enter position and robo facing direction in patter X,Y,F \n X(1 to 5),Y(1 to 5) and F is the direction EAST WEST NORT SOUTH"
          );
          place(position);
        }
        break;
      case "move":
        {
          move();
        }
        break;
      case "report":
        {
          report();
        }
        break;
      case "rotate-left":
        {
          rotateLeft();
        }
        break;
      case "rotate-right":
        {
          rotateRight();
        }
        break;
    }
  });
})();
