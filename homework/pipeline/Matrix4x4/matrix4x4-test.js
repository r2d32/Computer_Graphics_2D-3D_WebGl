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
    
    test("MAtrix to WebGL Conversion", function () {
        var m = new Matrix4x4( 1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);


        equal(m.conversion(),"1000010002100001" , "Matrix4x4 conversion ");
      
    });  
  
    test("Matrix Multiplication ", function () {
        var m = new Matrix4x4( 1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        var m2 = new Matrix4x4();


        assert.deepEqual(m2.multiply(m), m, "Matrix4x4 size");
      
    });

    test("Matrix Scale ", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);

        assert.deepEqual(m5.scale(2,3,4),[2, 0, 0, 0,
                                          0, 3, 2, 0,
                                          0, 0, 4, 0,
                                          0, 0, 0, 1],'Matrix scale');
      
    });

    test("Matrix Translate", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);

        assert.deepEqual(m5.translate(2,3,4),[1, 0, 0, 2,
                                              0, 1, 2, 3,
                                              0, 0, 1, 4,
                                              0, 0, 0, 1],'Matrix translate');
      
    });

    test("Matrix Rotate", function () {
        var m5 = new Matrix4x4(1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);

        assert.deepEqual(m5.rotate(30),[ Math.cos(30), -Math.sin(30), 0, 0,
                                         Math.sin(30),  Math.cos(30), 2, 0,
                                         0,             0,            1, 0,
                                         0,             0,            0, 1],'Matrix rotate');
      
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

        var width = r - l,
            height = t - b,
            depth = f - n;

        assert.deepEqual(m5.ortho(l, r, b, t, n, f),new Matrix4x4(
            2.0/width,   0.0,          0.0,        -(r + l)/width,
            0.0,         2.0/height,   0.0,        -(t+b)/height,
            0.0,         0.0,         -2.0/depth,  -(f+n)/depth,
            0.0,         0.0,          0.0,         1.0),
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

        assert.deepEqual(m5.frustum(l,r,b,t,n,f),
                            [ (2 * n / (r - l)),                  0,   ((r + l) / (r - l)),                         0,
                                              0,  (2 * n / (t - b)),   ((t + b) / (t - b)),                         0,
                                              0,                  0, ( -(f + n) / (f - n)),  (-(2 * f * n) / (f - n)),
                                              0,                  0,                    -1,                        0],
                                                'Matrix Frustum');
      
    });


});
