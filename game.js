let gamePattern = []; 
let userPattern = [];
let level = 0;
let gameOn = false;

let buttonColours = ["red", "yellow", "blue", "green"];


// Clicking button
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userPattern.length - 1);
});

// Checking Answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        if (userPattern.length === gamePattern.length){
            setInterval(nextSequence(), 1000);
        }
    }else{
        let wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
};


// Main function
function nextSequence(){
    userPattern = [];
    level++;  

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomColourChosen = buttonColours[randomNumber];

    gamePattern.push(randomColourChosen);

    $("#" + randomColourChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColourChosen);
}


// Animating Press
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};


// Sounds
function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};


// Restart
function startOver(){
    level = 0;
    gamePattern = [];
    gameOn = false;
};

// Starting Level
$(document).keydown(function(){
    if (!gameOn){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameOn = true;
    }
});


