// If you are viewing this code - don't judge me too harshly :D
// Still needs a good clean up and encapsulation - just aimed to get it working
// as quickly as I could

var res;
var fieldRes;
var clear_id;
var FPS = 60;
var running = false;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var L = 75;

function Main() {


}

function Colors(){

	this.distanceRotators = [ 0, 201, 401 ];

	this.rotate = function(){

		for ( var i = 0; i < 3; i++ ){

			this.distanceRotators[i]++;

			if ( this.distanceRotators[i] > 600 ) {

				this.distanceRotators[i] = 0;

			}

		}		

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

function multiplayer() {	

	if ( pong.ai.multiplayer ){

		pong.ai.multiplayer = false;
		pong.ai.push = true;
		document.getElementById("multiplayer").innerHTML = "Begin Multiplayer"

	} else {

		pong.ai.multiplayer = true;

		document.getElementById("multiplayer").innerHTML = "Begin Single Player"

	}		

	restart();

}

function restart() {

	suck_counter_1 = 100;
	suck_counter_2 = 100;

	prev_player_life = 5;
	prev_ai_life = 5;

	coul_incr = 0;

 	field.reset();

	pong.display = false;
	pong.init();

 	pong.clear();

	run_coul = true;

}

var field;
var pong;
var colors;

var counter = 0;
var suck_counter_1 = 100;
var suck_counter_2 = 100;

var fps = 0;

var suck_on = false;
var ball_caught = false;

var suck_on2 = false;
var ball_caught2 = false;

var prev_player_life = 5;
var prev_ai_life = 5;

var ai_switch = "AI";
var player_switch = "HUMAN";

var not = document.getElementById('notifications');

function notify(){

	if ( pong.ai.multiplayer ){

		ai_switch = "PLAYER 2";
		player_switch = "PLAYER 1";

	} else {

		ai_switch = "AI";
		player_switch = "HUMAN";

	}

	if ( pong.player.life < prev_player_life ){

		not.innerHTML = ai_switch + " SCORES " + (5 - pong.player.life) + "!";
		prev_player_life = pong.player.life;

	}

	if ( pong.ai.life < prev_ai_life ){

		not.innerHTML = player_switch + " SCORES " + (5 - pong.ai.life) + "!";
		prev_ai_life = pong.ai.life;
		
	}	

	if ( pong.player.life == 0 ){

		not.innerHTML = ai_switch + " WINS!"
		restart();

	}

	if ( pong.ai.life == 0 ){

		not.innerHTML = player_switch + " WINS!"

		restart();

	}

}

function prepareFrame(field) {

	if ( fps == 60){

		fps = 0;

	}

	fps++;

	var player_ab = rotator( colors.distanceRotators[0] );
	var ai_ab = rotator( colors.distanceRotators[1] );
	var ball_ab = rotator( colors.distanceRotators[2] );

	colors.rotate();

	pong.player.color = cielabToRGB( L, player_ab[0], player_ab[1], [0.9642, 1, 0.8249 ] )
	pong.ai.color = cielabToRGB( L, ai_ab[0], ai_ab[1], [0.9642, 1, 0.8249 ] )
	pong.ball.color = cielabToRGB( L, ball_ab[0], ball_ab[1], [0.9642, 1, 0.8249 ] )	

	field.setDensityRGB( Math.floor( pong.ball.x + pong.ball.radius / 2  ) , Math.floor( pong.ball.y + pong.ball.radius / 2 ), pong.ball.color );				
	
	if ( pong.player.push ) {

		field.setVelocity( Math.floor( pong.player.x + pong.player.width / 2 ), Math.floor( pong.player.y + pong.player.height / 2 ), 50, 0 );	
		field.setDensityRGB( Math.floor( pong.player.x + pong.player.width / 2  ) , Math.floor( pong.player.y + pong.player.height / 2 ), pong.player.color);				
		
	}

	if ( pong.ball.out ){

		if ( pong.ball.xo > canvas.width / 2 ) {
			var x = canvas.width-1;
			var mult = -1;

	} else {

		var mult = 1;
		var x = 0;
	}

	field.setDensityRGB( x, Math.floor( pong.ball.yo + pong.ball.radius / 2 ), pong.ball.color );				
	field.setVelocity( x, Math.floor( pong.ball.yo + pong.ball.radius / 2 ), mult*500, 0 );		

		counter++;

		if ( counter == 12 ) {
	
			pong.ball.out = false;
			counter = 0;

		}
	}
	
	if ( pong.player.suck ) {			

		if ( !suck_on && suck_counter_1 > 30 ) {

			suck_on = true;

		}

		// make proportional power

		if ( suck_on ) {

			var straight_line_dist = pong.distance(pong.player, pong.ball );

			if ( Math.abs( straight_line_dist ) < 20 ) {

				ball_caught = true;

				pong.ball.x = pong.player.x + 10 + Math.random();
				pong.ball.y = pong.player.y + pong.player.height / 2 + Math.random();
				pong.ball.vx = 0;
				pong.ball.vy = 0;

				suck_counter_1--;				

				if ( suck_counter_1 == 0 ){

					field.setVelocity( 0, Math.floor( pong.player.y + pong.player.height / 2 ), 5000, 0 );				
					field.setDensityRGB( 0, Math.floor( pong.player.y + pong.player.height / 2 ), pong.player.color );			

					suck_on = false;
					ball_caught = false;

				}					

			}		

		}

	}			

	if ( suck_on && !pong.player.suck && ball_caught ){

		field.setVelocity( 0, Math.floor( pong.player.y + pong.player.height / 2 ), 5000, 0 );				
		field.setDensityRGB( 0, Math.floor( pong.player.y + pong.player.height / 2 ), pong.player.color );

		suck_on = false;		
		ball_caught = false;


	}

	if ( suck_counter_1 < 100 && fps % 10 == 1 )	{

		suck_counter_1 += 2;

	}

	if ( pong.ai.push ) {

		field.setVelocity( Math.floor( pong.ai.x + pong.ai.width / 2 ), Math.floor( pong.ai.y + pong.ai.height / 2 ), -50, 0 );	
		field.setDensityRGB( Math.floor( pong.ai.x + pong.ai.width / 2  ) , Math.floor( pong.ai.y + pong.ai.height / 2 ), pong.ai.color );				
		
	}	

	if ( !pong.ai.multiplayer ){

		if ( suck_counter_2 >= 90 ){


			pong.ai.suck = true;

		}

	}

	if ( pong.ai.suck ) {			

		if ( !suck_on2 && suck_counter_2 > 30 ) {

			suck_on2 = true;

		}

		// make proportional power

		if ( suck_on2 ) {

			var straight_line_dist = pong.distance(pong.ai, pong.ball );

			var aval = 20;

			if ( !pong.ai.multiplayer ){

				aval = 0;

			}			



			if ( Math.abs( straight_line_dist ) < aval  ) {

				ball_caught2 = true;

				pong.ball.x = pong.ai.x - 10 + Math.random();
				pong.ball.y = pong.ai.y + pong.ai.height / 2 + Math.random();
				pong.ball.vx = 0;
				pong.ball.vy = 0;

				suck_counter_2--;		

				var val = 0;		

				if ( !pong.ai.multiplayer ){

					val = 80;

				}

				if ( suck_counter_2 <= val ){

					if ( !pong.ai.multiplayer){
					field.setVelocity( Math.floor( pong.ai.x + pong.ai.width / 2 ), Math.floor( pong.ai.y + pong.ai.height / 2 ), -2500, 0 );	
				} else {
					field.setVelocity( Math.floor( pong.ai.x + pong.ai.width / 2 ), Math.floor( pong.ai.y + pong.ai.height / 2 ), -5000, 0 );	
				}
					field.setDensityRGB( Math.floor( pong.ai.x + pong.ai.width / 2  ) , Math.floor( pong.ai.y + pong.ai.height / 2 ), pong.ai.color );				

					suck_on2 = false;
					pong.ai.suck = false;
					ball_caught2 = false;

				}					

			}		

		}

	}		

	if ( suck_on2 && !pong.ai.suck && ball_caught2 ){

		field.setVelocity( Math.floor( pong.ai.x + pong.ai.width / 2 ), Math.floor( pong.ai.y + pong.ai.height / 2 ), -5000, 0 );	
		field.setDensityRGB( Math.floor( pong.ai.x + pong.ai.width / 2  ) , Math.floor( pong.ai.y + pong.ai.height / 2 ), pong.ai.color );				

		suck_on2 = false;		
		ball_caught2 = false;

	}

	if ( suck_counter_2 < 100 && fps % 10 == 1 )	{

		suck_counter_2 += 2;

	}	

	

}

function drawSuck() {

	ctx.fillStyle = "black";
	ctx.fillRect(0,1, canvas.width, 4);		

	ctx.fillStyle = arrayToRGBA( pong.ai.color );
	ctx.fillRect(1,2, ( canvas.width/ 2 - 2 ) * suck_counter_1 / 100, 2);

	ctx.fillStyle = arrayToRGBA( pong.player.color );	
	ctx.fillRect(canvas.width / 2 + ( canvas.width/ 2 ) * ( 1 - suck_counter_2 / 100 ),2, ( canvas.width/ 2 - 1 ) * suck_counter_2 / 100, 2);

}

function drawLives(){

		ctx.fillStyle = "black";
		ctx.fillRect(0,canvas.height - 5, canvas.width, 4);		

		ctx.fillStyle = arrayToRGBA( pong.ai.color );			
		ctx.fillRect(canvas.width / 2 + ( canvas.width/ 2 ) * ( 1 - pong.ai.life / 5 ),canvas.height - 4, ( canvas.width/ 2 - 1 ) * pong.ai.life / 5, 2);

		ctx.fillStyle = arrayToRGBA( pong.player.color );
		ctx.fillRect(1,canvas.height - 4, ( canvas.width/ 2 - 2 ) * pong.player.life / 5, 2);	

}

function switchAnimation() {

	
	if ( running ) {
		
		running = false;	
		document.getElementById("switch").innerHTML = "Unpause"


	} else {

		running = true;
		document.getElementById("switch").innerHTML = "Pause"

	}



	return;
	
}

var white = [0.9642, 1, 0.8249 ];

function cielabToRGB( L, a, b, white ) {

	x = white[0] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) + ( 1 / 500 ) * a  ) * 255;
	y = white[1] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) ) * 255;
	z = white[2] * inverseCielab( ( 1 / 116 ) * ( L + 16 ) + ( 1 / 200 ) * b  ) * 255;

	return [ x, y, z];
}

