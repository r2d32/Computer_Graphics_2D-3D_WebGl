/*
 * Exercise 26a
 */
(function draw(){
   var ctx = document.getElementById('canvas').getContext('2d');

   //Sword Up 
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(12.5,5);
   ctx.lineTo(17.5,5);
   ctx.lineTo(17.5,-12.5);
   ctx.lineTo(15, -15);
   ctx.lineTo(12.5,-12.5);
   ctx.lineTo(12.5,5);
   ctx.fillStyle = "rgba(148,148,148, 1)";
   ctx.stroke();
   ctx.fill();

   //Sword 45 
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(25,12.5);
            renderingContext.lineTo(37.5,0);
            renderingContext.lineTo(37.5,-5);
            renderingContext.lineTo(35, -5);
            renderingContext.lineTo(20,10);
            renderingContext.lineTo(25,12.5);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            //Handle
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,7.5);
            renderingContext.lineTo(27.5,17.5);
            renderingContext.lineTo(25,15);
            renderingContext.lineTo(22.5, 10);
            renderingContext.lineTo(22.5,7.5);
            renderingContext.fillStyle = "rgba(0,0,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
   
               //Sword flat
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(30,22.5);
            renderingContext.lineTo(47.5,22.5);
            renderingContext.lineTo(50,20);
            renderingContext.lineTo(47.5, 17.5);
            renderingContext.lineTo(30,17.5);
            renderingContext.lineTo(30,22.5);
            renderingContext.fillStyle = "rgba(148,148,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();
            //Handle
            renderingContext.beginPath();  
            renderingContext.strokeStyle = "black";
            renderingContext.lineWidth = 1;
            renderingContext.moveTo(22.5,17.5);
            renderingContext.lineTo(22.5,22.5);
            renderingContext.lineTo(27.5,22.5);
            renderingContext.lineTo(27.5, 25);
            renderingContext.lineTo(30,25);
            renderingContext.lineTo(30,15);
            renderingContext.lineTo(27.5,15);
            renderingContext.lineTo(27.5,17.5);
            renderingContext.lineTo(22.5,17.5);
            renderingContext.fillStyle = "rgba(0,0,148, 1)";
            renderingContext.stroke();
            renderingContext.fill();

   //Hat
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(5,0);
   ctx.lineTo(0, 5);
   ctx.lineTo(0, 10);
   ctx.lineTo(2.5,7.5);
   ctx.lineTo(5, 10);
   ctx.lineTo(5, 10.5);
   ctx.lineTo(7.5, 15);
   ctx.lineTo(12.5, 15);
   ctx.lineTo(17.5, 2.5);
   ctx.lineTo(15, 0);
   ctx.lineTo(5, 0);
   ctx.fillStyle = "rgba(69, 139,0 , 1)";
   ctx.stroke();
   ctx.fill();

   //Face
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(10,5);
   ctx.lineTo(15, 10);
   ctx.lineTo(22.5, 5);
   ctx.lineTo(22.5, 10);
   ctx.lineTo(25,10);
   ctx.lineTo(22.5, 17.5);
   ctx.lineTo(15, 17.5);
   ctx.lineTo(10, 12.5);
   ctx.lineTo(10,5);
   ctx.fillStyle = "rgba(255,211,155, 1)";
   ctx.stroke();
   ctx.fill();
   
   //Eye
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 0;
   ctx.moveTo(20,10);
   ctx.lineTo(18, 10);
   ctx.lineTo(18, 7.5);
   ctx.lineTo(20, 7.5);
   ctx.lineTo(20,10);
   ctx.fillStyle = "rgba(0, 0,0 , 0.8)";
   ctx.stroke();
   ctx.fill();

   //Hair
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(20,0);
   ctx.lineTo(12.5, 7.5);
   ctx.lineTo(15, 10);
   ctx.lineTo(25, 5);
   ctx.lineTo(20,0);
   ctx.fillStyle = "rgba(255, 215, 0 , 1)";
   ctx.stroke();
   ctx.fill();

   //Body
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(22.5,17.5);
   ctx.lineTo(22.5, 25);
   ctx.lineTo(7.5, 25);
   ctx.lineTo(7.5, 17.5);
   ctx.lineTo(22.5, 17.5);
   ctx.fillStyle = "rgba(69, 139,0 , 1)";
   ctx.stroke();
   ctx.fill();

   //Hand
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 1;
   ctx.moveTo(15,17.5);
   ctx.lineTo(15, 22.5);
   ctx.lineTo(17.5, 22.5);
   ctx.lineTo(17.5, 17.7);
   ctx.lineTo(15,17.5);
   ctx.fillStyle = "rgba(255,211,155, 1)";
   ctx.stroke();
   ctx.fill();

   //Shield
   ctx.beginPath();  
   ctx.strokeStyle = "black";
   ctx.lineWidth = 0;
   ctx.moveTo(5,15);
   ctx.lineTo(15, 15);
   ctx.lineTo(15, 22.5);
   ctx.lineTo(10, 25);
   ctx.lineTo(5,22.5);
   ctx.lineTo(5,15);
   ctx.fillStyle = "rgba(148,148,148, 1)";
   ctx.stroke();
   ctx.fill();

   //shoes together 
   ctx.beginPath();  
   ctx.lineWidth = 1;
   ctx.moveTo(12.5, 25);
   ctx.lineTo(20, 25);
   ctx.lineTo(20, 27.5);
   ctx.lineTo(12.5, 27.5);
   ctx.lineTo(12.5, 25);
   ctx.fillStyle = "rgba(0, 0, 0, 1)";
   ctx.stroke();
   ctx.fill();
   ctx.beginPath();  
   ctx.lineWidth = 1;
   ctx.moveTo(10, 25);
   ctx.lineTo(10, 27.5);
   ctx.lineTo(17.5, 27.5);
   ctx.lineTo(17.5, 25);
   ctx.lineTo(10, 25);
   ctx.fillStyle = "rgba(92,51,23,1)";
   ctx.stroke();
   ctx.fill();

   //shoes separated
   ctx.beginPath();  
   ctx.lineWidth = 1;
   ctx.moveTo(15.5, 25);
   ctx.lineTo(23, 25);
   ctx.lineTo(23, 27.5);
   ctx.lineTo(15.5, 27.5);
   ctx.lineTo(15.5, 25);
   ctx.fillStyle = "rgba(0, 0, 0, 1)";
   ctx.stroke();
   ctx.fill();
   ctx.beginPath();  
   ctx.lineWidth = 1;
   ctx.moveTo(7, 25);
   ctx.lineTo(7, 27.5);
   ctx.lineTo(14.5, 27.5);
   ctx.lineTo(14.5, 25);
   ctx.lineTo(7, 25);
   ctx.fillStyle = "rgba(92,51,23,1)";
   ctx.stroke();
   ctx.fill();
 
}());