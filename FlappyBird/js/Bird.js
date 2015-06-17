// The game started
var gameStarted = false;

var Bird = function() {

  // Coordinates
  this.x = 20;
  this.y = 200;

  // The velocity of y movement
  this.velocity = 0;

  // The image
  this.image = new Image();
  this.image.src = "images/bird.png";
};
  
Bird.prototype.shift = function(delta)
{
  this.velocity += GRAVITY;
  this.y -= delta * this.velocity;
}

Bird.prototype.jump = function()
{
  this.velocity = JUMP_SPEED;
}

Bird.prototype.display = function()
{
  ctx.drawImage(this.image, this.x, this.y);
}