function inverseCielab( t ) {

	if ( t > ( 6 / 29 ) ){

		return Math.pow( t, 3);

	} else {

		return 3 * Math.pow( 6 / 29, 2 )* ( t - 4 / 29);

	}


}

function startAnimation() {
	
	running = true;

	return;
	
} 
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / FPS);
          };
})();


// usage: 
// instead of setInterval(render, 16) ....

(function animloop(){

  requestAnimFrame(animloop);

  updateFrame();

})();

// The higher this value, the less the fps will reflect temporary variations
// A value of 1 will only keep the last value
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var avg = Array( 120 );
var avg_index = 0;
var avgs = 0;
var avgs_index = 0;
var benchmarking = false;

function run_benchmark() {

	// http://stackoverflow.com/questions/4787431/check-fps-in-js

	var thisFrameTime = (thisLoop=new Date) - lastLoop;
	frameTime+= (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;	

	avg[avg_index] = 1000/frameTime;  		

	if ( avg_index > 6 ) {

		var mini_avg = 0;

		for ( var i = 0; i < avg_index; i++ ) {
			
			mini_avg += avg[avg_index];

		}

		if ( avgs_index > 1 ){

			if ( avgs < 60 ) {

				updateRes( 24 );

			}

			benchmarking = false;

		}


		avgs += mini_avg / avg_index;

		avgs_index++

		avg_index = 0;

	}

	avg_index++;

}

var coul = 0;
var coul_incr = 0;

var symbols = [3,2,1, "GO!"];

var coul_switch = true;
var run_coul = true;
var cout_color = [];

function count_down(){

		coul++;

		if (cout_color.length == 0){
			cout_color = pong.ai.color;
		}

		if ( coul == 60 * 1 ){

			if (coul_incr % 2 == 0){

				cout_color = pong.player.color;
				
			} else {
				cout_color = pong.ai.color;
			}

			coul = 0;
			coul_incr++;

		}

	  	if ( coul_incr == 4 ){

  			coul_incr = 0;
  			run_coul = false;

  			field.reset();

  			pong.display = true;
  			pong.player.suck = false;
  			pong.init();  			

  			pong.clear();
			
  			return;

		}

		var half_width = canvas.width / 2 - 8;
		var half_height = canvas.width / 2 + 16;

		if ( coul_incr == 3 ){

			half_width -= 20;

		}


	  	ctx.font = "bold 34px Arial";
	  	ctx.fillStyle = "black";
	  	ctx.fillText(symbols[coul_incr], half_width - 1, half_height + 2);			

	  	ctx.fillStyle = arrayToRGBA( cout_color );
	  	ctx.font = "bold 32px Arial";
	  	ctx.fillText(symbols[coul_incr], half_width, half_height);	

}

function arrayToRGBA( a ){

	return "rgb(" + Math.floor( a[0] ) + "," + Math.floor( a[1] ) + "," + Math.floor( a[2] ) + ")";
}

function updateFrame() {
	
	if ( running ) {
	
		if ( benchmarking ){

			run_benchmark();

		}

		field.update();    
		
		pong.loop();
		
		notify();

		drawSuck();
		drawLives();

		if ( run_coul ){

			count_down();

		}

	}
	
}

var r = 96;
var field;

function updateRes( r ) {

		canvas.width = r;
		canvas.height = r;
		fieldRes = r;
		field.setResolution(r, r);
		pong.display = false;
        pong.init(); 

}

var keyDown = function(e) {

	var i;		
	
	for(i in pong.keyMap) {

		if (pong.keyMap.hasOwnProperty(i)) {
		
			if( e.keyCode === pong.keyMap[i].code ) {
			
					pong.keyMap[i].on = true;
					break;
					
				}
				
			}   
		}			

}

var keyUp = function(e) {

	var i;
	
	for(i in pong.keyMap) {

		if (pong.keyMap.hasOwnProperty(i)) {
		
			if( e.keyCode === pong.keyMap[i].code ) {
			
					pong.keyMap[i].on = false;
					break;
					
				}
				
			}   
		}			

}

function begin() {

	field = new Fluid(canvas);

	field.setUICallback(prepareFrame);
	field.setDisplayFunction(field.toggleDisplayFunction(canvas, 0));

	pong = new Pong(canvas);

	colors = new Colors();

	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);
	
	updateRes(r);     
	startAnimation();

}

begin();