/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing using a pixel's "neighborhood."
 */
var NanoshopNeighborhood = {
    /*
     * A basic "darkener"---this one does not even use the entire pixel neighborhood;
     * just the exact current pixel like the original Nanoshop.
     */
    darkener: function (rgbaNeighborhood) {
        return [
            rgbaNeighborhood[4].r / 2,
            rgbaNeighborhood[4].g / 2,
            rgbaNeighborhood[4].b / 2,
            rgbaNeighborhood[4].a
        ];
    },
    /*
     * A filter that applies a blued diagonal blur to the image
     */    
    blueDiagonalBlur: function (rgbaNeighborhood) {
        var rTotal = 0,
            gTotal = 0,
            bTotal = 0,
            aTotal = 0,
            i;

        
        for (i = 0; i < 9; i += 1) {
            if ( i == 2 || i == 4 || i==6 ){
                rTotal += rgbaNeighborhood[i].r;
                gTotal += rgbaNeighborhood[i].g;
                bTotal += rgbaNeighborhood[i].b;
                aTotal += rgbaNeighborhood[i].a;
            }
        }
        bTotal = ( bTotal / 3  > 255 ) ? 255 : bTotal;
        return [ (rTotal / 3 )*0.9 , (gTotal / 3) *0.9  , (bTotal / 3) * 5 , aTotal/3];
    },
    /*
     * A basic "posterize filter function"
     */
    posterize: function (rgbaNeighborhood) {
        var numLevels = Math.max(2,Math.min(256, 4));
        var numAreas = 256 / numLevels;
        var numValues = 256 / (numLevels-1);
        var r = numValues * ((rgbaNeighborhood[4].r/ numAreas)>>0);
        var g = numValues * ((rgbaNeighborhood[4].g / numAreas)>>0);
        var b = numValues * ((rgbaNeighborhood[4].b / numAreas)>>0);

        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;

        return [
            r,
            g,
            b,
            rgbaNeighborhood[4].a 
        ];
    },
    /*
     * A basic "averager"---this one returns the average of all the pixels in the
     * given neighborhood.
     */
    averager: function (rgbaNeighborhood) {
        var rTotal = 0,
            gTotal = 0,
            bTotal = 0,
            aTotal = 0,
            i;

        for (i = 0; i < 9; i += 1) {
            rTotal += rgbaNeighborhood[i].r;
            gTotal += rgbaNeighborhood[i].g;
            bTotal += rgbaNeighborhood[i].b;
            aTotal += rgbaNeighborhood[i].a;
        }

        return [ rTotal / 9, gTotal / 9, bTotal / 9, aTotal / 9 ];
    },

    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function ({r, g, b, a}[9]) that returns another
     * color as a 4-element array representing the new RGBA value
     * that should go in the center pixel.
     */
    applyFilter: function (renderingContext, imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var result = renderingContext.createImageData(imageData.width, imageData.height),
            i,
            j,
            max,
            iAbove,
            iBelow,
            pixel,
            pixelColumn,
            firstRow,
            lastRow,
            rowWidth = imageData.width * 4,
            sourceArray = imageData.data,
            destinationArray = result.data,

            // A convenience function for creating an rgba object.
            rgba = function (startIndex) {
                return {
                    r: sourceArray[startIndex],
                    g: sourceArray[startIndex + 1],
                    b: sourceArray[startIndex + 2],
                    a: sourceArray[startIndex + 3]
                };
            };

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            // The 9-color array that we build must factor in image boundaries.
            // If a particular location is out of range, the color supplied is that
            // of the extant pixel that is adjacent to it.
            iAbove = i - rowWidth;
            iBelow = i + rowWidth;
            pixelColumn = i % rowWidth;
            firstRow = sourceArray[iAbove] === undefined;
            lastRow = sourceArray[iBelow] === undefined;

            pixel = filter([
                // The row of pixels above the current one.
                firstRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iAbove - 4) : rgba(iAbove)),

                firstRow ? rgba(i) : rgba(iAbove),

                firstRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iAbove + 4) : rgba(iAbove)),

                // The current row of pixels.
                pixelColumn ? rgba(i - 4) : rgba(i),

                // The center pixel: the filter's returned color goes here
                // (based on the loop, we are at least sure to have this).
                rgba(i),

                (pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i),

                // The row of pixels below the current one.
                lastRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iBelow - 4) : rgba(iBelow)),

                lastRow ? rgba(i) : rgba(iBelow),

                lastRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iBelow + 4) : rgba(iBelow))
            ]);

            // Apply the color that is returned by the filter.
            for (j = 0; j < 4; j += 1) {
                destinationArray[i + j] = pixel[j];
            }
        }

        return result;
    }
};