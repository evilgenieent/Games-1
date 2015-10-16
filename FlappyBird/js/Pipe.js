var Pipe = function(x) {

  this.x = x;
  this.initialise();

};

Pipe.prototype = {

  initialise : function() {


    var randomY = Math.round(Math.random() * (-250));

    this.down = new SinglePipe(this.x, randomY, 0);
    this.up = new SinglePipe(this.x, randomY, 1);
  },

  shift : function(amount) {
    this.x -= amount;
    this.up.x -= amount;
    this.down.x -= amount;
  },

  birdCrashed : function() {
    if (myMath.overlap(bird, this.down) || myMath.overlap(bird, this.up))
      return true;
    else
      return false;
  },

};

var SinglePipe = function(x, y, type) {
  this.image = new Image();
  this.image.src = (type == 0) ? "images/pipeDown.png" : "images/pipeUp.png";
  this.width = this.image.width;
  this.height = this.image.height;
  this.x = x;
  this.y = (type == 0) ? y : y + this.height + EMPTY_SPACE;
};