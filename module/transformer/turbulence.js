define(function() {

    var noDistort = {getValue: function(x, y, z) {
        return 0;
    }};

    var Turbulence = function(options) {

        this.xDistortModule = options.xDistortModule || noDistort;
        this.yDistortModule = options.yDistortModule || noDistort;
        this.zDistortModule = options.zDistortModule || noDistort;
        this.sourceModule   = options.sourceModule   || null;
        this.power          = options.power          || Turbulence.DEFAULT_TURBULENCE_POWER;

    };

    Turbulence.DEFAULT_TURBULENCE_POWER     = 1.0;

    Turbulence.prototype = {

        getValue: function(x, y, z) {

            if(!this.sourceModule) {

                throw new Error('Invalid or missing source module!');

            }

            x = parseFloat(x);
            y = parseFloat(y);
            z = parseFloat(z);

            // Get the values from the three Perlin noise modules and
            // add each value to each coordinate of the input value.  There are also
            // some offsets added to the coordinates of the input values.  This prevents
            // the distortion modules from returning zero if the (x, y, z) coordinates,
            // when multiplied by the frequency, are near an integer boundary.  This is
            // due to a property of gradient coherent noise, which returns zero at
            // integer boundaries.
            var x0 = parseFloat(x + (12414.0 / 65536.0));
            var y0 = parseFloat(y + (65124.0 / 65536.0));
            var x1 = parseFloat(x + (26519.0 / 65536.0));
            var y1 = parseFloat(y + (18128.0 / 65536.0));

            if (z || z === 0) {
                var z0 = parseFloat(z + (31337.0 / 65536.0));
                var z1 = parseFloat(z + (60493.0 / 65536.0));
                var x2 = parseFloat(x + (53820.0 / 65536.0));
                var y2 = parseFloat(y + (11213.0 / 65536.0));
                var z2 = parseFloat(z + (44845.0 / 65536.0));

                // Retrieve the output value at the offsetted input value instead of the original input value.
                return this.sourceModule.getValue(
                    parseFloat(x + (this.xDistortModule.getValue(x0, y0, z0) * this.power)),
                    parseFloat(y + (this.yDistortModule.getValue(x1, y1, z1) * this.power)),
                    parseFloat(z + (this.zDistortModule.getValue(x2, y2, z2) * this.power))
                );
            } else {
                return this.sourceModule.getValue(
                    parseFloat(x + (this.xDistortModule.getValue(x0, y0) * this.power)),
                    parseFloat(y + (this.yDistortModule.getValue(x1, y1) * this.power))
                );
            }



        }

    };

    return Turbulence;

});
