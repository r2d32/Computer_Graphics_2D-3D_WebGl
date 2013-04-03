/*
 * Unit tests for our matrix4x4 object.
 */

$(function () {


    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m = new Matrix4x4( 1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        var m2 = new Matrix4x4();


        equal(m.dimensions(), 16, "Matrix4x4 size");
        equal(m2.dimensions(), 16, "Matrix4x4 size");

      
    });
    
    test("Matrix to WebGL Conversion", function () {
        var m = new Matrix4x4( 1, 0, 3, 0,
                               0, 1, 2, 5,
                               0, 9, 1, 0,
                               0, 0, 0, 1);

        assert.deepEqual(m.conversion(),[1, 0, 0, 0,
                                         0, 1, 9, 0,
                                         3, 2, 1, 0,
                                         0, 5, 0, 1], "Matrix4x4 conversion ");
      
    });  
  
    test("Matrix Multiplication ", function () {
        var m = new Matrix4x4( 1, 4, 6, 0,
                               0, 1, 2, 0,
                               9, 0, 1, 0,
                               0, 0, 0, 1);

        var m2 = new Matrix4x4(1, 4, 3, 3,
                               0, 5, 5, 0,
                               3, 0, 9, 0,
                               32 ,0, 4, 4);

        assert.deepEqual(m2.multiply(m), new Matrix4x4( 28,   8,  17, 3,
                                                        45,   5,  15, 0,
                                                        84,  12,  27, 0,
                                                        68, 128, 196, 4), "Matrix4x4 multiplication");
      
    });

    test("Matrix Scale ", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);

        // JD: This is incorrect (see my note in matrix4x4.js).  If the
        //     intent is to scale m5 by 2 on x, 3 on y, and 4 on z, the
        //     correct result is
        //
        //       2 0 0 0
        //       0 3 6 0
        //       0 0 4 0
        //       0 0 0 1
        //
        // why is m6 a 6 instead of an 8 ?
        //
        // JD 0402: When you apply a transform to a pre-existing transform,
        //          you are multiplying that transform on the left side:
        //
        //       2 0 0 0     1 0 0 0
        //       0 3 0 0  x  0 1 2 0
        //       0 0 4 0     0 0 1 0
        //       0 0 0 1     0 0 0 1
        //
        //     So, for 2nd row, 3rd column of the product, you get:
        //
        //                       0
        //       0 3 0 0  x      2
        //                       1
        //                       0
        //
        //     ...which is 0*0 + 3*2 + 0*1 + 0*0 = 6
        //
        assert.deepEqual(m5.scale(2,3,4),new Matrix4x4(2, 0, 0, 0,
                                                       0, 3, 8, 0,
                                                       0, 0, 4, 0,
                                                       0, 0, 0, 1),'Matrix scale');
      
    });

    test("Matrix Translate", function () {
        var m5 = new Matrix4x4(1, 4, 0, 0,
                               0, 1, 2, 0,
                               0, 1, 1, 0,
                               0, 0, 0, 1);

        assert.deepEqual(m5.translate(2,3,4),new Matrix4x4(1, 4, 0, 2,
                                                           0, 1, 2, 3,
                                                           0, 1, 1, 4,
                                                           0, 0, 0, 1),'Matrix translate');
      
    });

    test("Matrix Rotate", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 5, 2, 0,
                               0, 6, 1, 0,
                               0, 3, 0, 1);

        assert.deepEqual(m5.rotate(30),new Matrix4x4(0.15425144988758405,  0.9880316240928618, 0, 0,
                                                      -4.940158120464309,  0.7712572494379202, 2, 0,
                                                      -5.928189744557171,  0.9255086993255043, 1, 0,
                                                     -2.9640948722785856,  0.46275434966275214,0, 1),'Matrix rotate');
      
    });

    test("Matrix Ortho ", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);

        var r =1, 
            t =2,
            f =3,
            l =4,
            b =5,
            n =6;

        assert.deepEqual(m5.ortho(l, r, b, t, n, f),new Matrix4x4(
            -0.6666666666666666,                    0,                   0,  1.6666666666666667,
                              0,  -0.6666666666666666,                   0,  2.3333333333333335,
                              0,                    0,  0.6666666666666666,                   3,
                              0,                    0,                   0,                   1),
                'Matrix Ortho');
       
    });

    test("Matrix Frustum", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        var l = 1,
            r = 2,
            b = 3,
            t = 4,
            n = 5, 
            f = 6;

        assert.deepEqual(m5.frustum(l,r,b,t,n,f),new Matrix4x4(10, 0,  3,  0,
                                                                0,10,  7,  0,
                                                                0, 0,-11,-60,
                                                                0, 0, -1,  0),'Matrix Frustum');
    });


});
