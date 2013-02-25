/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {
    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    applyFilter: function (imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    },
    //Filter that creates a sepia effect on the image
    sepiaFilter: function (r, g, b, a) {
        r = r * 0.393 + g * 0.769 + b * 0.189;
        g = r * 0.349 + g * 0.686 + b * 0.168;
        b = r * 0.272 + g * 0.534 + b * 0.131;
        return [r, g, b, a];
    },
    //Filter that creates a noise effect on the image
    noiseFilter: function (r, g, b, a) {                    
        r = r + Nanoshop.noise(30);
        g = g + Nanoshop.noise(30);
        b = b + Nanoshop.noise(30);
        return [r, g, b, a];
    },
    // calculate random noise for the filter
    noise: function(noiseValue) {
        return Math.floor((noiseValue >> 1) - (Math.random() * noiseValue));
    },

};