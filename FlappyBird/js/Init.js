// CREATING THE CANVAS

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 660;
  canvas.height = 440;


// -------------------------------------------------------------- //
// GLOBAL VALUES

  var SPEED = 1.5;

  var RESET = true;

  var START_TIME = Date.now();

  // The speed of the background shift
  var SHIFT_SPEED = 120;

  // The set of pipes on the screen
  var pipeSet;

  // The bird
  var bird;

  // The bird has reached the first pipe or not
  var firstPipeDeleted = false;

  // The indexes of the feateures in the data array where the bird perormed last jumps
  var jumpsPerformed;

  // The distance among pipes (difference in x)
  var PIPE_DISTANCE = 200;

  // The minimum starting y point of a pipe
  var PIPE_Y_MINIMUM = -240;

  // The empty space between two pipes (difference in y)
  var EMPTY_SPACE = 110;

  // The gravity
  var GRAVITY = -10;

  // The jump speed
  var JUMP_SPEED = 180;

  // Amount of pixels allowed to miss
  var MISS_ALLOWED = 5;
  
  // Sound controls
  var SOUND_ENABLED = false;
  
  // Fuu Face
  var FUU_FACE = false;
  
  // HEAT_MAP
  var SHOW_HEATMAP = false;
  
  // How much the program needs to wait after a jump in order to save it as a good one
  // As SPEED is raised, this value is reduced by the program.
  var SAVE_POSTPONE = 300; // ms

  // Troll mode
  var TROLL = false;
  var TROLL_CHANCE = 0.01;
  var TROLL_DISPLAY_TIME = 500; // ms



  // ==================================================================
  // BOT

  var BOT = true;

  var VERTICAL_DISTANCE_RANGE = [-Math.floor(canvas.height / 2), Math.floor(canvas.height / 2)];
  var VERTICAL_DISTANCE_ACCURACY = 5;







