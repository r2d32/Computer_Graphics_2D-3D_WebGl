/*
 * Exercise 28e
 */
(function draw(){
   
   var ctx = document.getElementById('canvas').getContext('2d');
   ctx.beginPath();
   var canvasW= 480;
   var canvasH = 300;
   ctx.fillStyle = 'rgb(0,0,128)'//sky
   ctx.fillRect(0,0,canvasW,canvasH)
   
   //buildings
   for (var i=0;i<canvasW;){ 
      ctx.fillStyle = 'rgb(0,0,0)'
      var x = i; 
      var rand = Math.floor((Math.random()*4)+0);
      var arr1 = [60,40,80,100];
      // JD: ^^^^^ Argh...these are the *worst* possible variable
      //     names that you could have picked.  No need to use "arr"
      //     because I know that it is an array.  And, the number
      //     suffix means nothing to me. (plus, chances are that
      //     they will mean nothing to you either, if you come back
      //     and re-read this code after a few weeks!)
      var width = arr1[rand];
      var rand2 = Math.floor((Math.random()*25)+0);
      var arr2 = [30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270];
      var height = arr2[rand2];
      i += arr1[rand]; // JD: This belongs in the for loop statement!
      ctx.fillRect(x,height,width,canvasH);

      //windows
      ctx.fillStyle = 'rgb(255,255,0)'
      for (var e = height; e < 300;){
         for (var t = x ; t < (width + x);){
            var windowX = t + 4;
            var windowY = e + 4;
            var rand3 = Math.floor((Math.random()*5)+0);
            var arr3 = [8,10,12,0,0];
            var rand4 = Math.floor((Math.random()*6)+0);
            var arr4 = [14,16,18,20,24,0];
            var windowWidth = arr3[rand3];
            var windowHeight = arr4[rand4];
            ctx.fillRect(windowX,windowY,windowWidth,windowHeight);
            t += 20; // JD: Yet again!
         }
         e += 30; // JD: And again---it looks like you have forgotten
                  //     how to declare for loops...
      }
      
   }
}());