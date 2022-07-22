"use strict";

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

const playerName0El = document.getElementById("player-0");
const playerName1El = document.getElementById("player-1");

const totalScore0El = document.getElementById("total-score-0");
const totalScore1El = document.getElementById("total-score-1");

const currentScore0El = document.getElementById("current-score-0");
const currentScore1El = document.getElementById("current-score-1");

const newGameEl = document.querySelector(".new-game");
const rollDiceEl = document.querySelector(".roll-dice");
const holdEl = document.querySelector(".hold");

const diceImage = document.querySelector(".dice");

let diceNumber = 0;
let totalScore_0 = 0;
let totalScore_1 = 0;
let current_0 = 0;
let current_1 = 0;

newGameEl.addEventListener("click", function () {
  totalScore0El.textContent = 0;
  totalScore_0 = 0;
  current_0 = 0;
  totalScore1El.textContent = 0;
  totalScore_1 = 0;
  current_1 = 0;
  rollDiceEl.classList.remove("disable-click");
  holdEl.classList.remove("disable-click");
  if (
    player0El.classList.contains("player-wins") ||
    player1El.classList.contains("player-wins")
  ) {
    player0El.classList.remove("player-wins");
    playerName0El.textContent = "PLAYER 1";
    player1El.classList.remove("player-wins");
    playerName1El.textContent = "PLAYER 2";
  }
  if (!player0El.classList.contains("player-active")) {
    player1El.classList.remove("player-active");
    player0El.classList.add("player-active");
  }
  if (!diceImage.classList.contains("hidden")) {
    diceImage.classList.add("hidden");
  }
});

rollDiceEl.addEventListener("click", function () {
  if (player0El.classList.contains("player-active")) {
    diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `${"img/dice-" + String(diceNumber) + ".png"}`;
    if (diceImage.classList.contains("hidden")) {
      diceImage.classList.remove("hidden");
    }
    if (diceNumber !== 1) {
      current_0 += diceNumber;
      currentScore0El.textContent = current_0;
    } else {
      player0El.classList.remove("player-active");
      player1El.classList.add("player-active");
      currentScore0El.textContent = 0;
      current_0 = 0;
    }
  } else {
    diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `${"img/dice-" + String(diceNumber) + ".png"}`;
    if (diceImage.classList.contains("hidden")) {
      diceImage.classList.remove("hidden");
    }
    if (diceNumber !== 1) {
      current_1 += diceNumber;
      currentScore1El.textContent = current_1;
    } else {
      player1El.classList.remove("player-active");
      player0El.classList.add("player-active");
      currentScore1El.textContent = 0;
      current_1 = 0;
    }
  }
});

holdEl.addEventListener("click", function () {
  if (player0El.classList.contains("player-active")) {
    totalScore_0 += current_0;
    current_0 = 0;
    totalScore0El.textContent = totalScore_0;
    currentScore0El.textContent = 0;

    if (totalScore_0 >= 100) {
      player0El.classList.add("player-wins");
      playerName0El.textContent = "🎉WINNER!!!";
      rollDiceEl.classList.add("disable-click");
      holdEl.classList.add("disable-click");
    } else {
      player0El.classList.remove("player-active");
      player1El.classList.add("player-active");
    }
  } else {
    totalScore_1 += current_1;
    current_1 = 0;
    totalScore1El.textContent = totalScore_1;
    currentScore1El.textContent = 0;

    if (totalScore_1 >= 100) {
      player1El.classList.add("player-wins");
      playerName1El.textContent = "🎉WINNER!!!";
      rollDiceEl.classList.add("disable-click");
      holdEl.classList.add("disable-click");
    } else {
      player1El.classList.remove("player-active");
      player0El.classList.add("player-active");
    }
  }
});
