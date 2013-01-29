/*
 * Exercise 26e
 */
(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');
   ctx.beginPath();
   ctx.lineWidth = 15;
   ctx.arc(90,45,25,0,Math.PI*2,true); // Upper circle
   ctx.moveTo(140,120);  
   ctx.arc(90,120,50,0,Math.PI*2,true);  // Bottom cirlce
   ctx.strokeStyle = 'rgba(150,0,150,0.7)';
   ctx.stroke();
}());