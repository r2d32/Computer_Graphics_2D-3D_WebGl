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
  // Filled triangle
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(175, 200 + (30 * Math.sqrt(1.5)));
  ctx.lineTo(175, 200 + (30 * Math.sqrt(1.5)) + 30);

  ctx.stroke();  
//A1=(L,0)
//A2=(L/2, L·√3/2)
//A3=(-L/2, L·√3/2)
//A4=(-L,0)
//A5=(-L/2, -L·√3/2)
//A6=(L/2, -L·√3/2)    

}());