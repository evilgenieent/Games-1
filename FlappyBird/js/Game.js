


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

  var trollReady = false;
  var troll = new Image();
  troll.src = "images/troll.png";
  troll.onload = function () {
    trollReady = true;
  }


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
    
    if (bird.ready) {
      bird.display();
    }

    
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
    bot.record();
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
  

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
                        w.webkitRequestAnimationFrame ||
                        w.msRequestAnimationFrame ||
                        w.mozRequestAnimationFrame;

var gameStarted = false;
var then;
var grassX;
var myMath;
var score;
var database;

window.onload = function() { database = new Database(); main(); }

function main(){
  then = Date.now();
  gameStarted = false;
  trollShown = false;
  grassX = 0;
  score = 0;
  pipeSet = new Set();
  myMath = new MyMath();
  bird = new Bird();
  jumpsPerformed = new Set();
  document.body.appendChild(canvas);

  bot = new Bot();

  loop();
}

// The main method
function loop() {

  var now = Date.now();
  var delta = (now - then) * SPEED;

  render();

  jumpIfRequested();
  shiftScreen(delta / 1000);

  if (TROLL)
    requestTroll();

  if (BOT)
    bot.act();

  refreshScore();

  then = now;

  // Request to do this again ASAP
  if (!bird.isCrashed())
      requestAnimationFrame(loop);
  else
      endGame();
    
};


function endGame() {
  bird.crash();

  if (BOT) {
    bot.save();
    if (RESET)
      setTimeout( reset, 300);
  }
  else
    bot.save();
}

function reset() {

  main();
  gameStarted = true;

}

function refreshScore() {
  document.getElementById("scoreNumber").innerHTML = score;
}

function requestTroll() {

  if (Math.random() < TROLL_CHANCE && !trollShown && gameStarted) {
    trollShown = true;
    setTimeout(function() { trollShown = false }, TROLL_DISPLAY_TIME);

  }

  if (trollShown) {
    if (trollReady)
      ctx.drawImage(troll, Math.round(Math.random() * (canvas.width - troll.width)), Math.round(Math.random() * (canvas.height - troll.height)));
  }
}
