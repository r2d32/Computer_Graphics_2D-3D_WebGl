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
            //Hat
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(5,0);
            renderingContext.lineTo(0, 5);
            renderingContext.lineTo(0, 10);
            renderingContext.lineTo(2.5,7.5);
            renderingContext.lineTo(5, 10);
            renderingContext.lineTo(5, 10.5);
            renderingContext.lineTo(7.5, 15);
            renderingContext.lineTo(12.5, 15);
            renderingContext.lineTo(17.5, 2.5);
            renderingContext.lineTo(15, 0);
            renderingContext.lineTo(5, 0);
            renderingContext.fillStyle = "rgba(69, 139,0 , 1)";
            renderingContext.stroke();
            renderingContext.fill();

            //Face
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(10,5);
            renderingContext.lineTo(15, 10);
            renderingContext.lineTo(22.5, 5);
            renderingContext.lineTo(22.5, 10);
            renderingContext.lineTo(25,10);
            renderingContext.lineTo(22.5, 17.5);
            renderingContext.lineTo(15, 17.5);
            renderingContext.lineTo(10, 12.5);
            renderingContext.lineTo(10,5);
            renderingContext.fillStyle = "rgba(255,211,155, 1)";
            renderingContext.stroke();
            renderingContext.fill();
           
            //Eye
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 0;
            renderingContext.moveTo(20,10);
            renderingContext.lineTo(18, 10);
            renderingContext.lineTo(18, 7.5);
            renderingContext.lineTo(20, 7.5);
            renderingContext.lineTo(20,10);
            renderingContext.fillStyle = "rgba(0, 0,0 , 0.8)";
            renderingContext.stroke();
            renderingContext.fill();

            //Hair
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(20,0);
            renderingContext.lineTo(12.5, 7.5);
            renderingContext.lineTo(15, 10);
            renderingContext.lineTo(25, 5);
            renderingContext.lineTo(20,0);
            renderingContext.fillStyle = "rgba(255, 215, 0 , 1)";
            renderingContext.stroke();
            renderingContext.fill();

            //Body
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,17.5);
            renderingContext.lineTo(22.5, 25);
            renderingContext.lineTo(7.5, 25);
            renderingContext.lineTo(7.5, 17.5);
            renderingContext.lineTo(22.5, 17.5);
            renderingContext.fillStyle = "rgba(69, 139,0 , 1)";
            renderingContext.stroke();
            renderingContext.fill(); 

            //Hand
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(15,17.5);
            renderingContext.lineTo(15, 22.5);
            renderingContext.lineTo(17.5, 22.5);
            renderingContext.lineTo(17.5, 17.7);
            renderingContext.lineTo(15,17.5);
            renderingContext.fillStyle = "rgba(255,211,155, 1)";
            renderingContext.stroke();
            renderingContext.fill(); 

            //Shield
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 0;
            renderingContext.moveTo(5,15);
            renderingContext.lineTo(15, 15);
            renderingContext.lineTo(15, 22.5);
            renderingContext.lineTo(10, 25);
            renderingContext.lineTo(5,22.5);
            renderingContext.lineTo(5,15);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
 
            //shoes together 
            renderingContext.beginPath();  
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(12.5, 25);
            renderingContext.lineTo(20, 25);
            renderingContext.lineTo(20, 27.5);
            renderingContext.lineTo(12.5, 27.5);
            renderingContext.lineTo(12.5, 25);
            renderingContext.fillStyle = "rgba(0, 0, 0, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.beginPath();  
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(10, 25);
            renderingContext.lineTo(10, 27.5);
            renderingContext.lineTo(17.5, 27.5);
            renderingContext.lineTo(17.5, 25);
            renderingContext.lineTo(10, 25);
            renderingContext.fillStyle = "rgba(92,51,23,1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.restore();

        },

        circle = function (renderingContext) {
            renderingContext.save();
            //Hat
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(5,0);
            renderingContext.lineTo(0, 5);
            renderingContext.lineTo(0, 10);
            renderingContext.lineTo(2.5,7.5);
            renderingContext.lineTo(5, 10);
            renderingContext.lineTo(5, 10.5);
            renderingContext.lineTo(7.5, 15);
            renderingContext.lineTo(12.5, 15);
            renderingContext.lineTo(17.5, 2.5);
            renderingContext.lineTo(15, 0);
            renderingContext.lineTo(5, 0);
            renderingContext.fillStyle = "rgba(69, 139,0 , 1)";
            renderingContext.stroke();
            renderingContext.fill();

            //Face
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(10,5);
            renderingContext.lineTo(15, 10);
            renderingContext.lineTo(22.5, 5);
            renderingContext.lineTo(22.5, 10);
            renderingContext.lineTo(25,10);
            renderingContext.lineTo(22.5, 17.5);
            renderingContext.lineTo(15, 17.5);
            renderingContext.lineTo(10, 12.5);
            renderingContext.lineTo(10,5);
            renderingContext.fillStyle = "rgba(255,211,155, 1)";
            renderingContext.stroke();
            renderingContext.fill();
           
            //Eye
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 0;
            renderingContext.moveTo(20,10);
            renderingContext.lineTo(18, 10);
            renderingContext.lineTo(18, 7.5);
            renderingContext.lineTo(20, 7.5);
            renderingContext.lineTo(20,10);
            renderingContext.fillStyle = "rgba(0, 0,0 , 0.8)";
            renderingContext.stroke();
            renderingContext.fill();

            //Hair
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(20,0);
            renderingContext.lineTo(12.5, 7.5);
            renderingContext.lineTo(15, 10);
            renderingContext.lineTo(25, 5);
            renderingContext.lineTo(20,0);
            renderingContext.fillStyle = "rgba(255, 215, 0 , 1)";
            renderingContext.stroke();
            renderingContext.fill();

            //Body
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,17.5);
            renderingContext.lineTo(22.5, 25);
            renderingContext.lineTo(7.5, 25);
            renderingContext.lineTo(7.5, 17.5);
            renderingContext.lineTo(22.5, 17.5);
            renderingContext.fillStyle = "rgba(69, 139,0 , 1)";
            renderingContext.stroke();
            renderingContext.fill(); 

            //Hand
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(15,17.5);
            renderingContext.lineTo(15, 22.5);
            renderingContext.lineTo(17.5, 22.5);
            renderingContext.lineTo(17.5, 17.7);
            renderingContext.lineTo(15,17.5);
            renderingContext.fillStyle = "rgba(255,211,155, 1)";
            renderingContext.stroke();
            renderingContext.fill(); 

            //Shield
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 0;
            renderingContext.moveTo(5,15);
            renderingContext.lineTo(15, 15);
            renderingContext.lineTo(15, 22.5);
            renderingContext.lineTo(10, 25);
            renderingContext.lineTo(5,22.5);
            renderingContext.lineTo(5,15);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();

            //shoes separated
            renderingContext.beginPath();  
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(15.5, 25);
            renderingContext.lineTo(23, 25);
            renderingContext.lineTo(23, 27.5);
            renderingContext.lineTo(15.5, 27.5);
            renderingContext.lineTo(15.5, 25);
            renderingContext.fillStyle = "rgba(0, 0, 0, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.beginPath();  
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(7, 25);
            renderingContext.lineTo(7, 27.5);
            renderingContext.lineTo(14.5, 27.5);
            renderingContext.lineTo(14.5, 25);
            renderingContext.lineTo(7, 25);
            renderingContext.fillStyle = "rgba(92,51,23,1)";
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