(function draw(){
   
   var ctx = document.getElementById('canvas').getContext('2d');

   var radgrad = ctx.createRadialGradient(60,60,3,90,90,60);
   radgrad.addColorStop(0, "white");
   radgrad.addColorStop(1, "yellow");

   ctx.beginPath();
   ctx.arc(90,90,60,0,Math.PI*2,true); // Outer circle
  //ctx.moveTo(110,75);
  //ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
  //ctx.moveTo(65,65);
  //ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
  //ctx.moveTo(95,65);
  //ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
   ctx.fillStyle = radgrad;
   ctx.strokeStyle = 'rgba(0,0,0,0.5)';
   ctx.fill();
   ctx.stroke();
  
   ctx.beginPath();
   ctx.fillStyle = "rgb(0,0,0)"
   ctx.arc(70,70,5,0,Math.PI*2,true);
   ctx.fill();

   ctx.beginPath();
   ctx.fillStyle = "rgb(0,0,0)"
   ctx.arc(115,70,5,0,Math.PI*2,true);
   ctx.fill();

   ctx.beginPath();
   ctx.strokeStyle = 'rgba(0,0,0,0.8)';
   ctx.lineWidth = 7;
   ctx.arc(90,90,40,Math.PI*2.2,Math.PI*0.8,false);
   ctx.lineCap = 'round';
   ctx.stroke();

}());