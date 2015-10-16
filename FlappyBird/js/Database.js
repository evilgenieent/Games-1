var Database = function() {
    this.data = [];
    this.initialise();
};


Database.prototype = {


    /**
     * Reads in the data
     */
    initialise : function(callback) {
        var that = this;
        if (callback === undefined) {
          callback = function(success){
          }; //Default callback
        }
        this.createTable(function(success){ //Callback after table create is finished
          if(!success){return;} //Don't download if table create fails
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {

              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  var content = xmlhttp.responseText;
                  
                  var records = JSON.parse(content);
                  records.forEach(function(record) {
                      that.data.push(new JumpData(record));
                  });
                  
                  console.log((Date.now() - START_TIME) / 1000 +
                    "s --> Data downloaded successfully.");
                  callback(true);
                  
              } 

              if (xmlhttp.status == 500) {
                  console.log("Error occured while downloading data.");
                  callback(false);
              }

          }
          xmlhttp.open("GET", url + "request.php?a=get", true);
          xmlhttp.send();
        });
    },


    getAttributes : function() {
        return "&vDistance_step="  + VERTICAL_DISTANCE_ACCURACY + 
               "&vDistance_min="  + VERTICAL_DISTANCE_RANGE[0] +
               "&vDistance_max="  + VERTICAL_DISTANCE_RANGE[1];
    },


    save : function(callback) {


        if (callback === undefined) {
          callback = function(success){}; //Default callback
        }
        
        var jsondata = [];
        this.data.forEach(function(record){
          jsondata.push(record.toArray());
        });
        var jsondata = JSON.stringify(jsondata);
        
        $.ajax({
         data: {'data':jsondata},
         type: "post",
         url: url+"request.php?a=save",
         success: function(data){
              console.log("Data Saved." + data);
              callback(true);
         }
        });

    },


    // Creates the database if it does not exist
    createTable : function(callback) {
        if (callback === undefined) {
          callback = function(success){}; //Default callback
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var content = xmlhttp.responseText;
                    if (content == ""){
                        console.log((Date.now() - START_TIME) / 1000 + "s --> Table created.");
                        callback(true);
                    }else{
                        console.log("Error when table created. \n" + content);
                        callback(false);
                    }
                        
            }

        }

        xmlhttp.open("GET", url+"request.php?a=create" + this.getAttributes(), true);
        xmlhttp.send();

    },
    
    displayHeatMap : function(pipe1){
      for(var i = BIRDY_RANGE[0]; i <= BIRDY_RANGE[1]; i += BIRDY_ACCURACY)
      {
          var feature = this.data[bot.getIndex(i, pipe1.down.y, pipe2.down.y, j)];
          if(typeof feature == 'undefined'){return;}
          
          var confidence = feature.noOfGoodJumps / feature.noOfJumps;
          var threshhold = /*(1 - Math.pow(0.88, feature.noOfJumps))*/ 0.9;
          var color = confidence - threshhold;
          if(color < 0) color = 0;
          
          var hexColor = Math.floor(255*(1-color)).toString(16);
          //console.log(color + " " + hexColor);
          var padfunc = function(width, string, padding) { 
                          return (width <= string.length) ? string : padfunc(width, padding + string, padding);
                        };
          var h = padfunc(2, hexColor, '0');
          ctx.fillStyle="#" + h + h + h;
          ctx.fillRect((pipe1.x-canvas.width)+j,i,DISTANCE_ACCURACY,BIRDY_ACCURACY);
      }
      
    },


    clear : function() {
      this.data = [];
    }




}
