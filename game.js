/*
 * Due to change by Google. The browser will NOT
 * play sound files UNTIL user has interacted
 * with DOM (This is actually a good change for
 * user experience). 
 */

$(document).keypress(function(event) {
  if(event.key === 'a') {
    var buttonColors = ["red", "blue", "green", "yellow"]; // Allow color to be mapped to index value
    var gamePattern = []; // Stores pattern that must be matched

    function nextSequence() {
      return Math.floor(Math.random() * 4); // Value between 0 and 3
    }

    randomChosenColor = nextSequence();
    gamePattern.push(buttonColors[randomChosenColor]); // Random color is selected via random index

    console.log(`#${buttonColors[randomChosenColor]}`);
    console.log($(`#${buttonColors[randomChosenColor]}`));

    // Flash the randomly selected button
    $(`#${buttonColors[randomChosenColor]}`).fadeOut(200).fadeIn(200);

    // Play corresponding audio of button
    var audio = new Audio(`./sounds/${buttonColors[randomChosenColor]}.mp3`);
    audio.play();
  }
});
