/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
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