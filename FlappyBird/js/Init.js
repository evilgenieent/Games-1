// CREATING THE CANVAS

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 441;
  document.body.appendChild(canvas);


// -------------------------------------------------------------- //
// GLOBAL VALUES

  // The speed of the background shift
  var SHIFT_SPEED = 100;

  // The starting point of shift
  var grassX = 0;

  // The set of pipes on the screen
  var pipeSet = new Set();

  // The bird
  var bird = new Bird();

  // The distance among pipes (difference in x)
  var PIPE_DISTANCE = 250;

  // The empty space between two pipes (difference in y)
  var EMPTY_SPACE = 250;

  // The gravity
  var GRAVITY = -10;

  // The jump speed
  var JUMP_SPEED = 180;