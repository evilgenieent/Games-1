var Bot = function() {
  //this.data = database.get();
}
Bot.prototype = {
  
  record : function(){

    var that = this;
    var pipe1 = Pipes.getPipeAfter(1);

    if(pipe1 != null) {

      var feature = this.getPositionFeature(bird.y);

      if (database.data[feature.id].noOfJumps < 255) {
        database.data[feature.id].noOfJumps++;
        database.data[feature.id].noOfGoodJumps++;
      }

    }
  },


  save : function(callback) {

    var feature = this.getPositionFeature();

    if (Pipes.getPipeAfter(1).up.y > bird.y + bird.height)
      for (var birdY = Math.floor(bird.y);  birdY < Pipes.getEmptyCenterY(); birdY++) {
        if (this.getPositionFeature(birdY).noOfGoodJumps > 1)
          this.getPositionFeature(birdY).noOfGoodJumps--;
      }

    database.save(callback);

  },
  

  act : function() {

    if(Pipes.getPipeAfter(1) != null) {

      var feature = this.getPositionFeature(bird.y);

      // HERE IS THE DECISION MAKING
      if (feature.noOfGoodJumps / feature.noOfJumps > /*(1 - Math.pow(0.88, feature.noOfJumps))*/ 0.9){
        this.record();
        bird.jump();
      }

    }

    
      
  },

  getPositionFeature : function(birdY) {

      // NEED TO BE FIXED!!!!!!

      return database.data[(this.getIndex(birdY) > 43 ? 43 : this.getIndex(birdY))];
  },


  getIndex : function(b) {

    var offset = (Math.abs(VERTICAL_DISTANCE_RANGE[0]) - VERTICAL_DISTANCE_RANGE[0]) / 2;
    return Math.floor(((Pipes.getEmptyCenterY()  - b) + offset) / VERTICAL_DISTANCE_ACCURACY);

  }
  
  
}
