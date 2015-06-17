// The bunch of functions on pipeSet
var Pipes = 
{

  // Add a new pipe on the right. Arg --
  addPipe : function(pipe) {
    pipeSet.add(new Pipe(pipe.x + PIPE_DISTANCE));
  },

  // Remove those pipes from the set that are not on the screen anymore
  removeUnusedPipe : function (pipe) {
    pipeSet.delete(pipe);
  },

  getGreatestPipe : function() {
    // Finding the maximum x coordinate
    max = new Pipe(0);
    pipeSet.forEach(function(pipe){
      if (max.x < pipe.x)
        max = pipe;  
    });

    return max;
  },

  getLowestPipe : function() {
    // Finding the maximum x coordinate
    min = new Pipe(800);
    pipeSet.forEach(function(pipe){
      if (min.x > pipe.x)
        min = pipe;
    });

    return min;
  },

  refreshTheSet : function () {

    if (pipeSet.size == 0 && gameStarted)
      this.addPipe(new Pipe(600));

    max = this.getGreatestPipe();
    if (max.x < canvas.width && gameStarted)
      this.addPipe(max);

    min = this.getLowestPipe();
    if (min.x + 40 /*pipewidth*/ < 0)
    {
      this.removeUnusedPipe(min);
    }



  },

  // Showing pipes on the screen
  display : function () {
    this.refreshTheSet();

    pipeSet.forEach(function(pipe) {
      ctx.drawImage(pipe.downImage, pipe.x, pipe.downY);
      ctx.drawImage(pipe.upImage, pipe.x, pipe.upY);
    });

  },

  // Shifting 
  shift: function(amount) {
    pipeSet.forEach(function(pipe) { 
      pipe.shift(amount);
    });
  }
}