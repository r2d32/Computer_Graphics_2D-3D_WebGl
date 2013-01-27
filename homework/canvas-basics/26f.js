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
   ctx.beginPath();
   ctx.lineWidth = 15;
   ctx.arc(90,45,25,0,Math.PI*2,true); // Outer circle
   ctx.moveTo(140,120);  
   ctx.arc(90,120,50,0,Math.PI*2,true);  // Left eye
   ctx.strokeStyle = 'rgba(150,0,150,0.7)';
   ctx.stroke();
}());