(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');
   var squareWidth = 60;
   var canvasWidth = 180;

   ctx.beginPath();
   ctx.moveTo(30, 90);
   ctx.lineTo(30, squareWidth + 90);
   ctx.lineTo(30 + squareWidth , squareWidth + 90);
   ctx.lineTo(30 + squareWidth , 90);
   ctx.lineTo(30, 90);
   ctx.lineTo(60,60);
   ctx.lineTo(60 + squareWidth , 60);
   ctx.lineTo(60 + squareWidth , squareWidth + 60);
   ctx.lineTo(30 + squareWidth , squareWidth + 90);
   ctx.moveTo(90, 90);
   ctx.lineTo(60 + squareWidth , 60);
   ctx.strokeStyle = 'rgb(0,120,0)';
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(60, 60);
   ctx.lineTo(60, 60 + squareWidth);
   ctx.lineTo(60 + squareWidth , squareWidth + 60);
   ctx.moveTo(30, 150);
   ctx.lineTo(60, 60 + squareWidth);
   ctx.strokeStyle = 'rgba(0,1,0,0.3)';
   ctx.stroke();

}());