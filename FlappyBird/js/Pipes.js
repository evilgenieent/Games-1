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
    firstPipeDeleted = true;
    score++;
  },

  getEmptyCenterY : function() {
    return Pipes.getPipeAfter(1).up.y - EMPTY_SPACE / 2;
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
    min = new Pipe(canvas.width);
    pipeSet.forEach(function(pipe){
      if (min.x > pipe.x)
        min = pipe;
    });

    return min;
  },
  
  getPipeAfter : function(n) {

    var array = Array.from(pipeSet);

    var found = null;
    var count = 0;
    array.forEach(function(pipe){
      if(found == null && pipe.x + (pipe.down.width / 2) > bird.x){
        count++;
        if(count == n){
          found = pipe;
       }
      }
    });
    return found;
  },

  refreshTheSet : function () {

    if (pipeSet.size == 0 && gameStarted) {
      this.addPipe(new Pipe(canvas.width - 200));
      document.getElementById("pressSpace").innerHTML = "";
    }

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
    var that = this;
    pipeSet.forEach(function(pipe) {
      if(SHOW_HEATMAP)
      {
        if(pipe == that.getPipeAfter(1))
        {
          var pipe2 = that.getPipeAfter(2);
          if(pipe2 != null)
          {
            database.displayHeatMap(pipe, pipe2);
          }
        }
      }
      ctx.drawImage(pipe.down.image, pipe.down.x, pipe.down.y);
      ctx.drawImage(pipe.up.image, pipe.up.x, pipe.up.y);
    });

  },

  // Shifting 
  shift: function(amount) {
    pipeSet.forEach(function(pipe) { 
      pipe.shift(amount);
    });
  },


  // Checks if a point on the screen is occupied by a pipe
  birdCrashed : function() {
    var crashed = false;
    pipeSet.forEach(function(pipe) {
      if (pipe.birdCrashed())
        crashed = true;
    });

    return crashed;
  }

}
