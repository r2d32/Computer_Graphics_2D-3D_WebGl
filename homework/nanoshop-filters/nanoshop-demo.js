/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {

    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    // Adapted from original code by Tyler Nichols.
    gradient = renderingContext.createRadialGradient(120, 120, 15, 120, 120, 75);
    gradient.addColorStop(0, "rgb(255, 102, 102)");
    gradient.addColorStop(1, "red");

    // Draw the sphere with a radial gradient.
    renderingContext.beginPath();
    renderingContext.fillStyle = gradient;
    renderingContext.arc(150, 150, 75, 0, 2 * Math.PI, true);
    renderingContext.shadowColor = "gray";
    renderingContext.shadowBlur = 20;
    renderingContext.shadowOffsetX = 10;
    renderingContext.shadowOffsetY = 15;
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the top of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(140, 140, 140)";
    renderingContext.moveTo(300, 300);
    renderingContext.lineTo(335, 265);
    renderingContext.lineTo(435, 265);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(300, 300);
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the face of the cube.
    renderingContext.fillStyle = "rgb(110, 110, 110)";
    renderingContext.fillRect(300, 300, 100, 100);

    // Draw the right side of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(79, 79, 79)";
    renderingContext.moveTo(435, 265);
    renderingContext.lineTo(435, 355);
    renderingContext.lineTo(400, 400);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(435, 265);
    renderingContext.fill();
    renderingContext.closePath();
    // Event handler to apply the sepia filter.
    $("#apply-sepiaFilter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                function (r, g, b, a) {
                    r = r * 0.393 + g * 0.769 + b * 0.189;
                    g = r * 0.349 + g * 0.686 + b * 0.168;
                    b = r * 0.272 + g * 0.534 + b * 0.131;
                    return [r, g, b, a];
                }
            ),
            0, 0
        );
    });


    //Event handler to apply the noise filter.
    $("#apply-noiseFilter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                function (r, g, b, a) {                    
                    r = r + noise(30);
                    g = g + noise(30);
                    b = b + noise(30);
                    return [r, g, b, a];
                }
            ),
            0, 0
        );
    });
    // calculate random noise
    function noise(noiseValue) {
        return Math.floor((noiseValue >> 1) - (Math.random() * noiseValue));
    }
}());