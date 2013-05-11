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
        this.elements = [].slice.call(arguments);

        if( this.elements.length == 0 ){
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
            throw "Matrix should be 4x4";
        }
    };
    
    matrix4x4.prototype.ortho = function(l, r, b, t, n, f){
        var width = r - l,
            height = t - b,
            depth = f - n;

        return new Matrix4x4 (
            2.0/width,   0.0,          0.0,        -(r + l)/width,
            0.0,         2.0/height,   0.0,        -(t+b)/height,
            0.0,         0.0,         -2.0/depth,  -(f+n)/depth,
            0.0,         0.0,          0.0,         1.0);
    };

    matrix4x4.prototype.multiply = function (b) {
        var c = new Matrix4x4();
        var column = [ 0, 1, 2, 3,
                       0, 1, 2, 3,      
                       0, 1, 2, 3,
                       0, 1, 2, 3  ],

            row = [ 0, 0, 0, 0,
                    1, 1, 1, 1,
                    2, 2, 2, 2,
                    3, 3, 3, 3 ],
            product = 0,
            e,
            i;

        for(i = 0; i < 16; i += 1){

            for(e = 0; e < 4; e +=1){
                product += b.elements[ (e * 4 + column[i]) ] * this.elements[ (row[i] * 4 + e) ];
            }
            c.elements[i] = product;
            product = 0;
            
        }
        return c;
    };

    // Basic methods.
    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };


    // Preparation of matrix for consumption by WebGL and GLSL
    matrix4x4.prototype.conversion = function (){
        var changed = [],
            i,
            e,
            changedIndex = 0,
            rows = 4; 

        for (i = 0; i < rows; i += 1) {
            for (e = 0; e < rows; e += 1) {
                changed[changedIndex]= this.elements[ e * rows + i ];
                changedIndex+=1;
            }
            
        }
        this.elements = changed;
        return this.elements;
    };

    //  Scaling matrix method
    matrix4x4.prototype.scale = function (sx,sy,sz){
        var scalator = new Matrix4x4(sx, 0, 0, 0,
                                      0,sy, 0, 0,
                                      0, 0, sz,0,
                                      0, 0, 0, 1);
        
        return scalator.multiply(this);
    };

    // Traslating matrix method
    matrix4x4.prototype.translate = function (dx,dy,dz){
        var translated = new Matrix4x4(1, 0, 0, dx,
                                       0, 1, 0, dy,
                                       0, 0, 1, dz,
                                       0, 0, 0, 1);

        return translated.multiply(this);
    };


    // Matrix rotation
    // JD: Finally, in this function, you are not touching the receiving
    //     matrix at all.  You are just returning the "pure" rotation
    //     matrix.
    matrix4x4.prototype.rotate = function (angle, x, y, z){
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,
                x2,
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        var multiplier = new Matrix4x4(
            (x2 * oneMinusC) + c ,  (xy * oneMinusC) - zs,  (xz * oneMinusC) + ys, 0,
            (xy * oneMinusC) + zs,  (y2 * oneMinusC) + c ,  (yz * oneMinusC) - xs, 0,
            (xz * oneMinusC) - ys,  (yz * oneMinusC) + xs,  (z2 * oneMinusC) + c , 0,
                                0,                      0,                      0, 1);

        return multiplier.multiply(this);
    };
    
    // Matrix frustum perspective
    matrix4x4.prototype.frustum = function(l,r,b,t,n,f){
        var fm = new Matrix4x4(
            2 * n / (r - l),               0,  (r + l) / (r - l),                      0, 
                          0, 2 * n / (t - b),  (t + b) / (t - b),                      0,
                          0,               0, -(f + n) / (f - n), -(2 * f * n) / (f - n),
                          0,               0,                 -1,                      0);
    
        return fm;
    }

    return matrix4x4;
})();