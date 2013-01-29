/*
 * Exercise 26b
 */
(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');
   var squareWidth = 15;
   var canvasWidth = 180;

   ctx.beginPath();
   for (var i=0; ( squareWidth * i ) < (canvasWidth - squareWidth); i++) { 
      ctx.moveTo(squareWidth + (squareWidth * i) ,0);
      ctx.lineTo(squareWidth + (squareWidth * i),180);
      ctx.moveTo(0, squareWidth + (squareWidth * i));
      ctx.lineTo(180, squareWidth + (squareWidth * i));
   }
   ctx.strokeStyle = 'rgb(0,120,0)';
   ctx.stroke();
}());