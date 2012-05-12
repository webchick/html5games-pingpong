var pingpong = {
  scoreA: 0,
  scoreB: 0
};
pingpong.pressedKeys = [];
pingpong.ball = {
  speed: 5,
  x: 150,
  y: 100,
  directionX: 1,
  directionY: 1
}

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
  moveBall();
  movePaddles();
}

function moveBall() {
  // Reference useful variables.
  var playgroundHeight = parseInt($("#playground").height());
  var playgroundWidth  = parseInt($("#playground").width());
  var ball = pingpong.ball;

  // Check playground boundary.
  // Bottom edge.
  if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
    ball.directionY = -1;
  }
  // Top edge.
  if (ball.y + ball.speed * ball.directionY < 0) {
    ball.directionY = 1;
  }
  // Right edge.
  if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
    ball.directionX = -1;
  }
  if (ball.x + ball.speed * ball.directionX < 0) {
    ball.directionX = 1;
  }

  // Calculate new ball position
  ball.x += ball.speed * ball.directionX;
  ball.y += ball.speed * ball.directionY;

  // Check left paddle.
  var paddleAX       = parseInt($("#paddleA").css("left")) +
                       parseInt($("#paddleA").css("width"));
  var paddleAYBottom = parseInt($("#paddleA").css("top")) +
                       parseInt($("#paddleA").css("height"));
  var paddleAYTop    = parseInt($("#paddleA").css("top"));

  if (ball.x + ball.speed * ball.directionX < paddleAX) {
    if (ball.y + ball.speed * ball.directionY <= paddleAYBottom &&
        ball.y + ball.speed * ball.directionY >= paddleAYTop) {
      ball.directionX = 1;
    }
  }

  // Check right paddle.
  var paddleBX       = parseInt($("#paddleB").css("left"));
  var paddleBYBottom = parseInt($("#paddleB").css("top")) +
                       parseInt($("#paddleB").css("height"));
  var paddleBYTop    = parseInt($("#paddleB").css("top"));

  if (ball.x + ball.speed * ball.directionX >= paddleBX) {
    if (ball.y + ball.speed * ball.directionY <= paddleBYBottom &&
        ball.y + ball.speed * ball.directionY >= paddleBYTop) {
      ball.directionX = -1;
    }
  }

  // Check right edge.
  if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
    // Player B lost; reset the ball.
    ball.x = 250;
    ball.y = 100;
    $("#ball").css({
      "left": ball.x,
      "top": ball.y
    });
    ball.directionX = -1;
    pingpong.scoreA++;
    $("#scoreA").html(pingpong.scoreA);
  }

  // Check left edge.
  if (ball.x + ball.speed * ball.directionX < 0) {
    // Player A lost; reset the ball.
    ball.x = 150;
    ball.y = 100;
    $("#ball").css({
      "left": ball.x,
      "top": ball.y
    });
    ball.directionX = 1;
    pingpong.scoreB++;
    $("#scoreB").html(pingpong.scoreB);
  }

  // Actually move the ball on screen.
  $("#ball").css({
    "left" : ball.x,
    "top" : ball.y
  });

  // Declare a weiner.
  var winner = 0;
  if (pingpong.scoreA == 5) {
    alert("Player A won!");
    winner = 1;
  }
  else if (pingpong.playerB == 5) {
    alert("Player B won!");
    winner = 1;
  }
  if (winner) {
    pingpong.scoreA = 0;
    pingpong.scoreB = 0;
    $("#scoreA").html(pingpong.scoreA);
    $("#scoreB").html(pingpong.scoreB);
  }


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
