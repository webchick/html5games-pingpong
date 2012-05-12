var KEY = {
  UP: 38,
  DOWN: 40,
  W: 87,
  S: 83
}

$(function() {
  // Listen for the key down event.
  $(document).keydown(function(e) {
    switch(e.which) {
      case KEY.UP: // arrow-up
        // Get the current paddle B's top value.
        var top = parseInt($("#paddleB").css("top"));
        // Move the paddle B up 5 pixels.
        $("#paddleB").css("top", top - 5);
        break;
      case KEY.DOWN: // arrow-down
        var top = parseInt($("#paddleB").css("top"));
        // Move the paddle B down 5 pixels.
        $("#paddleB").css("top", top + 5);
        break;
      case KEY.W: // w 
        // Get the current paddle B's top value.
        var top = parseInt($("#paddleA").css("top"));
        // Move the paddle A up 5 pixels.
        $("#paddleA").css("top", top - 5);
        break;
      case KEY.S: // s
        var top = parseInt($("#paddleA").css("top"));
        // Move the paddle A down 5 pixels.
        $("#paddleA").css("top", top + 5);
        break;
    }
  });

  $("#paddleA").css("top", "60px");
  $("#paddleB").css("top", "20px");
});
