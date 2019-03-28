(function() {
  var noOfSquare = 4;
  var x = 0;
  var y = 0;
  var f = "SOUTH";
  var directionList = ["EAST", "WEST", "NORTH", "SOUTH"];
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
  // SOUTH WEST most cornet facing NORTH
  place("0,0 NORTH");

  // move the robot by 1 place
  function move() {
    switch (f) {
      case "EAST":
        x -= 1;
        break;
      case "WEST":
        x += 1;
        break;
      case "NORTH":
        y += 1;
        break;
      case "SOUTH":
        y -= 1;
        break;
    }
    var position = x + "," + y + " " + f;
    place(position);
  }

  // Placing the robot in a position
  function place(position) {
    var splitPostion = position.trim().split(" ");
    var coordiantes = splitPostion[0];
    var direction = splitPostion[1];
    if (isValidPosition(coordiantes, direction)) {
      // place the robo
    }
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateLeft() {
    var directionNumber = directionList.indexOf[f];
    var nextDirection = directionList[directionNumber - 1];
    if (nextDirection < 0) {
      f = directionList[directionList.length - 1];
    } else {
      f = directionList[directionNumber - 1];
    }
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateRight() {
    var directionNumber = directionList.indexOf[f];
    var nextDirection = directionList[directionNumber + 1];
    if (nextDirection === directionList.length) {
      f = directionList[0];
    } else {
      f = directionList[directionNumber + 1];
    }
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function report() {
    alert(x + "," + y + " " + f);
  }

  // check if the position is valid
  function isValidPosition(coordiantes, direction) {
    var isValid = true;
    var splitCoordinates = coordiantes.split(",");
    var xCordinates = parseInt(splitCoordinates[0], 10);
    var yCordinates = parseInt(splitCoordinates[1], 10);
    if (
      xCordinates + 1 > noOfSquare ||
      xCordinates - 1 < 0 ||
      yCordinates + 1 > noOfSquare ||
      yCordinates - 1 < 0
    ) {
      isValid = false;
    }
    return isValid;
  }

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
