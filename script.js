var isRules = false; //true if rules are open
const gameItems = ["rock", "paper", "scissors"];
var pcScore = 0;
var userScore = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  if (localStorage.rpsPcScore) {
    pcScore = localStorage.getItem("rpsPcScore");
    userScore = localStorage.getItem("rpsUserScore");
  } else {
    localStorage.setItem("rpsPcScore", 0);
    localStorage.setItem("rpsUserScore", 0);
  }

  document.getElementById("user-score").textContent = userScore;
  document.getElementById("comp-score").textContent = pcScore;
});

function showRules() {
  isRules = !isRules; //toggle rules
  let display = isRules ? "block" : "none";
  document.getElementById("rules-section").style = `display: ${display}`;
}

function hurrayPage() {
  document.getElementById("game-result").style.display = "none";
  document.getElementById("leader-head").style.display = "none";
  document.getElementById("main-section").style.height = "1vh";
  document.getElementById("hurray").style.display = "block";
  document.getElementById("next-button").style.display = "none";
}

function replay() {
  let user = document.getElementById("user");
  user.removeAttribute("class");
  user.setAttribute("class", "r-p-s-comp");
  let pc = document.getElementById("pc");
  pc.removeAttribute("class");
  pc.setAttribute("class", "r-p-s-comp");
  document.querySelector(".replay").textContent = "PLAY AGAIN";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("game-result").style.display = "none";
  document.getElementById("start-game").style.display = "flex";
  document.getElementById("hurray").style.display = "none";
  document.getElementById("leader-head").style.display = "flex";
  document.getElementById("main-section").style.height = "60vh";
  document.querySelector(".declaration p").style.display = "block";
}

function startGame(userSelection) {
  let randomNo = Math.round(Math.random() * 2);
  let compSelection = gameItems[randomNo];
  let resultHead = "";
  let winner = "";

  console.log("User selected: ", userSelection);
  console.log("Computer selected: ", compSelection);

  if (userSelection === compSelection) {
    console.log("IT'S A TIE");
    winner = "tie";
  } else if (userSelection === "rock") {
    if (compSelection === "paper") {
      console.log("COMPUTER WINS");
      winner = "pc";
    } else {
      console.log("USER WINS");
      winner = "user";
    }
  } else if (userSelection === "paper") {
    if (compSelection === "scissors") {
      console.log("COMPUTER WINS");
      winner = "pc";
    } else {
      console.log("USER WINS");
      winner = "user";
    }
  } else if (userSelection === "scissors") {
    if (compSelection === "rock") {
      console.log("COMPUTER WINS");
      winner = "pc";
    } else {
      console.log("USER WINS");
      winner = "user";
    }
  }

  let user = document.getElementById("user");
  let pc = document.getElementById("pc");
  document.querySelector(
    "#user img"
  ).style.content = `url(./assets/${userSelection}.png)`;
  user.classList.add(`${userSelection}-comp`);
  document.querySelector(
    "#pc img"
  ).style.content = `url(./assets/${compSelection}.png)`;
  pc.classList.add(`${compSelection}-comp`);

  if (winner === "tie") {
    resultHead = "TIE UP";
    document.querySelector(".declaration p").style.display = "none";
    document.querySelector(".replay").textContent = "REPLAY";
  } else if (winner === "pc") {
    resultHead = "YOU LOST";
    pc.classList.add(`winner`);
    pcScore++;
  } else {
    resultHead = "YOU WIN";
    document.getElementById("next-button").style.display = "block";
    user.classList.add(`winner`);
    userScore++;
  }

  localStorage.rpsPcScore = pcScore;
  localStorage.rpsUserScore = userScore;

  document.querySelector(".declaration h1").textContent = resultHead;
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("comp-score").textContent = pcScore;
  document.getElementById("start-game").style = "display:none";
  document.getElementById("game-result").style = "display:flex";
}
