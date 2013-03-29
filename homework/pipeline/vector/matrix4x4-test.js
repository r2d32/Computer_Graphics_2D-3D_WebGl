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
    
    test("WebGL Conversion", function () {
        var m = new Matrix4x4( 1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);


        equal(m.conversion(),"1000010002100001" , "Matrix4x4 conversion ");
      
    });  
  
    test("WebGL Conversion", function () {
        var m = new Matrix4x4( 1, 0, 0, 0,
                               0, 1, 2, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        var m2 = new Matrix4x4();


        equal(m2.multiply(m), m.elements, "Matrix4x4 size");
      
    });
        
        
    
    
/*
        equal(m.elements[0], 5, "First element by index");
        equal(m.elements[1], 6, "Second element by index");
        equal(m.elements[2], 3, "Third element by index");
        equal(m.x(), 5, "First element by coordinate");
        equal(m.y(), 6, "Second element by coordinate");
        equal(m.z(), 3, "Third element by coordinate");

        m = new Matrix4x4(300, 200);

        equal(m.dimensions(), 2, "Matrix4x4 size");
        equal(m.elements[0], 300, "First element by index");
        equal(m.elements[1], 200, "Second element by index");
        equal(m.x(), 300, "First element by coordinate");
        equal(m.y(), 200, "Second element by coordinate");

        m = new Matrix4x4(3, 2, 1, 2);

        equal(m.dimensions(), 4, "Matrix4x4 size");
        equal(m.elements[0], 3, "First element by index");
        equal(m.elements[1], 2, "Second element by index");
        equal(m.elements[2], 1, "Third element by index");
        equal(m.elements[3], 2, "Fourth element by index");
        equal(m.x(), 3, "First element by coordinate");
        equal(m.y(), 2, "Second element by coordinate");
        equal(m.z(), 1, "Third element by coordinate");
        equal(m.w(), 2, "Fourth element by coordinate");

        m = new Matrix4x4();
        equal(m.dimensions(), 0, "Empty matrix4x4 (boundary case)");
    });

    test("Addition and Subtraction", function () {
        var v1 = new Matrix4x4(4, 5),
            v2 = new Matrix4x4(-10, 4),
            vresult = v1.add(v2);

        equal(vresult.dimensions(), 2, "Matrix4x4 sum size check");
        equal(vresult.x(), -6, "Matrix4x4 sum first element");
        equal(vresult.y(), 9, "Matrix4x4 sum second element");

        v1 = new Matrix4x4(0, -2, 3, 5);
        v2 = new Matrix4x4(-2, 1, 0, 7);
        vresult = v1.subtract(v2);
        equal(vresult.dimensions(), 4, "Matrix4x4 difference size check");
        equal(vresult.x(), 2, "Matrix4x4 difference first element");
        equal(vresult.y(), -3, "Matrix4x4 difference second element");
        equal(vresult.z(), 3, "Matrix4x4 difference third element");
        equal(vresult.w(), -2, "Matrix4x4 difference fourth element");

        // Check for errors.
        v1 = new Matrix4x4(5, 8, 10, 2);
        v2 = new Matrix4x4(1, 2, 2);

        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        raises(
            function () {
                return v1.add(v2);
            },
            "Check for vectors of different sizes"
        );
    });

    test("Scalar Multiplication and Division", function () {
        var m = new Matrix4x4(8, 2, 3),
            vresult = m.multiply(2);

        equal(vresult.x(), 16, "Matrix4x4 scalar multiplication first element");
        equal(vresult.y(), 4, "Matrix4x4 scalar multiplication second element");
        equal(vresult.z(), 6, "Matrix4x4 scalar multiplication third element");

        vresult = vresult.divide(4);

        equal(vresult.x(), 4, "Matrix4x4 scalar division first element");
        equal(vresult.y(), 1, "Matrix4x4 scalar division second element");
        equal(vresult.z(), 1.5, "Matrix4x4 scalar division third element");
    });

    test("Dot Product", function () {
        var v1 = new Matrix4x4(-5, -2),
            v2 = new Matrix4x4(-3, 4);

        equal(v1.dot(v2), 7, "2D dot product");

        // Try for a perpendicular.
        v1 = new Matrix4x4(Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        v2 = new Matrix4x4(-Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        equal(v1.dot(v2), 0, "Perpendicular 2D dot product");

        // Try 3D.
        v1 = new Matrix4x4(3, 2, 5);
        v2 = new Matrix4x4(4, -1, 3);
        equal(v1.dot(v2), 25, "3D dot product");

        // Check for errors.
        v1 = new Matrix4x4(4, 2);
        v2 = new Matrix4x4(3, 9, 1);

        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        raises(
            function () {
                return v1.dot(v2);
            },
            "Check for vectors of different sizes"
        );
    });

    test("Cross Product", function () {
        var v1 = new Matrix4x4(3, 4),
            v2 = new Matrix4x4(1, 2),
            vresult;

        // The cross product is restricted to 3D, so we start
        // with an error check.
        raises(
            function () {
                return v1.cross(v2);
            },
            "Check for non-3D vectors"
        );

        // Yeah, this is a bit of a trivial case.  But it at least
        // establishes the right-handedness of a cross-product.
        v1 = new Matrix4x4(1, 0, 0);
        v2 = new Matrix4x4(0, 1, 0);
        vresult = v1.cross(v2);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), 1, "Cross product third element");

        // This one shows that switching matrix4x4 order produces
        // the opposite-pointing normal.
        vresult = v2.cross(v1);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), -1, "Cross product third element");
    });

    test("Magnitude and Unit Vectors", function () {
        var m = new Matrix4x4(3, 4);

        // The classic example.
        equal(m.magnitude(), 5, "2D magnitude check");

        // Kind of a cheat, but still tests the third dimension.
        m = new Matrix4x4(5, 0, 12);
        equal(m.magnitude(), 13, "3D magnitude check");

        // Now for unit vectors.
        m = (new Matrix4x4(3, 4)).unit();

        equal(m.magnitude(), 1, "2D unit matrix4x4 check");
        equal(m.x(), 3 / 5, "2D unit matrix4x4 first element");
        equal(m.y(), 4 / 5, "2D unit matrix4x4 second element");

        m = (new Matrix4x4(0, -7, 24)).unit();

        equal(m.magnitude(), 1, "3D unit matrix4x4 check");
        equal(m.x(), 0, "3D unit matrix4x4 first element");
        equal(m.y(), -7 / 25, "3D unit matrix4x4 second element");
        equal(m.z(), 24 / 25, "3D unit matrix4x4 third element");
    });

    test("Projection", function () {
        var m = new Matrix4x4(3, 3, 0),
            vresult = m.projection(new Matrix4x4(5, 0, 0));

        equal(vresult.magnitude(), 3, "3D matrix4x4 projection magnitude check");
        equal(vresult.x(), 3, "3D matrix4x4 projection first element");
        equal(vresult.y(), 0, "3D matrix4x4 projection second element");
        equal(vresult.z(), 0, "3D matrix4x4 projection third element");

        // Error check: projection only applies to vectors with the same
        // number of dimensions.
        raises(
            function () {
                (new Matrix4x4(5, 2)).projection(new Matrix4x4(9, 8, 1));
            },
            "Ensure that projection applies only to vectors with the same number of dimensions"
        );
    });*/

});
