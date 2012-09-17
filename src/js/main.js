// If you are viewing this code - don't judge me too harshly :D
// Still needs a good clean up and encapsulation - just aimed to get it working
// as quickly as I could

// Global settings
var FPS = 60;
var running = false;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Globals
var field;
var pong;
var colors;
var counter;

function toggleMultiplayer() {	

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

	counter.coul_incr = 0;

 	field.reset();

	pong.display = false;
	pong.init();

 	pong.clear();

	counter.run_coul = true;

}

var ball_counter = 0;
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

function push( player, field, velocity ){

	if (player.push) {

		field.setVelocity( Math.floor( player.x + player.width / 2 ), Math.floor( player.y + player.height / 2 ), velocity, 0 );	
		field.setDensityRGB( Math.floor( player.x + player.width / 2  ) , Math.floor( player.y + player.height / 2 ), player.color);

	}

}

function explode(field){

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

		ball_counter++;

		if ( ball_counter == 12 ) {
	
			pong.ball.out = false;
			ball_counter = 0;
			
		}
	}

}

function jiggleBall(player, distance){

	pong.ball.x = player.x + distance + Math.random();
	pong.ball.y = player.y + player.height / 2 + Math.random();
	pong.ball.vx = 0;
	pong.ball.vy = 0;	

}

function prepareFrame(field) {

	if ( fps == 60){

		fps = 0;

	}

	fps++;

	colors.rotate();

	pong.player.color = colors.colors[0];
	pong.ai.color = colors.colors[1];
	pong.ball.color = colors.colors[2];

	field.setDensityRGB( Math.floor( pong.ball.x + pong.ball.radius / 2  ) , Math.floor( pong.ball.y + pong.ball.radius / 2 ), pong.ball.color );

	push(pong.player, field, 50);
	push(pong.ai, field, -50);

	explode(field);

	
	if ( pong.player.suck ) {			

		if ( !suck_on && suck_counter_1 > 30 ) {

			suck_on = true;

		}

		// make proportional power

		if ( suck_on ) {

			var straight_line_dist = pong.distance(pong.player, pong.ball );

			if ( Math.abs( straight_line_dist ) < 20 ) {

				ball_caught = true;

				jiggleBall( pong.player, 10);

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

	if ( suck_counter_2 < 100 && fps % 10 == 1 )	{

		suck_counter_2 += 2;

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

				jiggleBall( pong.ai, -10);

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

}

function drawPowerBar( color, x, y, width, height ){

	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);

}

function drawSuck() {

	drawPowerBar( "black", 0, 1, canvas.width, 4 );
	drawPowerBar( arrayToRGBA( pong.ai.color ), 1,2, ( canvas.width/ 2 - 2 ) * suck_counter_1 / 100, 2 );
	drawPowerBar( arrayToRGBA( pong.player.color ), canvas.width / 2 + ( canvas.width/ 2 ) * ( 1 - suck_counter_2 / 100 ),2, ( canvas.width/ 2 - 1 ) * suck_counter_2 / 100, 2 );

}

function drawLives(){

	drawPowerBar( "black", 0,canvas.height - 5, canvas.width, 4);
	drawPowerBar( arrayToRGBA( pong.ai.color ), canvas.width / 2 + ( canvas.width/ 2 ) * ( 1 - pong.ai.life / 5 ),canvas.height - 4, ( canvas.width/ 2 - 1 ) * pong.ai.life / 5, 2);
	drawPowerBar( arrayToRGBA( pong.player.color ), 1,canvas.height - 4, ( canvas.width/ 2 - 2 ) * pong.player.life / 5, 2);

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

(function animloop(){

  requestAnimFrame(animloop);

  updateFrame();

})();

function Counter(){

	this.coul = 0;
	this.coul_incr = 0;

	this.symbols = [3,2,1, "GO!"];

	this.coul_switch = true;
	this.run_coul = true;
	this.cout_color = [];

	this.count_down = function(){

			this.coul++;

			if (this.cout_color.length == 0){
				this.cout_color = pong.ai.color;
			}

			if ( this.coul == 60 * 1 ){

				if (this.coul_incr % 2 == 0){

					this.cout_color = pong.player.color;
					
				} else {
					this.cout_color = pong.ai.color;
				}

				this.coul = 0;
				this.coul_incr++;

			}

		  	if ( this.coul_incr == 4 ){

	  			this.coul_incr = 0;
	  			this.run_coul = false;

	  			field.reset();

	  			pong.display = true;
	  			pong.player.suck = false;
	  			pong.init();  			

	  			pong.clear();
				
	  			return;

			}

			var half_width = canvas.width / 2 - 8;
			var half_height = canvas.width / 2 + 16;

			if ( this.coul_incr == 3 ){

				half_width -= 20;

			}


		  	ctx.font = "bold 34px Arial";
		  	ctx.fillStyle = "black";
		  	ctx.fillText(this.symbols[this.coul_incr], half_width - 1, half_height + 2);			

		  	ctx.fillStyle = arrayToRGBA( this.cout_color );
		  	ctx.font = "bold 32px Arial";
		  	ctx.fillText(this.symbols[this.coul_incr], half_width, half_height);	

	}	

}

function arrayToRGBA( a ){

	return "rgb(" + Math.floor( a[0] ) + "," + Math.floor( a[1] ) + "," + Math.floor( a[2] ) + ")";
}

function updateFrame() {
	
	if ( running ) {

		field.update();    
		
		pong.loop();
		
		notify();

		drawSuck();
		drawLives();

		if ( counter.run_coul ){

			counter.count_down();

		}

	}
	
}

function updateRes() {

		var r = 96;

		canvas.width = r;
		canvas.height = r;

		field.setResolution(r, r);
		pong.display = false;
        pong.init(); 

}

function key_check( e, keyMap, set) {

	var i;		

	for(i in keyMap) {

		if (keyMap.hasOwnProperty(i)) {
		
			if( e.keyCode === keyMap[i].code ) {
			
					keyMap[i].on = set;
					break;
					
				}
				
			}   
		}		
}

var keyDown = function(e) {

	key_check( e, pong.keyMap, true);

}

var keyUp = function(e) {

	key_check( e, pong.keyMap, false);

}

function begin() {

	field = new Fluid(canvas);
	field.setUICallback(prepareFrame);
	field.setDisplayFunction(field.toggleDisplayFunction(canvas, 0));

	pong = new Pong(canvas);
	colors = new Colors();
	counter = new Counter();

	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);
	
	updateRes();     
	startAnimation();

}

begin();