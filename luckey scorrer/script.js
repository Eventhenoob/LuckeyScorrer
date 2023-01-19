"use strict";
// naming players
const player1Name = prompt("Enter First Player Name:");
const player2Name = prompt("Enter Second Player Name:");
document.querySelector(".player--1").textContent = player1Name;
document.querySelector(".player--2").textContent = player2Name;

// User Interface

var root = document.querySelector(":root");

const side1UI = document.querySelector(".side-1");
const side2UI = document.querySelector(".side-2");

const scoreMain1UI = document.querySelector(".score--main-1");
const scoreMain2UI = document.querySelector(".score--main-2");

const currentScore1UI = document.querySelector(".score--sub-1");
const currentScore2UI = document.querySelector(".score--sub-2");

const diceUI = document.querySelector(".dice");

// Button's
const btnReset = document.querySelector(".btn--reset");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Mechanics
let currentPlayer = 1;
let currentScore = 0;

let mainScore1 = 0;
let mainScore2 = 0;

let isGameOver = false;

reset();

// functions

const checkWinner = function () {
  const mainScore = getCompnentByCurrentPlayer(mainScore1, mainScore2);
  if (mainScore >= 100) {
    const side = getCompnentByCurrentPlayer(side1UI, side2UI);
    side.classList.add("side--winner");
    // changing color theme when game is over
    root.style.setProperty("--color-theme-1", "#DF2935");
    root.style.setProperty("--color-theme-2", "#C94E4C");
    isGameOver = true;
  }
};

// globel function
function reset() {
  currentPlayer = 1;
  currentScore = 0;
  mainScore1 = 0;
  mainScore2 = 0;
  isGameOver = false;
  root.style.setProperty("--color-theme-1", "#edcc0f");
  root.style.setProperty("--color-theme-2", "#7abf0ac3");

  if (side2UI.classList.contains("side--winner"))
    side2UI.classList.remove("side--winner");

  if (side1UI.classList.contains("side--winner"))
    side1UI.classList.remove("side--winner");

  if (side2UI.classList.contains("side--active")) {
    side2UI.classList.remove("side--active");
  }

  if (!side1UI.classList.contains("side--active")) {
    side1UI.classList.add("side--active");
  }

  scoreMain1UI.textContent = scoreMain2UI.textContent = 0;

  currentScore1UI.textContent = currentScore2UI.textContent = 0;

  if (!diceUI.classList.contains("hidden")) diceUI.classList.add("hidden");
}

const changeActiveSide = function () {
  side1UI.classList.toggle("side--active");
  side2UI.classList.toggle("side--active");
};

const switchUser = function () {
  const scoreUI = getCompnentByCurrentPlayer(currentScore1UI, currentScore2UI);
  scoreUI.textContent = currentScore = 0;
  if (currentPlayer === 1) currentPlayer = 2;
  else currentPlayer = 1;
  changeActiveSide();
};

const forScore = function (number) {
  const scoreUI = getCompnentByCurrentPlayer(currentScore1UI, currentScore2UI);

  if (number === 1) {
    switchUser();
    return;
  }
  scoreUI.textContent = currentScore += number;
};

function getCompnentByCurrentPlayer(comp1, comp2) {
  return currentPlayer === 1 ? comp1 : comp2;
}

// when pressing roll button
btnRoll.addEventListener("click", function (event) {
  if (!isGameOver) {
    event.preventDefault();
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    diceUI.classList.remove("hidden");
    diceUI.src = `dice-${randomNumber}.png`;

    forScore(randomNumber);
  }
});

// when pressing hold button
btnHold.addEventListener("click", function (event) {
  if (!isGameOver) {
    event.preventDefault();
    if (currentPlayer === 1)
      scoreMain1UI.textContent = mainScore1 += currentScore;
    else scoreMain2UI.textContent = mainScore2 += currentScore;
    checkWinner();
    switchUser();
  }
});

// when pressing new game button
btnReset.addEventListener("click", reset);
