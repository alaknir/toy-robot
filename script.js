(function() {
  var noOfSquare = 4;
  var x = 0;
  var y = 0;
  var f = "";
  var directionList = ["EAST", "NORTH", "WEST", "SOUTH"];

  function init() {
    renderLayout();
    // Intial position SOUTH WEST most cornet facing NORTH
    place("0,0 NORTH");
  }

  function renderLayout() {
    var tableLayout = document.getElementById("layout");
    var tableRowCells = [];
    var row = noOfSquare;
    while (row !== -1) {
      tableRowCells.push("<tr>");
      var cell = noOfSquare;
      while (cell !== -1) {
        tableRowCells.push('<td coordiantes="' + cell + "," + row + '"> ');
        tableRowCells.push("</td>");
        cell--;
      }
      tableRowCells.push("</tr>");
      row--;
    }
    tableLayout.innerHTML = tableRowCells.join("");
  }

  // Placing the robot in a position
  function place(position) {
    var splitPostion = position.trim().split(" ");
    var coordiantes = splitPostion[0];
    var direction = splitPostion[1];
    if (isValidPosition(coordiantes, direction)) {
      var splitCoordinates = getSplitCoordinates(coordiantes);
      x = splitCoordinates.xCordinates || x;
      y = splitCoordinates.yCordinates || y;
      f = direction || f;
      createAndPlaceRobo(x + "," + y, f);
    }
  }

  function createAndPlaceRobo(coordiantes, direction) {
    var getCellWithCoodinates = document.querySelector(
      '[coordiantes="' + coordiantes + '"]'
    );

    var robotElement = getRobotElement();
    if (robotElement) {
      robotElement.parentNode.removeChild(robotElement);
    }

    var robotElementArray = [];
    robotElementArray.push('<div class="robot ' + direction + ' ">');
    robotElementArray.push("<div class='robot-head'></div>");
    robotElementArray.push("<div class='robot-legs'></div>");
    robotElementArray.push("</div>");
    getCellWithCoodinates.innerHTML = robotElementArray.join("");
  }

  // move the robot by 1 place
  function move() {
    var maxMoveLimit = noOfSquare;
    var minMoveLimit = 0;
    switch (f) {
      case "EAST":
        x = x >= maxMoveLimit ? maxMoveLimit : x + 1;
        break;
      case "WEST":
        x = x <= minMoveLimit ? minMoveLimit : x - 1;
        break;
      case "NORTH":
        y = y >= maxMoveLimit ? maxMoveLimit : y + 1;
        break;
      case "SOUTH":
        y = y <= minMoveLimit ? minMoveLimit : y - 1;
        break;
    }
    var position = x + "," + y + " " + f;
    place(position);
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateLeft() {
    var directionNumber = directionList.indexOf(f);
    var nextDirection = directionList[directionNumber - 1];
    if (!nextDirection) {
      f = directionList[directionList.length - 1];
    } else {
      f = directionList[directionNumber - 1];
    }
    updateDirection();
  }

  // Rotate the robo to 90 degree based on the arrow pressed
  function rotateRight() {
    var directionNumber = directionList.indexOf(f);
    var nextDirection = directionList[directionNumber + 1];
    if (!nextDirection) {
      f = directionList[0];
    } else {
      f = directionList[directionNumber + 1];
    }
    updateDirection();
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

  function getRobotElement() {
    return document.querySelector(".robot");
  }

  function updateDirection() {
    var robotElement = getRobotElement();
    robotElement.setAttribute("class", "robot " + f);
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

  function handleKeyPress(eve) {
    var charCode = eve.charCode;
    if (charCode === 13) {
      var textBoxValue = (eve.target.value || "").toUpperCase();
      switch (textBoxValue) {
        case "MOVE":
          move();
          break;
        case "LEFT":
          rotateLeft();
          break;
        case "RIGHT":
          rotateRight();
          break;
        case "REPORT":
          report();
        default:
          if (textBoxValue.indexOf("PLACE") !== -1) {
            place(textBoxValue.replace("PLACE", "").trim());
          }
      }
    }
  }

  // initialization
  init();

  // document.addEventListener("keypress", change);
  document.addEventListener("click", handleButtonClick);
  // on enter after typing on the text box
  document
    .getElementById("command-palette")
    .addEventListener("keypress", handleKeyPress);
})();
