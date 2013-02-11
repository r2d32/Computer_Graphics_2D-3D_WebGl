/*
 * Exercise 26a
 */
(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');

   //Ghost
   ctx.beginPath();  
   ctx.strokeStyle = "white";
   ctx.lineWidth = 1;
   ctx.moveTo(10,10);
   ctx.lineTo(30,0);
   ctx.lineTo(50,0);
   ctx.lineTo(70, 10);
   ctx.lineTo(90,30);
   ctx.lineTo(120,40);
   ctx.lineTo(100,40);
   ctx.lineTo(100,50);
   ctx.lineTo(80,40);
   ctx.lineTo(90,50);
   ctx.lineTo(80,60);
   ctx.lineTo(100,70);
   ctx.lineTo(80,70);
   ctx.lineTo(90,80);
   ctx.lineTo(70,90);
   ctx.lineTo(50,90);
   ctx.lineTo(30,80);
   ctx.lineTo(40,70);
   ctx.lineTo(30,60);
   ctx.lineTo(40,50);
   ctx.lineTo(30,50);
   ctx.lineTo(30,40);
   ctx.lineTo(20,50);
   ctx.lineTo(10,40);
   ctx.lineTo(0,50);
   ctx.lineTo(0,30);
   ctx.lineTo(10,10);
   ctx.fillStyle = "rgba(0,0,0,0.5)";
   ctx.stroke();
   ctx.fill();

   //Eye
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(20,10);
   ctx.lineTo(30,10);
   ctx.lineTo(30,20);
   ctx.lineTo(20,30);
   ctx.lineTo(10,30);
   ctx.lineTo(10,20);
   ctx.lineTo(20,10);
   ctx.fillStyle = "rgba(255,255,255, 1)";
   ctx.stroke();
   ctx.fill();
   // Red Dot
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(10,25);
   ctx.lineTo(15,25);
   ctx.lineTo(15,30);
   ctx.lineTo(10,30);
   ctx.lineTo(10,25);
   ctx.fillStyle = "rgba(255,0,0, 1)";
   ctx.stroke();
   ctx.fill();
 
}());