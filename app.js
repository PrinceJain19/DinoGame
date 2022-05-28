var dino = document.getElementById("dino");
var cactus = document.getElementById("cactus");
var ground1 = document.getElementById("ground1");
var ground2 = document.getElementById("ground2");
var scoreDisplay = document.getElementById("value");
var hiScoreDisplay = document.getElementById("hivalue");
var btnReset = document.querySelector(".reset");
var score = 0;
var hiscore = 0;
var flag = 0;
// var duration = getComputedStyle.cactus.getPropertyValue(animationDuration);
var duration = 2;

function jump() {
    if(dino.classList != "jump" && flag == 0) {
        dino.classList.add("jump");
        // dino.style.backgroundImage = "url(Dino_stationary.png)";

        setTimeout(function() {
            dino.classList.remove("jump");
        }, 500);
    }
}
    
function start() {
    score++;
    if(score > hiscore)
        hiscore++;

    if(score % 2 == 0)
        dino.style.backgroundImage = "url(Dino_run_1.png)";
    else
        dino.style.backgroundImage = "url(Dino_run_0.png)";
    scoreDisplay.innerHTML = score;
    hiScoreDisplay.innerHTML = hiscore;
}

let scoreInc = setInterval(start, 100);

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if(cactusLeft < 70 && cactusLeft > 30 && dinoTop >= 100) {
        stop();
        score = 0;
    }

}, 50);

function stop() {
    flag = 1;
    dino.style.backgroundImage = "url(Dino_lose.png)";
    cactus.style.animation = "unset";
    cactus.style.left = "70px"
    btnReset.classList.remove("hide");
    ground1.style.animationPlayState = "paused";
    ground2.style.animationPlayState = "paused";
    document.querySelector(".game-over").classList.remove("hide");
    document.getElementById("cloud1").style.animationPlayState = "paused";
    document.getElementById("cloud2").style.animationPlayState = "paused";
    document.getElementById("cloud3").style.animationPlayState = "paused";
    clearInterval(scoreInc);
    clearInterval(speedInc);
}

function PlayAgain() {
    flag = 0;
    duration = 2;
    scoreInc = setInterval(start, 100);
    speedInc = setInterval(speed, 5)
    document.querySelector(".game-over").classList.add("hide");
    btnReset.classList.add("hide");
    cactus.style.left = "600px";
    cactus.style.animation = "block 2s linear 2s infinite";
    ground1.style.animationPlayState = "running";
    ground2.style.animationPlayState = "running";
    // ground1.style.animation = "ground-move1 8s linear infinite";
    // ground2.style.animation = "ground-move2 8s linear infinite";
    document.getElementById("cloud1").style.animationPlayState = "running";
    document.getElementById("cloud2").style.animationPlayState = "running";
    document.getElementById("cloud3").style.animationPlayState = "running";
}

btnReset.addEventListener("click", PlayAgain);

function speed() {
    if(duration > 0.6) {
        duration -= 0.0001;
        ground1.style.animationDuration = (4*duration) + "s";
        ground2.style.animationDuration = (4*duration) + "s";
        cactus.style.animationDuration = duration + "s";
    }
}

var speedInc = setInterval(speed, 2);

document.addEventListener("keydown", function(event) {
    jump();
});

document.addEventListener('touchstart', e => {
    jump();
});