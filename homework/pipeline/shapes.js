/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {

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

        var numberOfSides = 4,
            size = 0.3,
            Xcenter = 0,
            Ycenter = -0.2,
            v = [],
            ind = [],
            Zcenter = 0,
            Yheight = -2,
            childSides = 4,
            childSize = 0.3,
            childXcenter = 0,
            childYcenter = 0.5,
            vChild = [],
            indChild = [],
            childZcenter = 0,
            childYheight = -0.2;
        //This creates the first 6 coordinates of the vertices array that represent an hexagon
        for (var i = 0; i <= numberOfSides;i += 1) {
          
            v[i] =  [Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) ,Ycenter ,
                     Zcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) ];
        }
        //This adds the tip coordinate at the end of the array 
        v[numberOfSides] = [ Xcenter,Yheight,Zcenter ]; 

        for (i = 0; i < numberOfSides; i += 1) {

            ind.push([numberOfSides, i, (i + 1) % numberOfSides]);
        }

        //Create Child
        for (var i = 0; i < childSides;i += 1) {
 
            vChild[i] =  [childXcenter + childSize * Math.cos(i * 2 * Math.PI / childSides) , childYcenter ,
                     childZcenter + childSize * Math.sin(i * 2 * Math.PI / childSides) ];

            vChild[ i + childSides ] = [ vChild[i][0], childYheight, vChild[i][2] ];
        }

        for (i = 0; i < childSides; i += 1) {
            // Note this calculation which accounts for the wraparound.
            var nextVertexCenter = (i + 1) % childSides,
                nextVertexHeight = nextVertexCenter + childSides;

            indChild.push([i, nextVertexCenter, i + childSides]);
            indChild.push([nextVertexCenter, nextVertexHeight, i + childSides]);
        }
        var child = {
            vertices: vChild,
            indices: indChild
        };

        return {

            vertices: v,

            indices: ind,
            
            childStructure: child,
            
        };
    },
    /*
     * Returns the vertices for pencil body.
     */
    cilinder: function (n) {

        var childSides = n,
            childSize = 0.3,
            childXcenter = 0,
            childYcenter = 0.75,
            vChild = [],
            indChild = [],
            childZcenter = 0,
            childYheight = -0.2;

        for (var i = 0; i < childSides;i += 1) {
 
            vChild[i] =  [childXcenter + childSize * Math.cos(i * 2 * Math.PI / childSides) , childYcenter ,
                     childZcenter + childSize * Math.sin(i * 2 * Math.PI / childSides) ];

            vChild[ i + childSides ] = [ vChild[i][0], childYheight, vChild[i][2] ];
        }

        for (i = 0; i < childSides; i += 1) {
            // Note this calculation which accounts for the wraparound.
            var nextVertexCenter = (i + 1) % childSides,
                nextVertexHeight = nextVertexCenter + childSides;

            indChild.push([i, nextVertexCenter, i + childSides]);
            indChild.push([nextVertexCenter, nextVertexHeight, i + childSides]);
        }

        return {

            vertices: vChild,

            indices: indChild
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
