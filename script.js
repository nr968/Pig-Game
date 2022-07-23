"use strict";

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

const playerName0El = document.getElementById("player-name-0");
const playerName1El = document.getElementById("player-name-1");

const totalScore0El = document.getElementById("total-score-0");
const totalScore1El = document.getElementById("total-score-1");

const currentScore0El = document.getElementById("current-score-0");
const currentScore1El = document.getElementById("current-score-1");

const limitEl = document.querySelector(".limit");
const newGameEl = document.querySelector(".new-game");
const rollDiceEl = document.querySelector(".roll-dice");
const holdEl = document.querySelector(".hold");
const playerNameSubmitEl = document.querySelector(".player-names-submit");

const diceImage = document.querySelector(".dice");

const winScore = document.querySelector(".winning-score");

let currentScore = 0;
const score = [0, 0];
let activePlayer = 0;
let scoreLimit = 0;
let player_0, player_1;
let playing = false;

window.onload = function () {
  document.querySelector(".name-0").focus();
};

function switchPlayer() {
  document.getElementById(`current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
}

function init() {
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  // scoreLimit = 0;
  currentScore = 0;
  score[0] = 0;
  score[1] = 0;
  playing = false;

  winScore.style.right = "10%";

  //Reset ActivePlayer to 0
  activePlayer = 0;
  // document.querySelector(".score-limit-number").value = "";
  winScore.textContent = scoreLimit;

  //Remove the win class
  player0El.classList.remove("player-wins");
  player1El.classList.remove("player-wins");

  //Set Player name
  playerName0El.textContent = player_0;
  playerName1El.textContent = player_1;

  //Set Palyer 1 as Active
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  //Hide the die Image
  diceImage.classList.add("hidden");
}

playerNameSubmitEl.addEventListener("click", function () {
  player_0 = document.querySelector(".name-0").value;
  playerName0El.textContent = player_0;
  player_1 = document.querySelector(".name-1").value;
  playerName1El.textContent = player_1;
  document.querySelector(".player-details-box").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  playerNameSubmitEl.classList.add("hidden");
  document.querySelector(".score-limit-number").focus();
});

limitEl.addEventListener("click", function () {
  init();
  scoreLimit = Number(document.querySelector(".score-limit-number").value);
  if (scoreLimit > 0) {
    document.querySelector(".win-limit").classList.remove("hidden");
    winScore.textContent = scoreLimit;
    playing = true;
    if (scoreLimit >= 10) {
      winScore.style.right = "8.5%";
    }
  } else {
    alert("Please enter a score limit greater than 0");
    document.querySelector(".score-limit-number").focus();
  }
});

newGameEl.addEventListener("click", function () {
  init();
  scoreLimit = 0;
  document.querySelector(".score-limit-number").value = "";
  winScore.textContent = 0;
  document.querySelector(".win-limit").classList.add("hidden");
});

rollDiceEl.addEventListener("click", function () {
  if (playing) {
    // 1. Generate Random Dice number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice image
    diceImage.src = `img/dice-${diceNumber}.png`;
    if (diceImage.classList.contains("hidden")) {
      diceImage.classList.remove("hidden");
    }

    //3. Check for rolled 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-score-${activePlayer}`).textContent =
        currentScore;
    }
    // Switch active Player
    else {
      switchPlayer();
    }
  } else if (scoreLimit > 0) {
    alert("Please restart the Game");
    newGameEl.focus();
  } else {
    alert("Please enter a score limit greater than 0");
    document.querySelector(".score-limit-number").focus();
  }
});

holdEl.addEventListener("click", function () {
  if (playing) {
    // 1. Add currentScore to TotalScore
    score[activePlayer] += currentScore;
    document.getElementById(`total-score-${activePlayer}`).textContent =
      score[activePlayer];

    // 2. Check id player's score is >=100
    if (score[activePlayer] >= scoreLimit) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-wins");
      const winner =
        "🎉 " +
        document.getElementById(`player-name-${activePlayer}`).textContent +
        " WINS!!!";
      document.getElementById(`player-name-${activePlayer}`).textContent =
        winner;
      playing = false;
      newGameEl.focus();
    }

    // 3. Switch active Player
    else {
      switchPlayer();
    }
  } else if (scoreLimit > 0) {
    alert("Please restart the Game");
    newGameEl.focus();
  } else {
    alert("Please enter a score limit greater than 0");
    document.querySelector(".score-limit-number").focus();
  }
});
