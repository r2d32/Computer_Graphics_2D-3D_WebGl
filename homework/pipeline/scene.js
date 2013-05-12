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
        projectionMatrix,
 
        vertexPosition,
        vertexColor,

        // Variables that involve lighting.
        normalVector,
        lightPosition,
        lightDiffuse,

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
            color: {r: 0.44, g: 0.54, b: 0.56},
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
            normals: Shapes.toNormalArray(Shapes.pyramid()),
            trans: { dx: -5, dy: 5.0, dz: -9 },
            scaling: { sx:3000, sy:2000, sz:3000},
            keyframes: [
                {
                    frame: 0,
                    ease: KeyframeTweener.cubicEaseIn,
                    scaling: { sx:3000, sy:2000, sz:3000},
                    tx: 0,
                    ty: 0,
                    tz: -300
                },
                {
                    frame: 1500,
                    ease: KeyframeTweener.cubicEaseIn,
                    scaling: { sx:3000, sy:2000, sz:3000},
                    tx: 0,
                    ty: 0,
                    tz: -300
                }
            ]
        },

        {
            color: {r: 1, g: 1, b: 1},
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
            normals: Shapes.toNormalArray(Shapes.pyramid()),
            trans: { dx: -5, dy: 5.0, dz: -9 },
            scaling: { sx:30, sy:20, sz:30},
            keyframes: [
                {
                    frame: 0,
                    ease: KeyframeTweener.cubicEaseIn,
                    scaling: { sx:0.2, sy:1, sz:1},
                    tx: 0,
                    ty: 0,
                    tz: -30
                },
                {
                    frame: 1500,
                    ease: KeyframeTweener.cubicEaseIn,
                    scaling: { sx:0.2, sy:1, sz:1},
                    axis: { x: 7, y:9, z: 9, theta: 500 },
                    tx: 0,
                    ty: 0,
                    tz: -30
                }
            ]
        },

        {

            color: {r:0.98, g: 0.98, b:0.98},
            vertices: Shapes.toRawTriangleArray(Shapes.xWing()),
            normals: Shapes.toNormalArray(Shapes.xWing()),
            mode: gl.TRIANGLES,
            trans: { dx: 0, dy: 0, dz: -20 },
            scaling: {sx: 1,sy: 1,sz: 1},
            axis: { x: -7, y:9, z: 9, theta: 160 },
            childSubstructure: [
                {
                    color: {r:0.7, g: 0.7, b:0.7},
                    vertices: Shapes.toRawTriangleArray(Shapes.xWing().childStructure ),
                    normals: Shapes.toNormalArray(Shapes.xWing().childStructure ),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0,0.6,-0.33)),
                    normals: Shapes.toNormalArray(Shapes.cilinder(16,0,0.6,-0.33)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0,0.6,0.33)),
                    normals: Shapes.toNormalArray(Shapes.cilinder(16,0,0.6,0.33)),
                    mode: gl.TRIANGLES,
                },
                {
                    // JD: I changed this to red so that it is easy to spot.
                    color: {r:1.0, g: 0.0, b:0.0},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,0.33,0.6,0)),
                    normals: Shapes.toNormalArray(Shapes.cilinder(16,0.33,0.6,0)),
                    mode: gl.TRIANGLES,
                    // JD: This should move the object 1 unit to the left...but
                    //     instead it disappears entirely!  Why is that?
                    //     (comment out the trans to see the red cylinder
                    //     magically reappear!)
