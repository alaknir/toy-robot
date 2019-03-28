(function() {
  var noOfSquare = 4;
  var x = 0;
  var y = 0;
  var f = "";
  var directionList = ["EAST", "NORTH", "WEST", "SOUTH"];

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

  function createAndPlaceRobo(coordiantes, direction) {
    var getCellWithCoodinates = document.querySelector(
      '[coordiantes="' + coordiantes + '"]'
    );

    if (getCellWithCoodinates.childElementCount > 0) {
      return;
    }

    var getRoboElement = document.querySelector(".robo");
    if (getRoboElement) {
      getRoboElement.parentNode.removeChild(getRoboElement);
    }

    var roboElement = [];
    roboElement.push('<div class="robo ' + direction + ' ">');
    roboElement.push(" ");
    roboElement.push("</div>");
    getCellWithCoodinates.innerHTML = roboElement.join("");
  }

  renderLayout();

  // Intial position SOUTH WEST most cornet facing NORTH
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
      var splitCoordinates = getSplitCoordinates(coordiantes);
      x = splitCoordinates.xCordinates;
      y = splitCoordinates.yCordinates;
      f = direction;
      createAndPlaceRobo(coordiantes, direction);
    }
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateLeft() {
    var directionNumber = directionList.indexOf(f);
    var nextDirection = directionList[directionNumber - 1];
    if (nextDirection < 0) {
      f = directionList[directionList.length - 1];
    } else {
      f = directionList[directionNumber - 1];
    }
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateRight() {
    var directionNumber = directionList.indexOf(f);
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
    var splitCoordinates = getSplitCoordinates(coordiantes);
    var xCordinates = splitCoordinates.xCordinates;
    var yCordinates = splitCoordinates.yCordinates;
    if (
      xCordinates > noOfSquare ||
      xCordinates < 0 ||
      yCordinates > noOfSquare ||
      yCordinates < 0
    ) {
      isValid = false;
    }
    return isValid;
  }

  // utility
  // to split comma separated coordinates
  function getSplitCoordinates(coordiantes) {
    var splitCoordinates = coordiantes.split(",");
    var xCordinates = parseInt(splitCoordinates[0], 10);
    var yCordinates = parseInt(splitCoordinates[1], 10);
    return {
      xCordinates: xCordinates,
      yCordinates: yCordinates
    };
  }

  // handle button click events
  function handleButtonClick(eve) {
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
        move();
        break;
      case "report":
        report();
        break;
      case "rotate-left":
        rotateLeft();
        break;
      case "rotate-right":
        rotateRight();
        break;
    }
  }

  // document.addEventListener("keypress", change);
  document.addEventListener("click", handleButtonClick);
})();
