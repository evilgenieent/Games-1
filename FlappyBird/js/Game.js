


// -------------------------------------------------------------- //
// IMAGES


  // sky

  var skyReady = false;
  var skyImage = new Image();
  skyImage.onload = function () {
    skyReady = true;
  };
  skyImage.src = "images/sky.png";


  // grass

  var grassReady = false;
  var grassImage = new Image();
  grassImage.onload = function () {
    grassReady = true;
  };
  grassImage.src = "images/grass.png";


// DRAWING THE IMAGES


  // Rendering a position for every image
  var render = function () {

    // sky
    if (skyReady) {
      ctx.drawImage(skyImage, 0, 0);
    }

    // grass
    if (grassReady) {
      ctx.drawImage(grassImage, grassX, 340);
      ctx.drawImage(grassImage, canvas.width - Math.abs(grassX), 340);
    }

    Pipes.display();
    bird.display();
  } 



  // Calculating the shifted starting point's X coordinate
  var shiftGrass = function(amount) {
    if (Math.abs(grassX) > canvas.width)
      grassX = 0;

    grassX -= amount;
  }


  var shiftScreen = function(delta)
  {
    amount = delta * SHIFT_SPEED;

    shiftGrass(amount);
    Pipes.shift(amount);

    if (gameStarted)
      bird.shift(delta);
  }


// -------------------------------------------------------------- //
// KEYBOARD CONTROLS

  var keysDown = {};

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);


  var jumpIfRequested = function()
  {
    if (32 in keysDown) { // Player holding space
      bird.jump();
      gameStarted = true;
    }
  }


// -------------------------------------------------------------- //
// MAIN
  
  // The main method
  var main = function () {

    var now = Date.now();
    var delta = now - then;

    render();

    jumpIfRequested();
    shiftScreen(delta / 1000);

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
  };


  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame = w.requestAnimationFrame ||
                          w.webkitRequestAnimationFrame ||
                          w.msRequestAnimationFrame ||
                          w.mozRequestAnimationFrame;



  // Play the game!
  var then = Date.now();
  main();