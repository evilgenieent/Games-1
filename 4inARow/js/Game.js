// CREATING THE CANVAS

	var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);

// Static variables

  // The board
  board = new Board();

  // The permission to allow players to move
  allowedToMove = true;
  nextColor = "red";
  nextCoinImage = redCoinImage;

// -------------------------------------------------------------- //
// -------------------------------------------------------------- //
// MAIN

  var main = function () {

    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }

    var winner = board.checkIfSomeoneWon();
    if (winner != "none")
    {
      // Score
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.font = "20px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Winner: " + winner, 32, 32);

      allowedToMove = false;
    }

    // Request to do this again ASAP
    requestAnimationFrame(main);

  };

  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame ||
                          w.webkitRequestAnimationFrame ||
                          w.msRequestAnimationFrame ||
                          w.mozRequestAnimationFrame;

  main();



// -------------------------------------------------------------- //
// Click CONTROLS

  addEventListener("click", function (e) {
    var x = e.x - canvas.offsetLeft;
    var y = e.y - canvas.offsetTop;

    var column = Math.floor((x - 15) / 90);
    var row = Math.floor((y - 5) / 80);

    
      
    if (column <= 6 && row <= 5 && allowedToMove)
    {
      var place = board.getLastFreePlace(column);

      board.getPlace(column, place).setContent(nextColor);
      nextColor = (nextColor == "red") ? "yellow" : "red";
      nextCoinImage = (nextColor == "red") ? yellowCoinImage : redCoinImage;
      ctx.drawImage(nextCoinImage, 15 + column * 90, 5 + place * 80);
    }

  }, false);







