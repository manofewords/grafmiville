function getBoxHandler(iteration, html) {
  return function(e) {
    var box = e.target;

    switch(e.animationName) {
      case "expand" + iteration:
        box.className += " expanded";
        box.innerHTML = html;
        break;
      case "shrink" + iteration:
        box.className = "box";
        box.innerHTML = "?";
        break;
      default:
        break;
    }
  };
}

function getButtonHandler(iteration) {
  return function() {
    // shrink currently expanded box
    var style = document.getElementById("box" + iteration).style;
    style.webkitAnimationName = "shrink" + iteration;
    style.webkitAnimationDelay = 0; // do it now!

    // move Manu
    style = document.getElementById("manu").style;
    style.webkitAnimationName = "jumpnrun" + (iteration + 1);
    style.webkitAnimationDelay = 0; // do it now!

    // expand next box
    style = document.getElementById("box" + (iteration + 1)).style;
    style.webkitAnimationName = "expand" + (iteration + 1);
    style.webkitAnimationDelay = "3s"; // duration of Jump'n'Run animation (TODO: is where a way not to duplicate this from .scss file?)
  };
}