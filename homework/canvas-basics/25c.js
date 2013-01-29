/*
 * Exercise 25c
 */
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