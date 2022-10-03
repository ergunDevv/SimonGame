var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
// Sounds
var wrongAudio = new Audio("sounds/wrong.mp3");

var started = false;

$(document).keypress(function() {


  if (!started)
    $("#level-title").text("Level " + level);
  nextSequence();
  started = true;

})

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);


  userClickedPattern.push(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColour);

});



function nextSequence() {

  randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);

  userClickedPattern = [];
  level++;

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


$("#level-title").text("Level " + level);
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentlevel) {
  console.log("gamePattern " + gamePattern);
  console.log("userClickedPatern " + userClickedPattern);

  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]) {
    if (gamePattern.length == userClickedPattern.length) {

      setTimeout(function() {
        userClickedPattern = [];
      }, 1000);

    }

  } else {
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
