const player = document.querySelector(".player");
const obstacle = document.querySelector(".obstacle");
const obstacleAnimation = document.querySelector(".obstacleAnimation");
const xdiff = document.getElementById("xdiff");
const ydiff = document.getElementById("ydiff");
const gameOver = document.getElementById("gameOver");
const roundCount = document.getElementById("rounds");
const start = document.getElementById("start");
// const stop = document.getElementById("stop");
const showPlayerData = document.getElementById("showPlayerData");
const jump = new Audio("jump.mp3");
const duck = new Audio("duck.wav");
const coinSound = new Audio("coinSound.mp3");
const gO = new Audio("gameOver.mp3");
const bgMusic = new Audio("bg.mp3");
const scoreBox = document.querySelector(".scoreBox");
let obstacleImage = document.getElementById("ob");
let playerImage = document.getElementById("pl");
let playerName = document.getElementById("pName");
let scoreCount = document.getElementById("score");
let score = 0;
var refreshInterval;
var isCoin = false;

function gameOverFunction() {
  clearInterval(refreshInterval);
  scoreBox.style.visibility = "hidden";
  playerImage.src = "plGo.png";
  gameOver.style.visibility = "visible";
  obstacle.style.animation = "none";
  player.classList.add("gameOverAnimation");
  showPlayerData.style.visibility = "visible";
  showPlayerData.innerHTML = playerName.value + " : " + score;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  gO.play();
  clearInterval(refreshInterval);
}

start.addEventListener("click", () => {
  playerImage.src = "plRun.gif";
  obstacle.classList.add("obstacleAnimation");
  console.log("Start");
  refreshInterval = setInterval(gameLogic, 10);
  bgMusic.loop = true;
  bgMusic.play();
});

let playerWidth = parseInt(
  window.getComputedStyle(player, null).getPropertyValue("width")
);
let obstacleHeight = parseInt(
  window.getComputedStyle(obstacle, null).getPropertyValue("height")
);

function randomiseObstacleHeight() {
  var randomHeight = Math.floor(Math.random() * (95 - 50 + 1) + 50);
  if (randomHeight % 4 === 1) {
    obstacleImage.src = "birdFly.gif";
    obstacle.style.bottom = "45px";
    obstacle.style.height = "50px";
    isCoin = false;
  } else if (randomHeight % 4 === 2) {
    obstacleImage.src = "stone.png";
    obstacle.style.bottom = "0px";
    obstacle.style.height = randomHeight + "px";
    isCoin = false;
  } else if (randomHeight % 4 === 3) {
    obstacleImage.src = "tree.gif";
    obstacle.style.bottom = "0px";
    obstacle.style.height = randomHeight + "px";
    isCoin = false;
  } else {
    obstacleImage.src = "coin.gif";
    obstacle.style.bottom = "0px";
    obstacle.style.height = randomHeight + "px";
    isCoin = true;
  }

  console.log(randomHeight);
  console.log(obstacleImage.src);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && !player.classList.contains("playerUpAnimation")) {
    jump.play();
    player.classList.add("playerUpAnimation");

    setTimeout(() => {
      player.classList.remove("playerUpAnimation");
    }, 900);
  } else if (
    e.key === "ArrowDown" &&
    !player.classList.contains("playerDownAnimation")
  ) {
    player.classList.add("playerDownAnimation");
    duck.play();
    setTimeout(() => {
      player.classList.remove("playerDownAnimation");
    }, 900);
  }
});

function gameLogic() {
  scoreCount.innerHTML = score;
  px = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"));
  py = parseInt(window.getComputedStyle(player, null).getPropertyValue("top"));
  ph = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("height")
  );

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );
  ob = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("bottom")
  );

  offsetX = Math.abs(px - ox);
  offsetY = Math.abs(py - oy);

  if (ox <= 0) {
    randomiseObstacleHeight();
  }

  if (offsetX < playerWidth) {
    if (isCoin) {
      coinSound.pause();
      coinSound.currentTime = 0;
      coinSound.play();
      score++;
    } else {
      if (ob === 0 && offsetY < obstacleHeight) {
        gameOverFunction();
      } else if (ob > 0 && ph > ob) {
        gameOverFunction();
      }
    }
  }
}
