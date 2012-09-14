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

// better control method?
function Pong(canvas) {

	"use strict";

	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');

	this.theta = 0;
	this.speed_increase = 0.7;
	this.speed = 1;

	this.display = true;

	var player = function () {

		this.life = 5;
		this.push = true;
		this.suck = false;
		this.stream = [ 0, 0, 0];
		this.multiplayer = false;
		this.x  = 0;
		this.y  = 0;
		this.width  = 0;
		this.height  = 0;
		this.color  = "red";
		this.vx  = 0;
		this.vy  = 0;
		this.ax  = 0;
		this.ay  = 0;
		this.xo  = 0;
		this.yo  = 0;
		this.out  = false;
		this.radius = 0;
		this.speed = 1

	};

	this.ball = new player();
	this.ai = new player();
	this.player = new player();

	this.updatePlayer = function () {

		this.player.vy += this.player.ay;					

		if (this.keyMap.up.on) {
			this.player.ay = -this.speed_increase;
			if (this.player.vy < -this.speed) {
				this.player.vy = -this.speed;
			}
		}
		if (this.keyMap.right.on) {
			this.player.push = true;
		} else {
			this.player.push = false;
		}
		if (this.keyMap.left.on) {
			this.player.suck = true;
		} else {
			this.player.suck = false;
		}	
		if (this.keyMap.down.on) {
			this.player.ay = this.speed_increase;
			
			if (this.player.vy > this.speed) {
				this.player.vy = this.speed;
				
			}

		}
		
		if ( ( !(this.keyMap.down.on) && !(this.keyMap.up.on) ) || (this.keyMap.down.on && this.keyMap.up.on) ) {
			
			this.player.ay = 0;
			this.player.vy = 0;
		
		}
		
		if ( ( this.player.y < 0 && this.player.vy < 0 ) || ( this.player.y + this.player.height > this.ctx.canvas.height && this.player.vy > 0 ) ) {
			
			this.player.ay = 0;
			this.player.vy = 0;
			
		}

		
		this.player.y += this.player.vy;    

	};

	this.updateAi = function () {

		var real_y_pos = 0;

		if ( this.ai.multiplayer ) {

			this.ai.vy += this.ai.ay;     

			if ( this.keyMap.up2.on ) {
			
				this.ai.ay = -this.speed_increase;
				
				if ( this.ai.vy < -this.speed ) {
					
					this.ai.vy = -this.speed;
					
				}
				
			}                    
			
			if ( this.keyMap.left2.on ) {
			
				this.ai.push = true;

				
			} else {
				
				this.ai.push = false;
				
			}
			
			if ( this.keyMap.right2.on ) {
			
				this.ai.suck = true;

				
			} else {
				
				this.ai.suck = false;
				
			}	
			
			if ( this.keyMap.down2.on ) {
			
				this.ai.ay = this.speed_increase;
				
				if ( this.ai.vy > this.speed ) {
					
					this.ai.vy = this.speed;
					
				}

			}
			
			if ( ( !(this.keyMap.down2.on) && !(this.keyMap.up2.on) ) || (this.keyMap.down2.on && this.keyMap.up2.on) ) {
				
				this.ai.ay = 0;
				this.ai.vy = 0;
			
			}
			
			if ( ( this.ai.y < 0 && this.ai.vy < 0 ) || ( this.ai.y + this.ai.height > this.ctx.canvas.height && this.ai.vy > 0 ) ) {
				
				this.ai.ay = 0;
				this.ai.vy = 0;
				
			}
			
			this.ai.y += this.ai.vy;    


		} else {

			// calculate the middle of the paddle 
			real_y_pos = this.ai.y + (this.ai.height / 2); 

			/* If the this.ball is moving in opposite direction to the paddle and is no danger for computer's goal move paddle back to the middle y - position*/ 
			if ( this.ball.vx < 0 ) {

				// if the paddle's position is over the middle y - position 
				if ( real_y_pos < this.ctx.canvas.height / 2 - this.ctx.canvas.height / 10 ) {
				
					this.ai.y  += this.speed; 
					
				} 

				// Paddle is under the middle y - position 
				else if (   real_y_pos > this.ctx.canvas.height / 2 + this.ctx.canvas.height / 10  ) {
				
					this.ai.y  -= this.speed; 
					
				}
				
			} 
			// this.ball is moving towards paddle 
			else if ( this.ball.vx > 0 ) {

				// As long as this.ball's y - position and paddle's y - position are different 
				if (  Math.abs(this.ball.y - real_y_pos ) > 2 ) {
				
					// If this.ball's position smaller than paddle's, move up 
					if (this.ball.y < real_y_pos) {
					
						this.ai.y -= this.speed/1.2; 
						
					} 
					
					// If this.ball's position greater than padle's, move down 
					else if ( this.ball.y > real_y_pos ) {
					
						this.ai.y  += this.speed/1.2; 
					 
					}
				
				}

			}
		}

	};

	this.updateBall = function (){

		if ( ( Math.abs( this.ball.x - this.player.x ) < Math.abs( this.ball.vx ) && this.player.y < this.ball.y + 0.1 * this.player.height && this.ball.y < this.player.y + 1.1 * this.player.height ) ) {
			this.theta = ((this.player.y + this.player.height/2) - this.ball.y ) / ( this.player.height  /  2 );
			this.ball.vx = this.ball.speed * Math.cos(this.theta);
			this.ball.vy = -this.ball.speed * Math.sin(this.theta);

		}
		
		if ( ( Math.abs(this.ball.x - this.ai.x) < Math.abs( this.ball.vx ) && this.ai.y < this.ball.y + this.ai.height && this.ball.y < this.ai.y + this.ai.height ) ) {

			this.theta = ((this.ai.y + this.ai.height/2) - this.ball.y ) / ( this.ai.height  /  2 );
			this.ball.vx = -this.ball.speed * Math.cos(this.theta);
			this.ball.vy = -this.ball.speed * Math.sin(this.theta);
		}

		// y
		if ( ( this.ball.y + this.ball.vy < 0 && this.ball.vy < 0 ) || ( this.ball.y + this.ball.radius + this.ball.vy > this.ctx.canvas.height && this.ball.vy > 0 ) ) {
			
			this.ball.vy = -this.ball.vy;

		}

		// x
		// + this.ball.radius
		if ( ( this.ball.x < 0 && this.ball.vx < 0 ) || ( this.ball.x > this.ctx.canvas.width && this.ball.vx > 0 ) ) {

			if ( this.ball.x < 0) {

				this.player.life -= 1;

			}

			if ( this.ball.x > this.ctx.canvas.width){

				this.ai.life -= 1;

			}

			this.ball.xo = this.ball.x;
			this.ball.yo = this.ball.y;

			this.ball.out = true;

			this.ball.x = ( this.ctx.canvas.width - this.ball.radius ) / 2;
			this.ball.y = this.ctx.canvas.height / 2;
			
			this.theta = Math.random() * 2*Math.PI;

			if (this.theta > Math.PI/4 && this.theta < 3* Math.PI/4) {

				this.theta = Math.round(Math.random()) === 1 ? Math.PI/4 : 3 * Math.PI/4;

			}

			if (this.theta > Math.PI + Math.PI/4 && this.theta < 3* Math.PI/4 + Math.PI) {

				this.theta = Math.round(Math.random()) === 1 ? Math.PI/4 + Math.PI : 3 * Math.PI/4 + Math.PI;

			}

			this.ball.vx = this.ball.speed * Math.cos(this.theta);
			this.ball.vy = this.ball.speed * Math.sin(this.theta);
			
			if ( Math.round( Math.random() ) === 1 ) {
			
				this.ball.vy = -this.ball.vy;
			
			}
			
		}		

		// this.ball.vx += this.ball.ax;
		this.ball.x += this.ball.vx;

		// this.ball.vy += this.ball.ay;   
		this.ball.y += this.ball.vy; 

	};

	this.distance = function ( player1, player2 ) {

		return Math.sqrt( Math.pow(player2.x - player1.x, 2) + Math.pow( player2.y - player1.y, 2) );

	};

	this.update = function(){

		if ( this.display ){

			this.updatePlayer();
			this.updateAi();
			this.updateBall();			

		} else {

			this.player.push = true;
			this.ai.push = true;

		}

	};

	this.clear = function () {

		// attribute - stack overflow answer
		// Store the current transformation matrix
		this.ctx.save();

		// Use the identity matrix while clearing the canvas
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		// Restore the transform
		this.ctx.restore();


	};

	this.drawRectangle = function( x, y, width, height, color ) {

		if (color instanceof Array) {

			this.ctx.fillStyle = "rgb(" + Math.floor( color[0] ) + "," + Math.floor( color[1] ) + "," + Math.floor( color[2] ) + ")";

		} else {

			this.ctx.fillStyle = color;

		}

		this.ctx.fillRect( x, y, width, height );
		
	};

	this.drawPlayer = function( player ) {

		this.drawRectangle( player.x , player.y, player.width, player.height, player.color ) ;                    

	};

	this.drawBall = function ( ball ) {

		this.ctx.beginPath();
		this.ctx.lineWidth = 0.5;
		this.ctx.fillStyle = "black";
		this.ctx.strokeStyle = "white";        
		this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
		this.ctx.fill();
		this.ctx.stroke();
	
	};


	this.render = function() {

		if ( this.display ){

			this.drawPlayer( this.player );
			this.drawPlayer( this.ai );                    
			this.drawBall( this.ball );

		}

	};

	this.loop = function() {

		this.update();
		this.render();
		
	};

	this.init = function() {

		var pong_width = this.ctx.canvas.width / 75,
			pong_height = this.ctx.canvas.height / 6,
			screen_width = this.ctx.canvas.width,
			screen_height= this.ctx.canvas.height;
		
		this.player.life = 5;
		this.ai.life = 5;

		this.ai.width = pong_width;
		this.ai.height = pong_height;
		
		this.ai.x =  screen_width - this.ai.width;
		this.ai.y = screen_height / 2;
		
		this.player.width = pong_width;
		this.player.height = pong_height;               
		
		this.player.y = screen_height / 2;
		
		this.ball.radius = pong_width*2;
			
		this.theta = Math.PI;
		
		if ( this.theta > Math.PI/4 && this.theta < 3* Math.PI/4 ) {
			
			this.theta = Math.round(Math.random()) === 1 ? Math.PI/4 : 3 * Math.PI/4;
			
		}
		
		if( this.theta > Math.PI + Math.PI/4 && this.theta < 3* Math.PI/4 + Math.PI ) {
			
			this.theta = Math.round(Math.random()) === 1 ? Math.PI/4 + Math.PI : 3 * Math.PI/4 + Math.PI;
			
		}
		
		this.ball.vx = this.ball.speed * Math.cos(this.theta);
		this.ball.vy = this.ball.speed * Math.sin(this.theta);
		
		this.ball.x = this.ctx.canvas.width / 2;
		this.ball.y = this.ctx.canvas.height / 2;
		
	};

	this.keyMap = {

		"left": { "code" : 65, "on": false },
		"up": { "code" : 87, "on": false },
		"right": { "code" : 68, "on": false },
		"down": { "code" : 83, "on": false },
		"left2": { "code" : 74, "on": false },
		"up2": { "code" : 73, "on": false },
		"right2": { "code" : 76, "on": false },
		"down2": { "code" : 75, "on": false }

	};

}