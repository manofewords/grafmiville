// global variables... blerk! (TODO)
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame,
  doScroll = false,
  scrollStart = 0,
  scrollEnd = 0,
  scrollIteration = 0;

function animationLoop() {
  var x = scrollStart + scrollIteration * 10;
  if(doScroll) {
    window.scrollTo(x, 0); // linear
    scrollIteration++;
    doScroll = (scrollEnd != x);
  }
  requestAnimationFrame(animationLoop);
}
animationLoop();

function getBoxHandler(iteration, html) {
  return function(e) {
    var box = e.target;

    switch(e.animationName) {
      case "expand" + iteration:
        box.className += " expanded";
        box.innerHTML = html;

        // start a scroll animation
        doScroll = true;
        scrollStart = (iteration - 1) * 500;
        scrollEnd = iteration * 500; // see $box1_x, $box2_x, $box3_x and $expandedWidth in main.scss (TODO: is there a way not to duplicate this from main.scss?)
        scrollIteration = 0;
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
    style.webkitAnimationDelay = "3s"; // see $animDurationToRunAndJump in main.scss (TODO: is there a way not to duplicate this from main.scss?)
  };
}