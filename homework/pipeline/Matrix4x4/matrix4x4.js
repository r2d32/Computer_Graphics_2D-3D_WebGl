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
                console.log('('+row[i] +',' + column[i]+')');
            }
            console.log('product'+ product);
            c.elements[i] = product;
            product = 0;
            
        }
        return c;
    };

    // Basic methods.
    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };

    // JD: I'm not clear on what this is supposed to do, especially
    //     in light of what your unit test produces.  A little
    //     header comment will help.
    matrix4x4.prototype.conversion = function (){
        var changed = [],
            i,
            e,
            rows = 4; 
        for (i = 0; i < rows; i += 1) {
            for (e = 0; e < rows; e += 1) {
                changed+= [ this.elements[ e * rows + i ]];
            console.log('here'+ changed);
            }
            
        }
        this.elements = changed;
        return this.elements;
    };

    // JD: Careful here---the way you implement these matrices
    //     implies to me that you might not fully understand how
    //     to use them.  Remember that the transformations
    //     themselves are formed in well-defined ways: they
    //     are not based on some pre-existing matrix.  This is
    //     why, in class, I implement those in a manner that is
    //     similar to a static method in Java.
    //
    //     These standalone matrices are then *multiplied* to
    //     other matrices or to a vertex in order to "execute"
    //     the transformation.  This is the other alternative
    //     for these transforms: form the standalone matrix then
    //     multiply it with a pre-existing one.
    //
    //     The issue with your implementations is that they do
    //     neither.  Instead, they do some direct assignments to
    //     the elements of a pre-existing matrix.  These are thus
    //     not the "standalone" version, nor are they the correct
    //     way to perform multiplication.  I strongly suggest that
    //     you pay close attention to upcoming classes in order to
    //     ensure that you are understanding this correctly.
    //
    //     Note, for example, the difference between ortho up top,
    //     and the implementations you have below.  ortho does the
    //     "standalone matrix" approach correctly.

    //Scaling matrix method
    matrix4x4.prototype.scale = function (sx,sy,sz){
                    
        this.elements[0] = this.elements[0]*sx;
        this.elements[5] = this.elements[5]*sy;
        this.elements[10] = this.elements[10]*sz;

        return this.elements;
    };

    matrix4x4.prototype.translate = function (dx,dy,dz){
                    
        this.elements[3] = dx;
        this.elements[7] = dy;
        this.elements[11] = dz;

        return this.elements;
    };

    // JD: Note, this is not general rotation, but rotation about
    //     the z-axis.  The rotation matrix in the sample code is
    //     much more general.
    matrix4x4.prototype.rotate = function (angle){
                    
        this.elements[0] = Math.cos(angle);
        this.elements[1] = -Math.sin(angle);
        this.elements[4] = Math.sin(angle);
        this.elements[5] = Math.cos(angle);

        return this.elements;
    };

    matrix4x4.prototype.frustum = function(l,r,b,t,n,f){

        this.elements[0]  = 2 * n / (r - l);
        this.elements[2]  = (r + l) / (r - l);
        this.elements[5]  = 2 * n / (t - b);
        this.elements[6]  = (t + b) / (t - b);
        this.elements[10] = -(f + n) / (f - n);
        this.elements[11] = -(2 * f * n) / (f - n);
        this.elements[14] = -1;
        this.elements[15] = 0;

        return this.elements;
    }

    return matrix4x4;
})();
