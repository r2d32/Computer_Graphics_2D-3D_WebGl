var drawBasketball = function (renderingContext) {
    renderingContext.save();
    

    renderingContext.beginPath();  
   renderingContext.beginPath();  
   renderingContext.strokeStyle = "black";
   renderingContext.lineWidth = 1;
   renderingContext.lineTo(0, 30);
   renderingContext.lineTo(30, 30);
   renderingContext.lineTo(30, 0);
   renderingContext.lineTo(0, 0);
   renderingContext.lineTo(0, 30);
   renderingContext.fillStyle = "rgba(0, 0, 200, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   
   //shoes
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(-5, 30);
   renderingContext.lineTo(-5, 40);
   renderingContext.lineTo(10, 40);
   renderingContext.lineTo(10, 30);
   renderingContext.lineTo(-5, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
   renderingContext.beginPath();  
   renderingContext.lineWidth = 1;
   renderingContext.moveTo(25, 30);
   renderingContext.lineTo(25, 40);
   renderingContext.lineTo(40, 40);
   renderingContext.lineTo(40, 30);
   renderingContext.lineTo(25, 30);
   renderingContext.fillStyle = "rgba(0, 0, 255, 0.5)";
   renderingContext.stroke();
   renderingContext.fill();
    renderingContext.restore();
};