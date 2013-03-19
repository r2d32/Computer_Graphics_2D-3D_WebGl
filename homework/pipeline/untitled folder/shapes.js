/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small pyramid.
     */
    pyramid: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        

        return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 2 ],
                [ 1, 2, 3 ],
                [ 2, 0, 3 ],
                [ 1, 2, 3 ]
            ]
        };
    },
    /*
     * Returns the vertices for a sphere.
     */
    sphere: function () {
        // These variables are actually "constants" for the sphere.
        var moduloSides= 6,
            moduloNumber = 7,
            moduloSize,
            currentRadious,
            radius,
            distancesToCenter,
            moduloSize,
            Xcenter = 0,
            Ystart = -0,
            v = [],
            i = [],
            Zcenter = 0,
            Ycurrent= Ystart,
            Yheight = -0.75;

        radius = ( Math.abs( Ystart - Yheight ) )/2;
        
        distancesToCenter = [radius* (3/4), radius/2, radius* (1/4),0,radius* (1/4), radius/2, radius* (3/4) ];

        //Upper vertex
        v[0] = [0,Ystart,0];

        //Create all the modulos
        for (var e = 0; e < moduloNumber; e++ ){

            Ycurrent -=  ( 2*radius/ ( moduloNumber +1 )) ;
            currentRadious = Math.sqrt( (radius * radius) - ( distancesToCenter[e] * distancesToCenter[e]) ) ;
            moduloSize = 1.2 *(Math.cos( Math.PI/moduloSides )* currentRadious);

            //Generate coordinates for the inscribed moduli at Ycurrent
            for (var i = 1; i <= moduloSides;i ++) {
                v[i +(e * moduloSides )] =  [[Xcenter + moduloSize * Math.cos(i * 2 * Math.PI / moduloSides) ],[ Ycurrent ],
                        [ Zcenter + moduloSize * Math.sin(i * 2 * Math.PI / moduloSides) ]];
            }
            //Update Y coordinate for next modulo
            console.log('number of vertices' + v.length);

        }
        //Lower vertex
        v[43] = [ 0, Yheight,0 ];



        return {
            vertices: v,

            indices: [
                [ 0,1,0,2,0,3,0,4,0,5,0,6],
                [ 1,2 ,3 ,4 ,5 ,6  ],
                [ 1,7],[7,13],[13,19],[19,25],[25,31],[31,37],
                [ 7,8 ,9 ,10,11,12 ],
                [ 2,8],[8,14],[14,20],[20,26],[26,32],[32,38],
                [ 13,14,15,16,17,18 ],
                [ 3,9],[9,15],[15,21],[21,27],[27,33],[33,39],
                [ 19,20,21,22,23,24 ],
                [ 4,10],[10,16],[16,22],[22,28],[28,34],[34,40],
                [ 25,26,27,28,29,30 ],
                [ 5,11],[11,17],[17,23],[23,29],[29,35],[35,41],
                [ 31,32,33,34,35,36 ],
                [ 6,12],[12,18],[18,24],[24,30],[30,36],[36,42],
                [ 37,38,39,40,41,42 ],
                [ 43,37,43,38,43,39,43,40,43,41,43,42 ]
            ]
        };
    },
    /*
     * Returns the vertices for pencil tip.
     */
    pencilTip: function () {

        var numberOfSides = 6,
            size = 0.3,
            Xcenter = 0,
            Ycenter = -0.2,
            a = [],
            Zcenter = 0,
            Yheight = -0.95;
        //This creates the first 6 coordinates of the vertices array that represent an hexagon
        for (var i = 0; i <= numberOfSides;i += 1) {
            a[i] =  [[Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) ],[ Ycenter ],
                    [ Zcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) ]];
        }
        //This adds the tip coordinate at the end of the array 
        a[numberOfSides] = [ Xcenter,Yheight,Zcenter ]; 

        return {

            vertices: a,

            indices: [
                [ 0, 1, 2, 3, 4, 5, 0 ],
                [6,0],
                [6,1],
                [6,2],
                [6,3],
                [6,4],
                [6,5],
            ]
        };
    },
    /*
     * Returns the vertices for pencil body.
     */
    pencilBody: function () {

        var numberOfSides = 6,
            size = 0.3,
            Xcenter = 0,
            Ycenter = 0.75,
            b = [],
            Zcenter = 0,
            Yheight = -0.2;

        for (var i = 0; i <= numberOfSides;i += 1) {
            b[i] =  [[Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) ],[ Ycenter ],
                    [ Zcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) ]];

            b[ i + numberOfSides ] = [ b[i][0], Yheight, b[i][2] ] 
        }
             b[6] = [ b[0][0], Yheight, b[0][2] ];
        return {

            vertices: b,

            indices: [
                [ 0, 1, 2, 3, 4, 5, 0 ],
                [6, 0],
                [1,7],
                [2,8],
                [3,9],
                [4,10],
                [5,11],
            ]
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
