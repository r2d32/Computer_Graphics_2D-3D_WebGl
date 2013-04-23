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

        // The all-important (for tweening) currentFrame variable.
        currentFrame = 0,

        // The also-as-important (for tweening) keyframe update function.
        // It is based on the interval function used by KeyframeTweener.
        tweenScene,

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
            trans: { dx: -0.5, dy: 1.0, dz: -20.0 },
            trans2: { dx: -0.5, dy: 1.0, dz: 0.0 },
            keyframes: [
                {
                    frame: 0,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: -0.5,
                    ty: 1.0,
                    tz: -20.0
                },
                {
                    frame: 100,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: 5,
                    ty: 5,
                    tz: -25
                },
                {
                    frame: 200,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: 5,
                    ty: -5,
                    tz: -5
                },
                {
                    frame: 300,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: -5,
                    ty: -5,
                    tz: -25
                },
                {
                    frame: 400,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: -5,
                    ty: 5,
                    tz: -5
                },
                {
                    frame: 500,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: 0,
                    ty: 0,
                    tz: -100
                }
            ]
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
            vertices: Shapes.toRawTriangleArray(Shapes.xWing()),
            mode: gl.TRIANGLES,
            mode2: gl.LINES,
            axis: { x: -0.5, y: 1.0, z: 0.0 },
            childSubstructure:[
                {
                    color: {r:0.7, g: 0.7, b:0.7},
                    vertices: Shapes.toRawTriangleArray(Shapes.xWing().childStructure ),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.xWing().childStructure ),
                    mode: gl.LINES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0,0.6,-0.33)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0,0.6,0.33)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0.33,0.6,0)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,-0.33,0.6,0)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: { r: 0.6, g: 0.6, b: 0.6 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cabin()),
                    mode: gl.TRIANGLES
                },
                {
                    color: { r: 0.0, g: 0.0, b: 0.6 },
                    vertices: Shapes.toRawTriangleArray(Shapes.glass()),
                    mode: gl.TRIANGLES
                },
                {
                    color: {r:0.98, g: 0.98, b:0.98},
                    vertices: Shapes.toRawTriangleArray(Shapes.wings()),
                    mode: gl.TRIANGLES,
                    mode2: gl.LINES,
                }

            ],

            keyframes: [
                {
                    frame: 0,
                    ease: KeyframeTweener.quadEaseOut,
                    tx: 0,
                    ty: 5,
                    tz: 0
                },

                {
                    frame: 200,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    tx: 5,
                    ty: 0,
                    tz: 0
                },

                {
                    frame: 400,
                    ease: KeyframeTweener.cubicEaseIn,
                    tx: -5,
                    ty: 0,
                    tz: 0
                },

                {
                    frame: 600,
                    ease: KeyframeTweener.quadEaseOut,
                    tx: 4,
                    ty: 3,
                    tz: -10,
                    sx: 0.25,
                    sy: 0.25,
                    sz: 0.25,
                },

                {
                    frame: 800,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    tx: 3,
                    ty: -2,
                    tz: 3
                },
            ]
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: Shapes.toRawLineArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
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
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram,"projectionMatrix");

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
        var m = new Matrix4x4();
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);


        if (object.axis != undefined &&
            (object.axis.x || object.axis.y || object.axis.z)) {
             gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                m.rotate(
                    object.axis.theta || currentRotation,
                    object.axis.x, object.axis.y, object.axis.z
                ).conversion()
            ));

            m = m.rotate(
                object.axis.theta || currentRotation,
                object.axis.x, object.axis.y, object.axis.z
            );

        }

        if (object.trans != undefined) {
            gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                m.translate(object.trans.dx, object.trans.dy, object.trans.dz).conversion() 
            ));

            m = m.translate(object.trans.dx, object.trans.dy, object.trans.dz);

        }

        if (object.scalation != undefined) {
            gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                m.scale(object.scalation.sx, object.scalation.sy, object.scalation.sz).conversion() 
            ));

            m = m.translate(object.trans.dx, object.trans.dy, object.trans.dz);

        }
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
        // This will draw any substructure of a composite object
        if (object.childSubstructure){
            for(var e = 0; e < object.childSubstructure.length; e++ ){
                object.childSubstructure[e].axis = (object.childSubstructure[e].axis)? object.childSubstructure[e].axis :
                    object.axis;
                object.childSubstructure[e].trans = (object.childSubstructure[e].trans) ?
                    object.childSubstructure[e].trans : object.trans;
                object.childSubstructure[e].scalation = (object.childSubstructure[e].scalation) ?
                    object.childSubstructure[e].scalation : object.scalation;

                passToWebGL(object.childSubstructure[e]);
                drawObject(object.childSubstructure[e]);
            }
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
                new Matrix4x4().conversion()));
        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    /*
     * Updates the scene based on current keyframes.
     */
    tweenScene = function () {
        // Some reusable loop variables.
        var i,
            j,
            k,
            maxI,
            maxJ,
            maxK,
            ease,
            startKeyframe,
            endKeyframe,
            currentTweenFrame,
            duration,
            transformSetting,

            // Custom helper function and data structure that will capture
            // the repeated tweening code and data.
            createTween,
            tweens = [];

        // Let's define the helper.
        createTween = function (start, startDefault, end, endDefault, transform, property) {
            var distance;
            start = start || startDefault;
            distance = (end || endDefault) - start;
            return {
                start: start,
                distance: distance,
                transform: transform,
                property: property
            };
        };

        // For every object, go to the current pair of keyframes.
        // Then, set the instance transform of the object based on the current frame.
        for (i = 0, maxI = objectsToDraw.length; i < maxI; i += 1) {
            // Not every object will have keyframes...
            if (!objectsToDraw[i].keyframes) {
                continue;
            }

            // ...but if an object does have them...
            for (j = 0, maxJ = objectsToDraw[i].keyframes.length - 1; j < maxJ; j += 1) {
                // We look for keyframe pairs such that the current
                // frame is between their frame numbers.
                if ((objectsToDraw[i].keyframes[j].frame <= currentFrame) &&
                        (currentFrame <= objectsToDraw[i].keyframes[j + 1].frame)) {
                    // Point to the start and end keyframes.
                    startKeyframe = objectsToDraw[i].keyframes[j];
                    endKeyframe = objectsToDraw[i].keyframes[j + 1];

                    // Set up our start and distance values, using defaults
                    // if necessary.
                    ease = startKeyframe.ease || KeyframeTweener.linear;
                    tweens = [];
                    tweens.push(createTween(
                        startKeyframe.tx, 0, endKeyframe.tx, 0,
                        "trans", "dx"
                    ));
                    tweens.push(createTween(
                        startKeyframe.ty, 0, endKeyframe.ty, 0,
                        "trans", "dy"
                    ));
                    tweens.push(createTween(
                        startKeyframe.tz, 0, endKeyframe.tz, 0,
                        "trans", "dz"
                    ));
                    tweens.push(createTween(
                        startKeyframe.sx, 1, endKeyframe.sx, 1,
                        "scalation", "sx"
                    ));
                    tweens.push(createTween(
                        startKeyframe.sy, 1, endKeyframe.sy, 1,
                        "scalation", "sy"
                    ));
                    tweens.push(createTween(
                        startKeyframe.sz, 1, endKeyframe.sz, 1,
                        "scalation", "sz"
                    ));
                    tweens.push(createTween(
                        startKeyframe.rotate * Math.PI / 180, 0,
                        endKeyframe.rotate * Math.PI / 180, 0,
                        "axis", "theta"
                    ));
                    tweens.push(createTween(
                        startKeyframe.rx, 0, endKeyframe.rx, 0,
                        "axis", "x"
                    ));
                    tweens.push(createTween(
                        startKeyframe.ry, 0, endKeyframe.ry, 0,
                        "axis", "y"
                    ));
                    tweens.push(createTween(
                        startKeyframe.rz, 0, endKeyframe.rz, 0,
                        "axis", "z"
                    ));
                    currentTweenFrame = currentFrame - startKeyframe.frame;
                    duration = endKeyframe.frame - startKeyframe.frame + 1;

                    // Set the object's instance transform according to the tweened
                    // values.  *** not currently recursive ***
                    for (k = 0, maxK = tweens.length; k < maxK; k += 1) {
                        transformSetting = objectsToDraw[i][tweens[k].transform];
                        if (!transformSetting) {
                            transformSetting = {};
                            objectsToDraw[i][tweens[k].transform] = transformSetting;
                        }

                        transformSetting[tweens[k].property] =
                            ease(
                                currentTweenFrame, tweens[k].start,
                                tweens[k].distance, duration
                            );
                    }
                }
            }
        }

        // Move to the next frame.
        currentFrame += 1;
    };

    gl.uniformMatrix4fv( projectionMatrix,
        gl.FALSE, new Float32Array(
            new Matrix4x4().frustum(-5, 5, -5, 5, 10, 1000).conversion()
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

                // Note how we tween from the repeated-call, and not
                // drawScene.  This allows us to invoke drawScene for
                // other things.  Tweening is then cleanly bound to
                // the repeated function call.
                tweenScene();

                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));
