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

const diceImage = document.querySelector(".dice");

const winScore = document.querySelector(".winning-score");

let currentScore = 0;
const score = [0, 0];
let activePlayer = 0;
let scoreLimit = 0;

function switchPlayer() {
  document.getElementById(`current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
}

limitEl.addEventListener("click", function () {
  scoreLimit = Number(document.querySelector(".score-limit-number").value);
  if (scoreLimit >= 10) {
    winScore.style.left = "12%";
  }

  winScore.textContent = scoreLimit;
});

newGameEl.addEventListener("click", function () {
  // Reset All Scores to 0
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  scoreLimit = 0;
  currentScore = 0;
  score[0] = 0;
  score[1] = 0;

  //Reset ActivePlayer to 0
  activePlayer = 0;
  document.querySelector(".score-limit-number").value = "";
  winScore.textContent = scoreLimit;

  //Make the buttons clickable
  rollDiceEl.classList.remove("disable-click");
  holdEl.classList.remove("disable-click");

  //Remove the win class
  player0El.classList.remove("player-wins");
  player1El.classList.remove("player-wins");

  playerName0El.textContent = "PLAYER 1";
  playerName1El.textContent = "PLAYER 2";

  //Set Palyer 1 as Active
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  //Hide the die Image
  diceImage.classList.add("hidden");
});

rollDiceEl.addEventListener("click", function () {
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
});

holdEl.addEventListener("click", function () {
  // 1. Add currentScore to TotalScore
  score[activePlayer] += currentScore;
  document.getElementById(`total-score-${activePlayer}`).textContent =
    score[activePlayer];

  // 2. Check id player's score is >=100
  if (score[activePlayer] >= scoreLimit) {
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.add("player-wins");
    document.getElementById(`player-name-${activePlayer}`).textContent =
      "🎉WINNER!!!";
    rollDiceEl.classList.add("disable-click");
    holdEl.classList.add("disable-click");
  }

  // 3. Switch active Player
  else {
    switchPlayer();
  }
});