//                    trans: { dx: -1, dy: 0, sz: 0 }
                },
                {
                    color: {r:0.5, g: 0.5, b:0.5},
                    vertices: Shapes.toRawTriangleArray(Shapes.cilinder(16,-0.33,0.6,0)),
                    normals: Shapes.toNormalArray(Shapes.cilinder(16,-0.33,0.6,0)),
                    mode: gl.TRIANGLES,
                },
                {
                    color: { r: 0.6, g: 0.6, b: 0.6 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cabin()),
                    normals: Shapes.toNormalArray(Shapes.cabin()),
                    mode: gl.TRIANGLES
                },
                {
                    color: { r: 0.0, g: 0.0, b: 0.6 },
                    vertices: Shapes.toRawTriangleArray(Shapes.glass()),
                    normals: Shapes.toNormalArray(Shapes.glass()),
                    mode: gl.TRIANGLES
                },
                {
                    color: {r:0.98, g: 0.98, b:0.98},
                    vertices: Shapes.toRawTriangleArray(Shapes.wings()),
                    normals: Shapes.toNormalArray(Shapes.wings()),
                    mode: gl.TRIANGLES,
                    mode2: gl.LINES,
                }

            ],

            keyframes: [
                {
                    frame: 0,
                    ease: KeyframeTweener.quadEaseOut,
                    axis: { x: 7, y:9, z: 9, theta: 100 },
                    tx: 0,
                    ty: 0,
                    tz: -1
                },

                {
                    frame: 200,
                    ease: KeyframeTweener.quadEaseInAndOut,
                    axis: { x: 7, y:9, z: 9, theta: 160 },

                    tx: 2,
                    ty: -2,
                    tz: -20
                },

                {
                    frame: 400,
                    ease: KeyframeTweener.cubicEaseIn,
                    axis: { x: 7, y:9, z: 9, theta: 170 },
                    tx: 1.5,
                    ty: -1.5,
                    tz: -30
                },

                {
                    frame: 500,
                    ease: KeyframeTweener.quadEaseOut,
                    axis: { x: 7, y:9, z: 9, theta: 180 },
                    tx: 1.7,
                    ty: -1.7,
                    tz: -25,
                                
                },

                {
                    frame: 700,
                    ease: KeyframeTweener.elastic,
                    axis: { x: 7, y:9, z: 9, theta: 400 },
                    tx: -50,
                    ty:0,
                    tz: -100,
                },

                {
                    frame: 700,
                    ease: KeyframeTweener.elastic,
                    axis: { x: -7, y:9, z: 9, theta: 160 },
                    tx: -50,
                    ty:0,
                    tz: -100,
                },

                {
                    frame: 900,
                    ease: KeyframeTweener.elastic,
                    axis: { x: -7, y:9, z: 9, theta: 160 },
                    tx: 70,
                    ty:0,
                    tz: -300,
                },
            ]
        },        
    ];
        
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
  
        // One more buffer: normals.
        child.normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                child.normals);

    }

    // Pass the vertices from general objects to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        passToWebGL(objectsToDraw[i]);
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
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);


    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram,"projectionMatrix");

    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().conversion()));
        gl.uniformMatrix4fv(translationMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().conversion()));
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().conversion()));

        var parentTransform = {
            axis: object.axis,
            trans: object.trans,
            scaling: object.scaling,
        };

        if (object.axis != undefined &&
            (object.axis.x || object.axis.y || object.axis.z)) {
             gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().rotate(
                    object.axis.theta,
                    object.axis.x, object.axis.y, object.axis.z
                ).conversion()
            ));


        } 

        if (object.trans != undefined) {
            gl.uniformMatrix4fv(translationMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().translate(object.trans.dx, object.trans.dy, object.trans.dz).conversion() 
            ));


        }

        if (object.scaling != undefined) {
            gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
                new Matrix4x4().scale(object.scaling.sx, object.scaling.sy, object.scaling.sz).conversion() 
            ));

        }
        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        // This will draw any substructure of a composite object
        if (object.childSubstructure){
            for(var e = 0; e < object.childSubstructure.length; e++ ){
         
                object.childSubstructure[e].axis = (object.childSubstructure[e].axis)? 
                    object.childSubstructure[e].axis : parentTransform.axis;
                object.childSubstructure[e].trans = (object.childSubstructure[e].trans) ?
                    object.childSubstructure[e].trans : parentTransform.trans;
                object.childSubstructure[e].scaling = (object.childSubstructure[e].scaling) ?
                    object.childSubstructure[e].scaling : parentTransform.scaling;

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
                    
                    if(!startKeyframe.scaling) {
                        startKeyframe.scaling = { sx:1, sy:1, sz: 1 };
                    }
                    if(!endKeyframe.scaling) {
                        endKeyframe.scaling = { sx:1, sy:1, sz: 1 };
                    }
                    if(!startKeyframe.axis) {
                        startKeyframe.axis = { x: 0, y:0, z: 0, theta: 0 };
                    }
                    if(!endKeyframe.axis) {
                        endKeyframe.axis = { x: 0, y:0, z: 0, theta: 0 };
                    }


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
                        startKeyframe.scaling.sx, 1, endKeyframe.scaling.sx, 1,
                        "scaling", "sx"
                    ));
                    tweens.push(createTween(
                        startKeyframe.scaling.sy, 1, endKeyframe.scaling.sy, 1,
                        "scaling", "sy"
                    ));
                    tweens.push(createTween(
                        startKeyframe.scaling.sz, 1, endKeyframe.scaling.sz, 1,
                        "scaling", "sz"
                    ));
                    tweens.push(createTween(
                        startKeyframe.axis.theta, 0,
                        endKeyframe.axis.theta, 0,
                        "axis", "theta"
                    ));
                    tweens.push(createTween(
                        startKeyframe.axis.x, 0, endKeyframe.axis.x, 0,
                        "axis", "x"
                    ));
                    tweens.push(createTween(
                        startKeyframe.axis.y, 0, endKeyframe.axis.y, 0,
                        "axis", "y"
                    ));
                    tweens.push(createTween(
                        startKeyframe.axis.z, 0, endKeyframe.axis.z, 0,
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
            new Matrix4x4().frustum(-1, 1, -1, 1,10, 1000).conversion()
        )
    );

    // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform3fv(lightPosition, [5.0, 1.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {

                // Note how we tween from the repeated-call, and not
                // drawScene.  This allows us to invoke drawScene for
                // other things.  Tweening is then cleanly bound to
                // the repeated function call.
                tweenScene();

                drawScene();

            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));
