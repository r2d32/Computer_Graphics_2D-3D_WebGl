/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    // JD: This is an interesting idea, but it will only work under
    //     a very specific assumption---namely, that the given array
    //     of vertices is arranged in such a way that they all form
    //     triangles according to the order listed.
    //
    //     This is not a very general assumption.
    getIndices: function (a) {
        var b =[];
        for (var e = 0; e < a.length; e++){
            if ( e == a.length - 2){
                b[e] = [ e, e+1, 0];
            }else if( e == a.length - 1){
                b[e] = [ e, 0, 1];
            }else{
                b[e] = [ e, e+1, e+2];
            }
            
        }
        return b;
        
    },
    /*
     * Returns the vertices for a small pyramid.
     */
    pyramid: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var v =[
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ];

        return {
            vertices: v,

            // JD: See above: you don't gain much by replacing this
            //     with your getIndices function, especially for a
            //     mesh that is as simple as this.  You capture a
            //     routine as a function when that computation will
            //     see a lot of use in a lot of situations.  That is
            //     simply not the case with general polygon meshes.
            indices: Shapes.getIndices(v)
        };
    },
    /*
     * Returns the vertices for a sphere.
     */
    sphere: function() {
        var i,
            j,
            x,
            y,
            radius = 0.5,
            theta = Math.PI,
            phi = 2 * Math.PI,
            latitude = 20,
            longitude = 20,
            currentLatitude,
            currentLongitude,
            currentVertex,
            currentIndex,
            v= [],
            ind= [];
            



        //Generate the vertices array
        for (i = 0; i < (latitude + 1); i += 1) {
            currentLatitude = i * theta / latitude;
            for (j = 0; j < (longitude + 1); j += 1) {
                currentVertex = latitude * i + j;

                v[currentVertex] = [];
                currentLongitude = j * phi / longitude;

                v[currentVertex][0] = radius * Math.sin(currentLatitude) * Math.cos(currentLongitude);
                v[currentVertex][1] = radius * Math.cos(currentLatitude);
                v[currentVertex][2] = radius * Math.sin(currentLatitude) * Math.sin(currentLongitude);
            }
        }

        // Generate the indices array
        for (x = 0; x < (latitude + 1); x += 1) {
            for (y= 0; y < (longitude + 1); y += 1) {
                currentIndex = 2 * ((latitude + 1) * x + y);

                ind[2 * ((latitude + 1) * x + y)] = [];
                ind[2 * ((latitude + 1) * x + y) + 1] = [];

                ind[currentIndex][0] = longitude * x + y;
                ind[currentIndex][1] = longitude * x + y + 1;
                ind[currentIndex][2] = longitude * (x + 1) + y;
                currentIndex += 1;
                ind[currentIndex][0] = longitude * (x + 1) + y;
                ind[currentIndex][1] = longitude * (x + 1) + y + 1;
                ind[currentIndex][2] = longitude * x + y + 1;
            }
        }

        return {

            vertices: v,

            indices: ind
        };
    },
    
    /*
     * Returns the vertices for pencil tip.
     */
    pencilTip: function () {

        var numberOfSides = 20,
            size = 0.3,
            Xcenter = 0,
            Ycenter = -0.2,
            v = [],
            ind = [],
            Zcenter = 0,
            Yheight = -0.95;
        //This creates the first 6 coordinates of the vertices array that represent an hexagon
        for (var i = 0; i <= numberOfSides;i += 1) {
            // JD: Why is this vertex an array of arrays?
            v[i] =  [[Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) ],[ Ycenter ],
                    [ Zcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) ]];
        }
        //This adds the tip coordinate at the end of the array 
        v[numberOfSides] = [ Xcenter,Yheight,Zcenter ]; 

        // JD: If you think about it, your polygon mesh should have the same
        //     number of triangles as you have sides (your pencil tip is
        //     essentially a hollow cone, as far as I can tell).
        //     This routine produces *twice* that many triangles!
