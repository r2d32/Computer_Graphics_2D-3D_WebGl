/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(function draw() {
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
 
        ctx.fillStyle = "rgba(0,200,0, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
 
        ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
        ctx.fillRect (20, 20, 75, 70);
      }
    }());