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
   ctx.fillStyle = "rgb(0,0,200)";
   ctx.fillRect(60,60,60,60);

}());