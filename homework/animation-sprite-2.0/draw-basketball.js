var drawBasketball = function (renderingContext) {
    renderingContext.save();
    

    renderingContext.strokeStyle = "black";
    renderingContext.lineWidth = 1;
    renderingContext.beginPath();
    renderingContext.lineTo(0, 30);
    renderingContext.lineTo(30, 30);
    renderingContext.lineTo(30, 0);
    renderingContext.lineTo(0, 0);
    renderingContext.lineTo(0, 30);
    renderingContext.stroke();
    renderingContext.restore();
};