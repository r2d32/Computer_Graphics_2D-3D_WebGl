/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.

        //Drawings for character Link
        linkCloseFeet = function (renderingContext) {
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
            renderingContext.lineTo(22.5,25);
            renderingContext.lineTo(7.5,25);
            renderingContext.lineTo(7.5,17.5);
            renderingContext.lineTo(22.5,17.5);
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

        swordUp = function (renderingContext) {
            renderingContext.save();
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(12.5,5);
            renderingContext.lineTo(17.5,5);
            renderingContext.lineTo(17.5,-12.5);
            renderingContext.lineTo(15, -15);
            renderingContext.lineTo(12.5,-12.5);
            renderingContext.lineTo(12.5,5);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.restore();

        },

        swordMiddle = function (renderingContext) {
            renderingContext.save();
            //Sword 45 
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(25,12.5);
            renderingContext.lineTo(37.5,0);
            renderingContext.lineTo(37.5,-5);
            renderingContext.lineTo(35, -5);
            renderingContext.lineTo(20,10);
            renderingContext.lineTo(25,12.5);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            //Handle
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,7.5);
            renderingContext.lineTo(27.5,17.5);
            renderingContext.lineTo(25,15);
            renderingContext.lineTo(22.5, 10);
            renderingContext.lineTo(22.5,7.5);
            renderingContext.fillStyle = "rgba(0,0,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.restore();

        },

        swordFlat = function (renderingContext) {
            renderingContext.save();

            //Sword flat
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(30,22.5);
            renderingContext.lineTo(47.5,22.5);
            renderingContext.lineTo(50,20);
            renderingContext.lineTo(47.5, 17.5);
            renderingContext.lineTo(30,17.5);
            renderingContext.lineTo(30,22.5);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            //Handle
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,17.5);
            renderingContext.lineTo(22.5,22.5);
            renderingContext.lineTo(27.5,22.5);
            renderingContext.lineTo(27.5, 25);
            renderingContext.lineTo(30,25);
            renderingContext.lineTo(30,15);
            renderingContext.lineTo(27.5,15);
            renderingContext.lineTo(27.5,17.5);
            renderingContext.lineTo(22.5,17.5);
            renderingContext.fillStyle = "rgba(0,0,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            renderingContext.restore();

        },

        linkSeparatedFeet = function (renderingContext) {
            renderingContext.save();
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
        ghost = function (renderingContext) {
            renderingContext.save();
            //Ghost
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "white";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(10,10);
            renderingContext.lineTo(30,0);
            renderingContext.lineTo(50,0);
            renderingContext.lineTo(70, 10);
            renderingContext.lineTo(90,30);
            renderingContext.lineTo(120,40);
            renderingContext.lineTo(100,40);
            renderingContext.lineTo(100,50);
            renderingContext.lineTo(80,40);
            renderingContext.lineTo(90,50);
            renderingContext.lineTo(80,60);
            renderingContext.lineTo(100,70);
            renderingContext.lineTo(80,70);
            renderingContext.lineTo(90,80);
            renderingContext.lineTo(70,90);
            renderingContext.lineTo(50,90);
            renderingContext.lineTo(30,80);
            renderingContext.lineTo(40,70);
            renderingContext.lineTo(30,60);
            renderingContext.lineTo(40,50);
            renderingContext.lineTo(30,50);
            renderingContext.lineTo(30,40);
            renderingContext.lineTo(20,50);
            renderingContext.lineTo(10,40);
            renderingContext.lineTo(0,50);
            renderingContext.lineTo(0,30);
            renderingContext.lineTo(10,10);
            renderingContext.fillStyle = "rgba(0,0,0,0.5)";
            renderingContext.stroke();
            renderingContext.fill();   

            //Eye
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(20,10);
            renderingContext.lineTo(30,10);
            renderingContext.lineTo(30,20);
            renderingContext.lineTo(20,30);
            renderingContext.lineTo(10,30);
            renderingContext.lineTo(10,20);
            renderingContext.lineTo(20,10);
            renderingContext.fillStyle = "rgba(255,255,255, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            // Red Dot
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(10,25);
            renderingContext.lineTo(15,25);
            renderingContext.lineTo(15,30);
            renderingContext.lineTo(10,30);
            renderingContext.lineTo(10,25);
            renderingContext.fillStyle = "rgba(255,0,0, 1)";
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
                draw: [ linkCloseFeet,linkSeparatedFeet, swordUp, swordMiddle, swordFlat ],
                keyframes: [
                    {
                        frame: 0,
                        tx: 70,
                        ty: 70,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 40,
                        tx: 70,
                        ty: 100,
                        ease: KeyframeTweener.cubeEaseIn
                    },

                    {
                        frame: 90,
                        tx: 220,
                        ty: 180,
                        ease: KeyframeTweener.linear
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 290,
                        tx: 220,
                        ty: 180,
                        ease: KeyframeTweener.linear // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: [ghost],
                keyframes: [
                    {
                        frame: 0,
                        tx: 255,
                        ty: 100,
                  
                    },

                    {
                        frame: 150,
                        tx: 225,
                        ty: 130,
                        ease: KeyframeTweener.elasticOut
          
                    },

                    {
                        frame: 180,
                        tx: 600,
                        ty: 50,
                        sx: 0.1,
                        sy: 0.1,
                        ease: KeyframeTweener.elasticOut
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