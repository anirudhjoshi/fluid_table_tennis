google.load("jquery", "1.4.2");
google.load("swfobject", "2.1");

/*
 * Chromeless player has no controls.
 */

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  updateHTML("playerState", newState);
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    updateHTML("videoDuration", ytplayer.getDuration());
    updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
    updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
    updateHTML("startBytes", ytplayer.getVideoStartBytes());
    updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
    updateHTML("volume", ytplayer.getVolume());
  }
}

// Allow the user to set the volume from 0-100
function setVideoVolume() {
  var volume = parseInt(document.getElementById("volumeSetting").value);
  if(isNaN(volume) || volume < 0 || volume > 100) {
    alert("Please enter a valid volume between 0 and 100.");
  }
  else if(ytplayer){
    ytplayer.setVolume(volume);
  }
}

function getState() {
	
	if ( ytplayer ) {
		
		return ytplayer.getPlayerState();
//eturns the state of the player. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).			
	}
	
}

var refreshIntervalid, playing = 0;

function playVideo() {
  if (ytplayer) {
    ytplayer.playVideo();
	refreshIntervalId = setInterval( function () { loop(); }, 1000/fps );    
  }
}

var playback;

function playBack() {
	
	if (ytplayer) {
		
		ytplayer.seekTo( 0 );
		ytplayer.stopVideo();
		playVideo()
		playback = setInterval( function () { play_section_loop(); }, 1000/4 );
		
	}
	
}

function playBackStop() {
	
	if (ytplayer) {
		
		clearInterval(playback);
		
	}
	
}

function restartVideo() {
  if (ytplayer) {
    ytplayer.seekTo( 0 );
    ytplayer.stopVideo();
	/* later */
	clearInterval(refreshIntervalId);	
  }
}

var link = "GvpR-yprNk0";

function upload() {
	
	$.ajax({url: "api",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify( { "sections": sections, "link" : 'http://www.youtube.com/watch?v=' + link, "id" : link, 'title' : link } ),
    dataType: "json",
    success: function(response) {
        console.log(response);
    },
});   
	
}

function download1() {
	
	$.ajax({url: "api",
    type: "GET",
    contentType: "application/json",
    data: { "key": "ahZkZXZ-eW91ci1hcHAtbmFtZS1oZXJlcg0LEgdTZWN0aW9uGAEM" },
    dataType: "json",
    success: function(response) {
        console.log(response);
        sections = response.sections;
    },
});   
	
}


function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
	/* later */
	clearInterval(refreshIntervalId);	    
  }
}

function muteVideo() {
  if(ytplayer) {
    ytplayer.mute();
  }
}

function unMuteVideo() {
  if(ytplayer) {
    ytplayer.unMute();
  }
}


// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  ytplayer.cueVideoById("GusLypfx7OQ");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", window.innerWidth / 3, window.innerHeight / 3, "9", null, null, params, atts);
}
function _run() {
  loadPlayer();
}

google.setOnLoadCallback(_run);