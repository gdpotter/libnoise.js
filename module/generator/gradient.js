define(function() {

    var Gradient = function(options) {
        this.y1 = options.y1;
        this.y2 = options.y2;
    };

    Gradient.prototype.getValue = function(x, y) {
        return y > 0 ? 1 : 0;
        // I'll get this to work someday
        // var val = 1/(this.y1 - this.y2) * (y - this.y1);
        // if (val <= 0) {
        //     return 0;
        // } else if (val >= 1) {
        //     return 1;
        // } else {
        //     return val;
        // }
    };

    return Gradient;
});
