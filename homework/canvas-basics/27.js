(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');
   var side = 40;
   var canvasWidth = 180;
   var x = 110;
   var y = 130;
   var backX = x + ( side/2 );
   var backY = y - ( side/2 );

   ctx.beginPath();
   ctx.moveTo(x, y);
   ctx.lineTo(x, y + side);
   ctx.lineTo(x+side, y+side);
   ctx.lineTo(x+side,y);
   ctx.lineTo(x,y);
   ctx.lineTo(backX,backY);
   ctx.lineTo(backX+side,backY);
   ctx.lineTo(backX+side,backY+side);
   ctx.lineTo(x+side, y+side);
   ctx.moveTo(backX+side,backY);
   ctx.lineTo(x+side,y);
   ctx.strokeStyle = 'rgb(0,120,0)';
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(x, y + side);
   ctx.lineTo(backX,backY+side);
   ctx.lineTo(backX+side,backY+side);
   ctx.moveTo(backX,backY);
   ctx.lineTo(backX,backY+side);
   ctx.strokeStyle = 'rgba(0,120,0,0.3)';
   ctx.stroke();

}());