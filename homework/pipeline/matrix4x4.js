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
            throw "Matri should be 4x4";
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

    // JD: Part of the problem is that you are doing different things in
    //     each of these transform functions.  Be consistent.  I will
    //     spell out what you are doing in each function.  Pick one
    //     approach (except for translate) and stick with it.
    //
    //     There is no absolute right or wrong design---what matters is
    //     that you pick one and use it consistently.

    //  Scaling matrix method
    // JD: In this function, you are creating the "pure" scale matrix
    //     and then are multiplying it to the receiver.  You are thus
    //     scaling the prior transform.
    matrix4x4.prototype.scale = function (sx,sy,sz){
        var scalator = new Matrix4x4(sx, 0, 0, 0,
                                      0,sy, 0, 0,
                                      0, 0, sz,0,
                                      0, 0, 0, 1);
        
        return scalator.multiply(this);
    };

    // Traslating matrix method
    // JD: This is the only function where you are doing something that
    //     is distinctly incorrect.  You are getting the incoming transform,
    //     then just *plugging* the translate delta (dx, dy, dz) directly
    //     into the 4th column of the matrix.  This is incorrect because
    //     the incoming transform might already have values in there---by
    //     doing a direct assignment, and not actually doing matrix
    //     multiplication, you would be wiping out those prior values.
    matrix4x4.prototype.translate = function (dx,dy,dz){
        var translated = new Matrix4x4();
        translated.elements[3] = dx;
        translated.elements[7] = dy;
        translated.elements[11] = dz;

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

        return new Matrix4x4(
            (x2 * oneMinusC) + c,   (xy * oneMinusC) - zs,  (xz * oneMinusC) + ys, 0,
            (xy * oneMinusC) + zs,   (y2 * oneMinusC) + c,  (yz * oneMinusC) - xs, 0,
            (xz * oneMinusC) - ys,  (yz * oneMinusC) + xs,   (z2 * oneMinusC) + c, 0,
                                0,                      0,                      0, 1).multiply(this);
    };
    
    // Matrix frustum perspective
    matrix4x4.prototype.frustum = function(l,r,b,t,n,f){
        var fm = new Matrix4x4();
        fm.elements = this.elements;
        fm.elements[0]  = 2 * n / (r - l);
        fm.elements[2]  = (r + l) / (r - l);
        fm.elements[5]  = 2 * n / (t - b);
        fm.elements[6]  = (t + b) / (t - b);
        fm.elements[10] = -(f + n) / (f - n);
        fm.elements[11] = -(2 * f * n) / (f - n);
        fm.elements[14] = -1;
        fm.elements[15] = 0;

        return fm;
    }

    return matrix4x4;
})();