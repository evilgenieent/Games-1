// The bunch of functions on pipeSet
var MyMath = function() {

}
MyMath.prototype = {


    overlap : function(object1, object2) {

        return ((object1.x < object2.x) ? this.overlapHorizontally(object1, object2)
                                        : this.overlapHorizontally(object2, object1))
           &&  ((object1.y < object2.y) ? this.overlapVertically(object1, object2)
                                        : this.overlapVertically(object2, object1));
    },

    overlapVertically : function(first, second) {
        return second.y < first.y + first.height - MISS_ALLOWED;
    },

    overlapHorizontally : function(first, second) {
        return second.x < first.x + first.width - MISS_ALLOWED;
    },

}