/*
 * This JavaScript file defines a Matrix4x4 object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Matrix4x4 objects, and never modify the operands.  This is a design choice.
 *
 * This module is designed for vectors of any number of dimensions.  The
 * implementations are generalized but not optimal for certain sizes of
 * vectors.  Specific Vector2D and Vector3D implementations can be much
 * more compact, while sacrificing generality.
 */
var Matrix4x4 = (function () {
    // Define the constructor.
    var matrix4x4 = function () {
        if(!arguments){
            this.elements = [].slice.call(arguments);
        }else{
            this.elements = [ 1, 0, 0, 0,
                             0, 1, 0, 0,
                             0, 0, 1, 0,
                             0, 0, 0, 1];
        }
    },
    
        // A private method for checking dimensions,
        // throwing an exception when different.
        checkDimensions = function (m1) {
            if (m1.dimensions() !== 16) {
                throw "Matrices should be 4x4";
            }
        };

    // Basic methods.
    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };

    matrix4x4.prototype.x = function () {
        return this.elements[0];
    };

    matrix4x4.prototype.y = function () {
        return this.elements[1];
    };

    matrix4x4.prototype.z = function () {
        return this.elements[2];
    };

    matrix4x4.prototype.w = function () {
        return this.elements[3];
    };

    // Addition and subtraction.
    matrix4x4.prototype.add = function (m) {
        var result = new Matrix4x4(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] + m.elements[i];
        }

        return result;
    };

    matrix4x4.prototype.subtract = function (m) {
        var result = new Matrix4x4(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] - m.elements[i];
        }

        return result;
    };

    // Scalar multiplication and division.
    matrix4x4.prototype.multiply = function (s) {
        var result = new Matrix4x4(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] * s;
        }

        return result;
    };

    matrix4x4.prototype.divide = function (s) {
        var result = new Matrix4x4(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] / s;
        }

        return result;
    };

    // Dot product.
    matrix4x4.prototype.dot = function (m) {
        var result = 0,
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result += this.elements[i] * m.elements[i];
        }

        return result;
    };

    // Cross product.
    matrix4x4.prototype.cross = function (m) {
        // This method is for 3D vectors only.
        if (this.dimensions() !== 3 || m.dimensions() !== 3) {
            throw "Cross product is for 3D vectors only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Matrix4x4(
            (this.y() * m.z()) - (this.z() * m.y()),
            (this.z() * m.x()) - (this.x() * m.z()),
            (this.x() * m.y()) - (this.y() * m.x())
        );
    };

    // Magnitude and unit matrix4x4.
    matrix4x4.prototype.magnitude = function () {
        // Make use of the dot product.
        return Math.sqrt(this.dot(this));
    };

    matrix4x4.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

    // Projection.
    matrix4x4.prototype.projection = function (m) {
        var unitv;

        // Dimensionality check.
        checkDimensions(this, m);

        // Plug and chug :)
        // The projection of u onto m is u dot the unit matrix4x4 of m
        // times the unit matrix4x4 of m.
        unitv = m.unit();
        return unitv.multiply(this.dot(unitv));
    };

    return matrix4x4;
})();
