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
        var v =[
                [ 1.3, 0.35, -1.35 ],
                [ 0.2, 0.35, 0.2 ],
                [ -1.35, 0.35, 1.25 ],
                [ -0, -0.4, 0 ]
            ];

        return {
            vertices: v,

            indices: Shapes.getIndices(v)
        };
    },
        
    wings: function () {
        var v =[
                [ 1.3, 0.35, -1.35 ],
                [ 0.2, 0.35, 0.2 ],
                [ -1.35, 0.35, 1.25 ],
                [ -0, -0.4, 0 ]
            ];

        return {
            vertices: v,

            indices: Shapes.getIndices(v)
        };
    },
    cabin: function () {
        var v =[
                [ 0.4, 0.4, -0.4 ],
                [ 0.5, 0.4, 0.5 ],
                [ -0.4, 0.4, 0.4 ],
                [ -0, -0.6, 0 ]
            ];

        return {
            vertices: v,

            indices: Shapes.getIndices(v)
        };
    },
    glass: function () {
        var v =[
                [ 0.2, 0.35, -0.2 ],
                [ 0.5, 0.35, 0.5 ],
                [ -0.2, 0.35, 0.2 ],
                [ -0, -0.8, 0 ]
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
    xWing: function () {
        var numberOfSides = 4,
            size = 0.4,
            Xcenter = 0,
            Ycenter = -0.2,
            Zcenter = 0,
            v = [],
            ind = [],
            Yheight = -2,
            childSides = 4,
            childSize = 0.4,
            childXcenter = 0,
            childYcenter = 0.5,
            vChild = [],
            indChild = [],
            childZcenter = 0,
            childYheight = -0.2;

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

    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },



    /*
     * Returns the vertices for pencil body.
     */
    cilinder: function (n,x,y,z) {
        var childSides = n,
            childSize = 0.15,
            childXcenter = x,
            childYcenter = y,
            childZcenter = z,
            vChild = [],
            indChild = [],
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
    },

    /*
     * Another utility function for computing normals, this time just converting
     * every vertex into its unit vector version.  This works mainly for objects
     * that are centered around the origin.
     */
    toVertexNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },
        
    /*
     * Utility function for computing normal vectors based on indexed vertices.
     * The secret: take the cross product of each triangle.  Note that vertex order
     * now matters---the resulting normal faces out from the side of the triangle
     * that "sees" the vertices listed counterclockwise.
     *
     * The vector computations involved here mean that the Vector module must be
     * loaded up for this function to work.
     */
    toNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },
};
