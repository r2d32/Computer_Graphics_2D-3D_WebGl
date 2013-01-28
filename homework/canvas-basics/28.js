(function draw(){
   
   var ctx = document.getElementById('canvas').getContext('2d');

   //var radgrad = ctx.createRadialGradient(150,240,3,150,240,10);
   //radgrad.addColorStop(0, "rgba(0,0,0,0.0)");
   //radgrad.addColorStop(0.8, "rgba(255,255,125,0.3)");
   var radgrad = ctx.createRadialGradient(240,150,40,240,150,180);
  radgrad.addColorStop(0, 'rgba(255,255,125,1)');
  radgrad.addColorStop(0.9, 'rgba(255,255,125,0.06)');
  radgrad.addColorStop(1, 'rgba(255,255,125,0.0)');
   
 
   
  var radgrad3 = ctx.createRadialGradient(240,150,40,240,150,180);
  radgrad3.addColorStop(0, 'rgba(255,255,125,1)'); 
  radgrad3.addColorStop(0.3, 'rgba(205,92,92,0.7)');
  radgrad3.addColorStop(0.7, 'rgba(255,192,203,0.3)');
  radgrad3.addColorStop(1, 'rgba(205,92,92,0.0)');

   var lingrad = ctx.createLinearGradient(0,0,0,150);
   lingrad.addColorStop(0, 'rgb(30,144,255)');
   lingrad.addColorStop(1, 'rgb(205,92,92)');

   ctx.beginPath();
   ctx.fillStyle = lingrad;//'rgb(30,144,255)';//sky
   ctx.fillRect(0,0,480,185)
   ctx.fillStyle = radgrad;
   ctx.fillRect(0,0,480,185)
   ctx.arc(240,150,60,0,Math.PI*2,true);//sun
   ctx.fillStyle = 'rgb(255,255,125)';
   ctx.strokeStyle = 'rgba(255,255,255,0.5)';
   ctx.fill();
   ctx.stroke();
   

   ctx.fillStyle = 'rgb(0,0,128)';//ocean
   ctx.fillRect(0,185,480,116)

  ctx.fillStyle = radgrad3;//ocean
   ctx.fillRect(0,185,480,116)

}());