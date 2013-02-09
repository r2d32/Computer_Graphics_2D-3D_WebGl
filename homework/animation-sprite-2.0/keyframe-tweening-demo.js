/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        link = function (renderingContext) {
            renderingContext.save();
    

    renderingContext.beginPath();  
   renderingContext.strokeStyle = "black";
   renderingContext.lineWidth = 1;
   renderingContext.lineTo(0, 30);
   renderingContext.lineTo(30, 30);
   renderingContext.lineTo(30, 0);
   renderingContext.lineTo(0, 0);
   renderingContext.lineTo(0, 30);
   renderingContext.fillStyle = "rgba(0, 0, 200, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   
   //shoes
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(0, 30);
   renderingContext.lineTo(0, 40);
   renderingContext.lineTo(15, 40);
   renderingContext.lineTo(15, 30);
   renderingContext.lineTo(0, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(20, 30);
   renderingContext.lineTo(20, 40);
   renderingContext.lineTo(35, 40);
   renderingContext.lineTo(35, 30);
   renderingContext.lineTo(20, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
    renderingContext.restore();


   
   //Front of the cube

   //Back of the 

        },

        circle = function (renderingContext) {
            renderingContext.save();
    

    renderingContext.beginPath();  
   renderingContext.beginPath();  
   renderingContext.strokeStyle = "black";
   renderingContext.lineWidth = 1;
   renderingContext.lineTo(0, 30);
   renderingContext.lineTo(30, 30);
   renderingContext.lineTo(30, 0);
   renderingContext.lineTo(0, 0);
   renderingContext.lineTo(0, 30);
   renderingContext.fillStyle = "rgba(0, 0, 200, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   
   //shoes
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(-5, 30);
   renderingContext.lineTo(-5, 40);
   renderingContext.lineTo(10, 40);
   renderingContext.lineTo(10, 30);
   renderingContext.lineTo(-5, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(25, 30);
   renderingContext.lineTo(25, 40);
   renderingContext.lineTo(40, 40);
   renderingContext.lineTo(40, 30);
   renderingContext.lineTo(25, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
    renderingContext.restore();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: link,
                keyframes: [
                    {
                        frame: 0,
                        tx: 5,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 20,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    {
                        frame: 40,
                        tx: 110,
                        ty: 20,
                        rotate: 30
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 200,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: circle,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 600,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());