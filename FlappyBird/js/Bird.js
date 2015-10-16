var Bird = function() {

  this.ready = false;
  this.initialise();
  
};

Bird.prototype = {

  initialise : function() {

    // Coordinates
    this.x = 20;
    this.y = 200;

    // The velocity of y movement
    this.velocity = 0;

    // The image
    this.image = new Image();
    this.image.src = "images/bird.png";

    var that = this;
    this.image.onload = function () {
      that.ready = true;
    };

  },

  shift : function(delta) {
    this.velocity += GRAVITY * SPEED;
    this.y -= delta * this.velocity;
  },


  jump : function() {
    this.velocity = JUMP_SPEED;
    bot.record();
  },


  display : function() {
    ctx.drawImage(this.image, this.x, this.y);
    this.width = this.image.width;
    this.height = this.image.height;
  },

  isCrashed : function() {
    // Crashed to wall
    if (this.y <= -MISS_ALLOWED || this.y + this.height >= canvas.height + MISS_ALLOWED)
      return true;


    return Pipes.birdCrashed();

  },


  crash : function() {
    this.image.src = 'images/crash.png';
    ctx.drawImage(this.image, bird.x, bird.y);
    
    // Rage
    if(FUU_FACE){
      fuu = new Image();
      fuu.src = "images/fuu.png";
      fuu.onload = function () {
        ctx.drawImage(fuu, canvas.width - fuu.width - 50, canvas.height - fuu.height);
      };
    }
    
    if(SOUND_ENABLED)
    {
      var audio = new Audio('audio/crash.wav');
      audio.play();
    }
  }


}
