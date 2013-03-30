/*
 * Unit tests for our matrix object.
 */
$(function () {
    /*test("Creation and Data Access", function () {
        var m = [ 1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1 ];

        equal(m,creatematrix, "Matrix size");


         var m = new Matrix(1,0,0,0,
                           0,1,0,0,
                           0,0,1,0,
                           0,0,0,1);

        equal(m.dimensions(), 8, "Matrix size");
*/

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m = new Matrix(1,0,0,0,
                           0,1,0,0,
                           0,0,1,0,
                           0,0,0,1);

        equal(m.dimensions(), 16, "Matrix size");
    });/*
        equal(m.elements[0], 5, "First element by index");
        equal(m.elements[1], 6, "Second element by index");
        equal(m.elements[2], 3, "Third element by index");
        equal(m.x(), 5, "First element by coordinate");
        equal(m.y(), 6, "Second element by coordinate");
        equal(m.z(), 3, "Third element by coordinate");

        m = new Matrix(300, 200);

        equal(m.dimensions(), 2, "Matrix size");
        equal(m.elements[0], 300, "First element by index");
        equal(m.elements[1], 200, "Second element by index");
        equal(m.x(), 300, "First element by coordinate");
        equal(m.y(), 200, "Second element by coordinate");

        m = new Matrix(3, 2, 1, 2);

        equal(m.dimensions(), 4, "Matrix size");
        equal(m.elements[0], 3, "First element by index");
        equal(m.elements[1], 2, "Second element by index");
        equal(m.elements[2], 1, "Third element by index");
        equal(m.elements[3], 2, "Fourth element by index");
        equal(m.x(), 3, "First element by coordinate");
        equal(m.y(), 2, "Second element by coordinate");
        equal(m.z(), 1, "Third element by coordinate");
        equal(m.w(), 2, "Fourth element by coordinate");

        m = new Matrix();
        equal(m.dimensions(), 0, "Empty matrix (boundary case)");
    });

    test("Addition and Subtraction", function () {
        var v1 = new Matrix(4, 5),
            v2 = new Matrix(-10, 4),
            vresult = v1.add(v2);

        equal(vresult.dimensions(), 2, "Matrix sum size check");
        equal(vresult.x(), -6, "Matrix sum first element");
        equal(vresult.y(), 9, "Matrix sum second element");

        v1 = new Matrix(0, -2, 3, 5);
        v2 = new Matrix(-2, 1, 0, 7);
        vresult = v1.subtract(v2);
        equal(vresult.dimensions(), 4, "Matrix difference size check");
        equal(vresult.x(), 2, "Matrix difference first element");
        equal(vresult.y(), -3, "Matrix difference second element");
        equal(vresult.z(), 3, "Matrix difference third element");
        equal(vresult.w(), -2, "Matrix difference fourth element");

        // Check for errors.
        v1 = new Matrix(5, 8, 10, 2);
        v2 = new Matrix(1, 2, 2);

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
        var m = new Matrix(8, 2, 3),
            vresult = m.multiply(2);

        equal(vresult.x(), 16, "Matrix scalar multiplication first element");
        equal(vresult.y(), 4, "Matrix scalar multiplication second element");
        equal(vresult.z(), 6, "Matrix scalar multiplication third element");

        vresult = vresult.divide(4);

        equal(vresult.x(), 4, "Matrix scalar division first element");
        equal(vresult.y(), 1, "Matrix scalar division second element");
        equal(vresult.z(), 1.5, "Matrix scalar division third element");
    });

    test("Dot Product", function () {
        var v1 = new Matrix(-5, -2),
            v2 = new Matrix(-3, 4);

        equal(v1.dot(v2), 7, "2D dot product");

        // Try for a perpendicular.
        v1 = new Matrix(Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        v2 = new Matrix(-Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        equal(v1.dot(v2), 0, "Perpendicular 2D dot product");

        // Try 3D.
        v1 = new Matrix(3, 2, 5);
        v2 = new Matrix(4, -1, 3);
        equal(v1.dot(v2), 25, "3D dot product");

        // Check for errors.
        v1 = new Matrix(4, 2);
        v2 = new Matrix(3, 9, 1);

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
        var v1 = new Matrix(3, 4),
            v2 = new Matrix(1, 2),
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
        v1 = new Matrix(1, 0, 0);
        v2 = new Matrix(0, 1, 0);
        vresult = v1.cross(v2);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), 1, "Cross product third element");

        // This one shows that switching matrix order produces
        // the opposite-pointing normal.
        vresult = v2.cross(v1);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), -1, "Cross product third element");
    });

    test("Magnitude and Unit Vectors", function () {
        var m = new Matrix(3, 4);

        // The classic example.
        equal(m.magnitude(), 5, "2D magnitude check");

        // Kind of a cheat, but still tests the third dimension.
        m = new Matrix(5, 0, 12);
        equal(m.magnitude(), 13, "3D magnitude check");

        // Now for unit vectors.
        m = (new Matrix(3, 4)).unit();

        equal(m.magnitude(), 1, "2D unit matrix check");
        equal(m.x(), 3 / 5, "2D unit matrix first element");
        equal(m.y(), 4 / 5, "2D unit matrix second element");

        m = (new Matrix(0, -7, 24)).unit();

        equal(m.magnitude(), 1, "3D unit matrix check");
        equal(m.x(), 0, "3D unit matrix first element");
        equal(m.y(), -7 / 25, "3D unit matrix second element");
        equal(m.z(), 24 / 25, "3D unit matrix third element");
    });

    test("Projection", function () {
        var m = new Matrix(3, 3, 0),
            vresult = m.projection(new Matrix(5, 0, 0));

        equal(vresult.magnitude(), 3, "3D matrix projection magnitude check");
        equal(vresult.x(), 3, "3D matrix projection first element");
        equal(vresult.y(), 0, "3D matrix projection second element");
        equal(vresult.z(), 0, "3D matrix projection third element");

        // Error check: projection only applies to vectors with the same
        // number of dimensions.
        raises(
            function () {
                (new Matrix(5, 2)).projection(new Matrix(9, 8, 1));
            },
            "Ensure that projection applies only to vectors with the same number of dimensions"
        );
    });*/

});