//        for(var e = 0; e < numberOfSides; e++){
//            if(e == numberOfSides - 1 ){
//                ind.push([e,0,1],
//                         [e,0,numberOfSides]);
//            } else if(e == numberOfSides-2){
//                    ind.push([e,e+1,0],
//                             [e,e+1,numberOfSides]);
//            } else{
//                    ind.push([e,e+1,e+2],
//                             [e,e+1,numberOfSides]);
//            }
//        
//        }
        // JD: Compare the array you produce above to this one:
        for (i = 0; i < numberOfSides; i += 1) {
            // JD: One triangle per side.  Note the mod at the end
            //     because the last triangle wraps around to vertex 0.
            ind.push([numberOfSides, i, (i + 1) % numberOfSides]);
        }

        return {

            vertices: v,

            indices: ind
        };
    },
    /*
     * Returns the vertices for pencil body.
     */
    pencilBody: function () {

        var numberOfSides = 20,
            size = 0.3,
            Xcenter = 0,
            Ycenter = 0.75,
            v = [],
            ind = [],
            Zcenter = 0,
            Yheight = -0.2;

        // JD: You had <= below when you really should have done <
        //     (otherwise v[i + numberOfSides] gets overwritten.
        for (var i = 0; i < numberOfSides;i += 1) {
            // JD: Again, I am not clear here.  You are assigning different
            //     elements of the v array with different data types.  The
            //     first line assigns an array of arrays.  The next line
            //     assigns a plain array.  What exactly is your intent here?
            v[i] =  [[Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) ],[ Ycenter ],
                    [ Zcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) ]];

            v[ i + numberOfSides ] = [ v[i][0], Yheight, v[i][2] ];
        }
            // JD: I don't get this.  Why is v[6] so special?
            //     (commenting this out)
//            v[6] = [ v[0][0], Yheight, v[0][2] ];

            
        // JD: Again, think this through.  You are forming a hollow "cylinder"
        //     consisting of numberOfSides rectangles.  There are two triangles
        //     per rectangle.  Thus, your index array should have 2 * numberOfSides
        //     entries.  The code below has many more sides than that!
        //
        //     Have you plotted these vertices on paper and formed triangles from
        //     them?  That is pretty much how you would form the indices array.
//        for (var e = 0; e < v.length; e++){
//
//            if ( e < numberOfSides){
//                if(e == numberOfSides-2){
//                    ind.push([e,e+1,0],
//                             [e, e+numberOfSides, e+numberOfSides+1],
//                             [e, e+1, e+numberOfSides+1]);
//                } else if (e == numberOfSides - 1 ){
//                    ind.push([e,0,1],
//                             [e, e+numberOfSides, numberOfSides],
//                             [e, 0, numberOfSides]);
//                } else{
//                    ind.push([e,e+1,e+2],
//                             [e, e+numberOfSides, e+numberOfSides+1],
//                             [e, e+1, e+numberOfSides+1]);
//                }
//
//            }else{
//                if(e == v.length-2){
//                    ind.push([e,e+1,numberOfSides]);
//                } else if (e == v.length - 1 ){
//                    ind.push([e,numberOfSides,numberOfSides+1]);
//                } else{
//                    ind.push([e,e+1,e+2]);
//                }
//            }
//            
//        }
        
        // JD: One more freebie for you and that's it.  Here is a version
        //     that builds your index array that produces the precise number
        //     of triangles required for the hollow cylinder.  Note how I
        //     even followed the pattern of your vertex generation code
        //     (minus the funky array-of-arrays approach which I still
        //     don't understand).
        for (i = 0; i < numberOfSides; i += 1) {
            // JD: Note this calculation which accounts for the wraparound.
            var nextVertexCenter = (i + 1) % numberOfSides,
                nextVertexHeight = nextVertexCenter + numberOfSides;

            ind.push([i, nextVertexCenter, i + numberOfSides]);
            ind.push([nextVertexCenter, nextVertexHeight, i + numberOfSides]);
        }

        return {

            vertices: v,

            indices: ind
        };
    },
    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
