/*
 * This JavaScript file defines a Matrix object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Matrix objects, and never modify the operands.  This is a design choice.
 *
 * This module is designed for vectors of any number of dimensions.  The
 * implementations are generalized but not optimal for certain sizes of
 * vectors.  Specific Vector2D and Vector3D implementations can be much
 * more compact, while sacrificing generality.
 */
var Matrix = (function () {
    // Define the constructor.
    var matrix = function () {
        this.elements = [].slice.call(arguments);
    },
    
        // A private method for checking dimensions,
        // throwing an exception when different.
        checkDimensions = function (v1) {
            if (v1.dimensions() !== 16) {
                throw "Vectors have different dimensions";
            }
        };

    // Basic methods.
    matrix.prototype.dimensions = function () {
        return this.elements.length;
    };

    matrix.prototype.x = function () {
        return this.elements[0];
    };

    matrix.prototype.y = function () {
        return this.elements[1];
    };

    matrix.prototype.z = function () {
        return this.elements[2];
    };

    matrix.prototype.w = function () {
        return this.elements[3];
    };

    // Addition and subtraction.
    matrix.prototype.add = function (m) {
        var result = new Matrix(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, m);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] + m.elements[i];
        }

        return result;
    };

    matrix.prototype.subtract = function (m) {
        var result = new Matrix(),
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
    matrix.prototype.multiply = function (s) {
        var result = new Matrix(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] * s;
        }

        return result;
    };

    matrix.prototype.divide = function (s) {
        var result = new Matrix(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] / s;
        }

        return result;
    };

    // Dot product.
    matrix.prototype.dot = function (m) {
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
    matrix.prototype.cross = function (m) {
        // This method is for 3D vectors only.
        if (this.dimensions() !== 3 || m.dimensions() !== 3) {
            throw "Cross product is for 3D vectors only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Matrix(
            (this.y() * m.z()) - (this.z() * m.y()),
            (this.z() * m.x()) - (this.x() * m.z()),
            (this.x() * m.y()) - (this.y() * m.x())
        );
    };

    // Magnitude and unit matrix.
    matrix.prototype.magnitude = function () {
        // Make use of the dot product.
        return Math.sqrt(this.dot(this));
    };

    matrix.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

    // Projection.
    matrix.prototype.projection = function (m) {
        var unitv;

        // Dimensionality check.
        checkDimensions(this, m);

        // Plug and chug :)
        // The projection of u onto m is u dot the unit matrix of m
        // times the unit matrix of m.
        unitv = m.unit();
        return unitv.multiply(this.dot(unitv));
    };

    return matrix;
})();
