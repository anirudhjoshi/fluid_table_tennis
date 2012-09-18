// Based on http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
/**
 ****************************************************
 * Copyright (c) 2009 Oliver Hunt <http://nerget.com>
 ****************************************************
 * Copyright (c) 2012 Anirudh Joshi <http://anirudhjoshi.com>
 **************************************************** 
 * Copyright (c) 2008, 2009, Memo Akten, www.memo.tv
 *** The Mega Super Awesome Visuals Company ***
 ****************************************************
 * All rights reserved. 
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

 // Check if we have access to contexts
if ( this.CanvasRenderingContext2D && !CanvasRenderingContext2D.createImageData ) {
    
    // Grabber helper function
    CanvasRenderingContext2D.prototype.createImageData = function ( w, h ) {
        
        return this.getImageData( 0, 0, w, h);
        
    }
    
}

function Fluid(canvas) {
    // Add fields x and s together over dt
    function addFields(x, s, dt) {

        for ( var i = 0; i < size; i++ ) {
            
            x[ i ] += dt * s[ i ];

        }

    } 

    // Fluid bounding function over a field for stability
    function set_bnd(b, x) {


        if ( b === 1 ) {

            for ( var i = 1; i <= width; i++ ) {

                x[ i ] =  x[ i + rowSize ];
                x[ i + ( height + 1 ) * rowSize] = x[ i + height * rowSize ];

            }

            for (var j = 1; i <= height; i++) {

                x[j * rowSize] = -x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] = -x[width + j * rowSize];

            }

        } else if (b === 2) {
            for (var i = 1; i <= width; i++) {
                x[i] = -x[i + rowSize];
                x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
            }

            for (var j = 1; j <= height; j++) {
                x[j * rowSize] =  x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
            }
        } else {
            for (var i = 1; i <= width; i++) {
                x[i] =  x[i + rowSize];
                x[i + (height + 1) * rowSize] = x[i + height * rowSize];
            }

            for (var j = 1; j <= height; j++) {
                x[j * rowSize] =  x[1 + j * rowSize];
                x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
            }
        }

        var maxEdge = (height + 1) * rowSize;

        x[ 0 ]                 = 0.5 * ( x[ 1 ] + x[ rowSize ] );
        x[ maxEdge ]           = 0.5 * (x[1 + maxEdge] + x[height * rowSize]);
        x[ ( width + 1 ) ]         = 0.5 * (x[width] + x[(width + 1) + rowSize]);
        x[ ( width + 1) + maxEdge ] = 0.5 * (x[width + maxEdge] + x[(width + 1) + height * rowSize]);

    }

    // This combines neighbour velocities onto selected cell
    function lin_solve(b, x, x0, a, c) {

        if (a === 0 && c === 1) {

            for (var j=1 ; j<=height; j++) {

                var currentRow = j * rowSize;

                ++currentRow;

                for ( var i = 0; i < width; i++ ) {

                    x[currentRow] = x0[currentRow];
                    ++currentRow;

                }

            }

            set_bnd(b, x);

        } else {

            var invC = 1 / c;

            for (var k=0 ; k<iterations; k++) {

                for (var j=1 ; j<=height; j++) {

                    var lastRow = (j - 1) * rowSize;
                    var currentRow = j * rowSize;
                    var nextRow = (j + 1) * rowSize;
                    var lastX = x[currentRow];

                    ++currentRow;

                    for (var i=1; i<=width; i++)

                        lastX = x[currentRow] = (x0[currentRow] + a*(lastX+x[++currentRow]+x[++lastRow]+x[++nextRow])) * invC;

                }

                set_bnd(b, x);

            }

        }

    }

    var fadeSpeed = 0.01;
    var holdAmount = 1 - fadeSpeed;

    // Fades out velocities/densities to stop full stability
    // MSAFluidSolver2d.java
    function fade( x ) {

        for (var i = 0; i < size; i++) {

            // fade out
            x[i] *= holdAmount;

        }

        return;
    }    

    // Iterates over the entire array - diffusing dye density
    function diffuse(b, x, x0, dt) {

        var a = 0;
        lin_solve(b, x, x0, a, 1 + 4*a);

    }
    
    function lin_solve2(x, x0, y, y0, a, c)
    {
        if (a === 0 && c === 1) {
            for (var j=1 ; j <= height; j++) {
                var currentRow = j * rowSize;
                ++currentRow;
                for (var i = 0; i < width; i++) {
                    x[currentRow] = x0[currentRow];
                    y[currentRow] = y0[currentRow];
                    ++currentRow;
                }
            }
            set_bnd(1, x);
            set_bnd(2, y);
        } else {
            var invC = 1/c;
            for (var k=0 ; k<iterations; k++) {
                for (var j=1 ; j <= height; j++) {
                    var lastRow = (j - 1) * rowSize;
                    var currentRow = j * rowSize;
                    var nextRow = (j + 1) * rowSize;
                    var lastX = x[currentRow];
                    var lastY = y[currentRow];
                    ++currentRow;
                    for (var i = 1; i <= width; i++) {
                        lastX = x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
                        lastY = y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
                    }
                }
                set_bnd(1, x);
                set_bnd(2, y);
            }
        }
    }
    
    function diffuse2(x, x0, y, y0, dt)
    {
        var a = 0;
        lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
    }
    
    function advect(b, d, d0, u, v, dt)
    {
        var Wdt0 = dt * width;
        var Hdt0 = dt * height;
        var Wp5 = width + 0.5;
        var Hp5 = height + 0.5;
        for (var j = 1; j<= height; j++) {
            var pos = j * rowSize;
            for (var i = 1; i <= width; i++) {
                var x = i - Wdt0 * u[++pos]; 
                var y = j - Hdt0 * v[pos];
                if (x < 0.5)
                    x = 0.5;
                else if (x > Wp5)
                    x = Wp5;
                var i0 = x | 0;
                var i1 = i0 + 1;
                if (y < 0.5)
                    y = 0.5;
                else if (y > Hp5)
                    y = Hp5;
                var j0 = y | 0;
                var j1 = j0 + 1;
                var s1 = x - i0;
                var s0 = 1 - s1;
                var t1 = y - j0;
                var t0 = 1 - t1;
                var row1 = j0 * rowSize;
                var row2 = j1 * rowSize;
                d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
            }
        }
        set_bnd(b, d);
    }
    
    function project(u, v, p, div)
    {
        var h = -0.5 / Math.sqrt(width * height);
        for (var j = 1 ; j <= height; j++ ) {
            var row = j * rowSize;
            var previousRow = (j - 1) * rowSize;
            var prevValue = row - 1;
            var currentRow = row;
            var nextValue = row + 1;
            var nextRow = (j + 1) * rowSize;
            for (var i = 1; i <= width; i++ ) {
                div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
                p[currentRow] = 0;
            }
        }
        set_bnd(0, div);
        set_bnd(0, p);
        
        lin_solve(0, p, div, 1, 4 );
        var wScale = 0.5 * width;
        var hScale = 0.5 * height;
        for (var j = 1; j<= height; j++ ) {
            var prevPos = j * rowSize - 1;
            var currentPos = j * rowSize;
            var nextPos = j * rowSize + 1;
            var prevRow = (j - 1) * rowSize;
            var currentRow = j * rowSize;
            var nextRow = (j + 1) * rowSize;

            for (var i = 1; i<= width; i++) {
                u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
                v[currentPos]   -= hScale * (p[++nextRow] - p[++prevRow]);
            }
        }
        set_bnd(1, u);
        set_bnd(2, v);
    }
    
    // Move forward in density
    function dens_step(r_prev, g_prev, bl_prev, u_prev, v_prev, r, g, bl, u, v, dt ) {

        // Stop filling stability
        fade( r );
        fade( g );
        fade( bl );

        // fade( u );
        // fade( v );        

        // Combine old and new fields into the new field
        addFields( r, r_prev, dt);
        addFields( g, g_prev, dt);
        addFields( bl, bl_prev, dt);

        // Diffuse over old and new new field
        diffuse(0, r_prev, r, dt );
        diffuse(0, g_prev, g, dt );
        diffuse(0, bl_prev, bl, dt );

        // Combine vectors into a forward vector model
        advect(0, r, r_prev, u, v, dt );
        advect(0, g, g_prev, u, v, dt );
        advect(0, bl, bl_prev, u, v, dt );

    }
    
    // Move vector fields (u,v) forward over dt
    function vel_step(u, v, u0, v0, dt) {

        addFields(u, u0, dt );
        addFields(v, v0, dt );
        
        var temp = u0; u0 = u; u = temp;
        var temp = v0; v0 = v; v = temp;
        
        diffuse2(u,u0,v,v0, dt);
        project(u, v, u0, v0);
        
        var temp = u0; u0 = u; u = temp; 
        var temp = v0; v0 = v; v = temp;
        
        advect(1, u, u0, u0, v0, dt);
        advect(2, v, v0, u0, v0, dt);
        
        project(u, v, u0, v0 );

    }

    var uiCallback = function( r, g, bl, u, v ) {};

    function Field(r, g, bl, u, v) {

        // Just exposing the fields here rather than using accessors is a measurable win during display (maybe 5%)
        // but makes the code ugly.

        this.setDensityRGB = function(x, y, d) {

             r[(x + 1) + (y + 1) * rowSize] = d[0];
             g[(x + 1) + (y + 1) * rowSize] = d[1];
             bl[(x + 1) + (y + 1) * rowSize] = d[2];

             return;

        }

        this.getDensityRGB = function(x, y) {

             var r_dens = r[(x + 1) + (y + 1) * rowSize];
             var g_dens = g[(x + 1) + (y + 1) * rowSize];
             var bl_dens = bl[(x + 1) + (y + 1) * rowSize];

             return [ r_dens, g_dens, bl_dens ];

        }        

        this.setVelocity = function(x, y, xv, yv) {

             u[(x + 1) + (y + 1) * rowSize] = xv;
             v[(x + 1) + (y + 1) * rowSize] = yv;

             return;

        }

        //MSAFluidSolver2d.java
        this.setVelocityInterp = function( x, y, vx, vy ) {

            var colSize = rowSize;

            rI = x + 2;
            rJ = y + 2;

            i1 = (x + 2);
            i2 = (rI - i1 < 0) ? (x + 3) : (x + 1);

            j1 = (y + 2);
            j2 = (rJ - j1 < 0) ? (y  + 3) : (y + 1);
            
            diffx = (1-(rI-i1));
            diffy = (1-(rJ-j1));
            
            vx1 = vx * diffx*diffy;
            vy1 = vy * diffy*diffx;
            
            vx2 = vx * (1-diffx)*diffy;
            vy2 = vy * diffy*(1-diffx);
            
            vx3 = vx * diffx*(1-diffy);
            vy3 = vy * (1-diffy)*diffx;
            
            vx4 = vx * (1-diffx)*(1-diffy);
            vy4 = vy * (1-diffy)*(1-diffx);
            
            if(i1<2 || i1>rowSize-1 || j1<2 || j1>colSize-1) return;

            this.setVelocity(i1, j1, vx1, vy1);
            this.setVelocity(i2, j1, vx2, vy2);
            this.setVelocity(i1, j2, vx3, vy3);
            this.setVelocity(i2, j2, vx4, vy4);

            return;

        }         


        this.getXVelocity = function(x, y) {

             var x_vel = u[(x + 1) + (y + 1) * rowSize];

             return x_vel;

        }
        
        this.getYVelocity = function(x, y) {

             var y_vel = v[(x + 1) + (y + 1) * rowSize];

             return y_vel;

        }

        this.width = function() { return width; }
        this.height = function() { return height; }

    }

    function queryUI( r, g, bl, u, v ) {

        for ( var i = 0; i < size; i++ )

            r[ i ] = g[i] = bl[i] = 0.0;

        // u[ i ] = v[ i ] = - figure out better way!

        uiCallback( new Field( r, g, bl, u, v ) );

    }

    // Push simulation forward one step
    this.update = function () {

        queryUI(r_prev, g_prev, bl_prev, u_prev, v_prev);

        // Move vector fields forward
        vel_step(u, v, u_prev, v_prev, dt);

        // Move dye intensity forward
        // dens_step(dens, dens_prev, u, v, dt);
        if ( u_prev )
            dens_step(r_prev, g_prev, bl_prev, u_prev, v_prev, r, g, bl, u, v, dt );

        // Display/Return new density and vector fields
        displayFunc( new Field(r, g, bl, u, v) );

    }

    this.setDisplayFunction = function( func ) {

        displayFunc = func;

    }
    
    // More iterations = much slower simulation (10 is good default)
    this.iterations = function() { return iterations; }

    // Iteration setter and capper
    this.setIterations = function( iters ) {

        if ( iters > 0 && iters <= 100 )

           iterations = iters;

    }

    this.setUICallback = function( callback ) {
        
        uiCallback = callback;

    }

    var iterations = 10;

    var visc = 0.5;
    var dt = 0.1;

    var r;
    var r_prev;

    var g;
    var g_prev;

    var bl;
    var bl_prev;    

    var u;
    var u_prev;

    var v;
    var v_prev;

    var width;
    var height;

    var rowSize;
    var size;

    var displayFunc;

    function reset() {

        rowSize = width + 2;
        size = (width+2)*(height+2);

        r = new Array(size);
        r_prev = new Array(size);        

        g = new Array(size);
        g_prev = new Array(size);        

        bl = new Array(size);
        bl_prev = new Array(size);                

        u = new Array(size);
        u_prev = new Array(size);

        v = new Array(size);
        v_prev = new Array(size);

        for (var i = 0; i < size; i++) {

            u_prev[i] = v_prev[i] = u[i] = v[i] = 0;
            r[i] = g[i] = bl[i] = r_prev[i] = g_prev[i] = bl_prev[i] = 0;

        }

    }

    this.reset = reset;

    this.fieldRes = 96;

    // Resolution bounder and resetter
    this.setResolution = function ( hRes, wRes ) {

        var res = wRes * hRes;

        this.fieldRes = hRes;

        if (res > 0 && res < 1000000 && (wRes != width || hRes != height)) {

            width = wRes;
            height = hRes;

            reset();

            return true;

        }
        
        return false;
    }


    // Store the alpha blending data in a unsigned array
    var buffer;
    var bufferData;
    var clampData = false;
    
    var canvas = document.getElementById("canvas");;
    
    // First run to generate alpha blending array
    function prepareBuffer(field) {
        
        // Check bounds/existance between blending data and simulation field
        if ( buffer && buffer.width == field.width() && buffer.height == field.height() )
        
            return;
        
        // Else create buffer array    
        buffer = document.createElement("canvas");
        buffer.width = field.width();
        buffer.height = field.height();
        
        var context = buffer.getContext("2d");
        
        try {
            
            // Try to fill up using helper function
            bufferData = context.createImageData( field.width(), field.height() );
            
        } catch(e) {
            
            return null;
            
        }
        
        // Return for non-existant canvas
        if (!bufferData)
        
            return null;
            
        // Generate over square buffer array (r,b,g,a)
        var max = field.width() * field.height() * 4;

        for ( var i = 3; i < max; i += 4 )
            
            // Set all alpha values to maximium opacity
            bufferData.data[i] = 255;
            
        bufferData.data[0] = 256;
        
        if (bufferData.data[0] > 255)
        
            clampData = true;
            
        bufferData.data[0] = 0;
        


    }

    function displayDensity(field) {
        
        var context = canvas.getContext("2d");
        var width = field.width();
        var height = field.height();
        
        // Continously buffer data to reduce computation overhead
        prepareBuffer(field);        

        if ( pong.display ){
        
            if ( pong.ball.x < width && pong.ball.x > 0 && pong.ball.y > 0 && pong.ball.y < height ){
        
                pong.ball.vy += field.getYVelocity(Math.round( pong.ball.x ), Math.round( pong.ball.y ) ) / 4;
                pong.ball.vx += field.getXVelocity(Math.round( pong.ball.x ), Math.round( pong.ball.y ) ) / 6;
                
            }
            
        }

        if (bufferData) {
            
            // Decouple from pixels to reduce overhead
            var data = bufferData.data;

            var dlength = data.length;
            var j = -3;
            
            if ( clampData ) {
                
                for ( var x = 0; x < width; x++ ) {
                    
                    for ( var y = 0; y < height; y++ ) {
                        
                        var d = field.getDensity(x, y) * 255 / 5;
                        
                        d = d | 0;
                        
                        if ( d > 255 )
                        
                            d = 255;
                            
                        data[ 4 * ( y * height + x ) + 1] = d;
                        
                    }
                    
                }
                
            } else {
                // console.log( field.getDensity(1, 1) );

                for ( var x = 0; x < width; x++ ) {


                    for ( var y = 0; y < height; y++ ) {

                        var index = 4 * (y * height +  x);                        
                        var RGB = field.getDensityRGB(x, y);     

                        data[ index + 0] = Math.round( RGB[0] * 255 / 5 );
                        data[ index + 1] = Math.round( RGB[1] * 255 / 5 );
                        data[ index + 2] = Math.round( RGB[2] * 255 / 5 );

                    }
                        
                }
                
            }

            context.putImageData(bufferData, 0, 0);
            
        } else {
            
            for ( var x = 0; x < width; x++ ) {
                
                for ( var y = 0; y < height; y++ ) {
                    
                    var d = field.getDensity(x, y) / 5;
                    
                    context.setFillColor(0, d, 0, 1);
                    context.fillRect(x, y, 1, 1);
                    
                }
                
            }
            
        }
        
    }
    
    function displayVelocity( field ) {
        
        var context = canvas.getContext("2d");
        
        context.save();
        context.lineWidth = 1;
        
        var wScale = canvas.width / field.width();
        var hScale = canvas.height / field.height();
        
        context.fillStyle="black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "rgb(0,255,0)";
        
        var vectorScale = 10;
        
        context.beginPath();
        
        for (var x = 0; x < field.width(); x++) {
            
            for (var y = 0; y < field.height(); y++) {
                
                context.moveTo(x * wScale + 0.5 * wScale, y * hScale + 0.5 * hScale);
                context.lineTo((x + 0.5 + vectorScale * field.getXVelocity(x, y)) * wScale, 
                               (y + 0.5 + vectorScale * field.getYVelocity(x, y)) * hScale);
                               
            }
            
        }
        
        context.stroke();
        context.restore();
        
    }
    
    this.toggleDisplayFunction = function( canvas, showVectors ) {

        if (showVectors) {
            
            showVectors = false;
            canvas.width = displaySize;
            canvas.height = displaySize;
            
            return displayVelocity;
            
        }
        
        showVectors = true;
        
        canvas.width = this.fieldRes;
        canvas.height = this.fieldRes;
        
        return displayDensity;
        
    }

}