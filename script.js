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
        tableRowCells.push('<td coordiantes="' + row + "," + cell + '">');
        tableRowCells.push("</td>");
        cell--;
      }
      tableRowCells.push("</tr>");
      row--;
    }
    tableLayout.innerHTML = tableRowCells.join("");
  }

  // move the robot by 1 place
  function move() {}

  // Placing the robot in a position
  function place() {}

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotate() {}

  renderLayout();

  document.addEventListener("keypress", change);
})();
