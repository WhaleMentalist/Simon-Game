var level = 0; // Tracks how far in user is into game
var buttonColors = ["red", "blue", "green", "yellow"]; // Allow color to be mapped to index value
var gamePattern = []; // Stores pattern that must be matched
var userClickPattern = []; // Store pattern user has clicked!
var gameStarted = false;

function checkAnswer(currentLevel) {
  // Check most recent pick with game pattern
  if(gamePattern.at(userClickPattern.length - 1) !==
                    userClickPattern.at(-1)) {
    // Show user has selected wrong button
    restart();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press The 'A' key to Restart!");
  }
  else {
    // Check if user has finished the sequence
    if(userClickPattern.length === level) {
      setTimeout(function() {
        nextSequence();
        userClickPattern = []; // Clear user pattern for next sequence
      }, 1000);
    }
  }
}

function animatePress(name) {
  $(`#${name}`).addClass("pressed");
  setTimeout(function() {
    $(`#${name}`).removeClass("pressed");
  }, 100); // Removes background change in 100 milliseconds
}

function animateButton(name) {
  $(`#${name}`).fadeOut(200).fadeIn(200);
}

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function nextSequence() {
  $("#level-title").html(`Level ${level++}`);
  randomChosenColor = Math.floor(Math.random() * 4); // Value between 0 and 3
  gamePattern.push(buttonColors[randomChosenColor]); // Random color is selected via random index

  // Plays the pattern for the user
  for(let i = 0; i < gamePattern.length; i++) {
    nextSequenceTask(i);
  }
}

function nextSequenceTask(index) {
  setTimeout(function() {
    animateButton(gamePattern[index]); // Flash the randomly selected button
    playSound(gamePattern[index]); // Play sound corresponding to button
  }, index * 500);
}

function restart() {
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  gameStarted = false;
}

/*
 * Due to change by Google. The browser will NOT
 * play sound files UNTIL user has interacted
 * with DOM (This is actually a good change for
 * user experience).
 */

$(document).keypress(function(event) {
  if(event.key === 'a') {
    if(!gameStarted) {
      gameStarted = true;
      nextSequence();
    }
  }
});

// Adding event to track clicks on buttons
$(".btn").click(function(event) {
  if(gameStarted) {
    userClickPattern.push(event.target.id);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(level);
  }
});
