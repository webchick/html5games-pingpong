var pingpong = {};
pingpong.pressedKeys = [];

var KEY = {
  UP: 38,
  DOWN: 40,
  W: 87,
  S: 83
}

$(function() {
  // Call gameloop every 30 milliseconds.
  pingpong.timer = setInterval(gameloop, 30);

  // Mark down which key is up and down into array called pressedKeys.
  $(document).keydown(function(e) {
    pingpong.pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e) {
    pingpong.pressedKeys[e.which] = false;
  });
});

function gameloop() {
  movePaddles();
}

function movePaddles() {
  // Use our custom timer to continuously check if a key is pressed.
  if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
    // Move the paddle B up 5 pixels.
    var top = parseInt($("#paddleB").css("top"));
    $("#paddleB").css("top", top - 5);
  }
  if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
    // Move the paddle B down 5 pixels.
    var top = parseInt($("#paddleB").css("top"));
    $("#paddleB").css("top", top + 5);
  }
  if (pingpong.pressedKeys[KEY.W]) { // w 
    // Move the paddle A up 5 pixels.
    var top = parseInt($("#paddleA").css("top"));
    $("#paddleA").css("top", top - 5);
  }
  if (pingpong.pressedKeys[KEY.S]) { // s
    // Move the paddle A down 5 pixels.
    var top = parseInt($("#paddleA").css("top"));
    $("#paddleA").css("top", top + 5);
  }

}
