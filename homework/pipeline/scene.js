/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        rotationMatrix,
        //HW
        // Projection matrix
        projectionMatrix, 
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.
    objectsToDraw = [
         
        {
            color: {r: 1, g: 0, b: 0},
            vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
            mode: gl.LINES,
            axis: { x: 1.0, y: 0.0, z: 1.0 },
            trans: { dx: -0.5, dy: 1.0, dz: 0.0 },
            trans2: { dx: -0.5, dy: 1.0, dz: 0.0 }
        },
        {   
            color: {r: 1, g: 1, b: 0},
            vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
            mode: gl.TRIANGLES,
            axis: { x: 1.0, y: 0.0, z: 1.0 },
            trans: { dx: -2, dy: 0.0, dz: 0.0 },
            scalation: {sx:3,sy:3,sz:3}
        },
        {

            color: {r:0.98, g: 0.98, b:0.98},
            vertices: Shapes.toRawTriangleArray(Shapes.pencilTip()),
            mode: gl.TRIANGLES,

            childSubstructure: {
                color: {r:0.98, g: 0.98, b:0.98},
                vertices: Shapes.toRawTriangleArray(Shapes.pencilTip().childStructure ),
                mode: gl.TRIANGLES,
                
                childSubstructure: {
                    color: {r:0, g: 0, b:0},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16)),
                    mode: gl.TRIANGLES,
                    axis: { x: -0.5, y: 1.0, z: 0.0 },
                    trans: { dx: -0.5, dy: 0.0, dz: 0.0 },

                    childSubstructure: {
                        color: {r:0, g: 0, b:0},
                        vertices: Shapes.toRawTriangleArray(Shapes.pencilTip()),
                        mode: gl.LINES,
                        axis: { x: -0.5, y: 1.0, z: 0.0 }
                
                    },
                
                },
                
                axis: { x: -0.5, y: 1.0, z: 0.0 }
            },
            axis: { x: -0.5, y: 1.0, z: 0.0 }
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: Shapes.toRawLineArray(Shapes.pyramid()),
            mode: gl.LINES,
        },
        {
            color: { r: 1.0, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.LINES
        }
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].vertices);

        if (!objectsToDraw[i].colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            objectsToDraw[i].colors = [];
            for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                    j < maxj; j += 1) {
                objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                    objectsToDraw[i].color.r,
                    objectsToDraw[i].color.g,
                    objectsToDraw[i].color.b
                );
            }
        }
        objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectsToDraw[i].colors);
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
        //HW
    //projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram,"projectionMatrix");
    //ortho(arguments).conversionConvenience();
   // ortho().conversion();

    /*
     * Passes substructure objects to WebGL
     */
    passToWebGL = function (child){

        child.buffer = GLSLUtilities.initVertexBuffer(gl,
                child.vertices);

        if (!child.colors) {
            // If we have a single color, we expand that into an array
            // of the same color over and over.
            child.colors = [];
            for (j = 0, maxj = child.vertices.length / 3;
                    j < maxj; j += 1) {
                child.colors = child.colors.concat(
                    child.color.r,
                    child.color.g,
                    child.color.b
                );
            }
        }
        child.colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                child.colors);
        

    }
    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        var mm = new Matrix4x4();
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        if (object.axis != undefined) {
             gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                mm.rotate(currentRotation, object.axis.x, object.axis.y, object.axis.z).conversion()
            ));

            mm = mm.rotate(currentRotation, object.axis.x, object.axis.y, object.axis.z);

        }

        if (object.trans != undefined) {
             gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                mm.translate(object.trans.dx, object.trans.dy, object.trans.dz).conversion() 
            ));

            mm = mm.translate(object.trans.dx, object.trans.dy, object.trans.dz);

        }

        if (object.scalation != undefined) {
             gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                mm.scale(object.scalation.sx, object.scalation.sy, object.scalation.sz).conversion() 
            ));

            mm = mm.translate(object.trans.dx, object.trans.dy, object.trans.dz);

        }
            
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
        // This will draw any substructure of a composite object
        if (object.childSubstructure){
            passToWebGL(object.childSubstructure);
            drawObject(object.childSubstructure);
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().rotate(currentRotation, 0, 1, 0).conversion()));
        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };
    // HW: Set up the ortho projection matrix
     gl.uniformMatrix4fv( projectionMatrix,
         gl.FALSE, new Float32Array(
            new Matrix4x4().ortho(-5, 5, -5, 5,-5, 10).conversion()
        )
     );

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));
