/**
 ****************************************************
 * Copyright (c) 2012 Anirudh Joshi <http://anirudhjoshi.com>
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

function Colors(){

	this.distanceRotators = [ 0, 201, 401 ];
	this.colors = [[0,0,0],[0,0,0],[0,0,0]];

	this.white = [0.9642, 1, 0.8249 ];	
	this.L = 75;

	function cielabToRGB( L, ab, white ) {

		x = white[0] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) + ( 1 / 500 ) * ab[0] ) * 255;
		y = white[1] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) ) * 255;
		z = white[2] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) + ( 1 / 200 ) * ab[1] ) * 255;

		return [ x, y, z];
	}

	function inverseCielab( t ) {

		if ( t > ( 6 / 29 ) ){

			return Math.pow( t, 3);

		} else {

			return 3 * Math.pow( 6 / 29, 2 )* ( t - 4 / 29);

		}


	}

	function rotator( a ) {

		if ( a >= 0 && a <= 200 ){

			return [ 200 - (100 + a), 100 ];

		} else if ( a > 200 && a <= 400 ) {

			return [ -100 + (a - 200), 100 - (a - 200) ];

		} else if ( a > 400 && a <= 600 ) {

			return [ 100, -100 + (a - 400) ]

		}

	}	

	this.rotate = function(){

		for ( var i = 0; i < 3; i++ ){

			this.colors[i] = cielabToRGB( this.L, rotator( this.distanceRotators[i]), this.white );

			this.distanceRotators[i]++;

			if ( this.distanceRotators[i] > 600 ) {

				this.distanceRotators[i] = 0;

			}

		}		

	}

}