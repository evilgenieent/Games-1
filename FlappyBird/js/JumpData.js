var JumpData = function(data) {

    this.id = Number(data[0]) - 1;
    this.vDistance = Number(data[1]);
    this.noOfJumps = Number(data[2]);
    this.noOfGoodJumps = Number(data[3]);
    
};

JumpData.prototype = {
  toArray : function(){
    return [
      this.vDistance,
      this.noOfJumps,
      this.noOfGoodJumps
    ];
  }
};
