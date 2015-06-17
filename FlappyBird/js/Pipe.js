var Pipe = function(x) {


  // Coordinates
  this.x = x;
  this.downY = Math.round(Math.random() * (-250));
  this.upY = this.downY + 400;


  // Images (pipe img: 40x300)
  this.upImage = new Image();
  this.upImage.src = "images/pipeUp.png";

  this.downImage = new Image();
  this.downImage.src = "images/pipeDown.png";
};

Pipe.prototype.shift = function(amount)
{
  this.x -= amount;
}