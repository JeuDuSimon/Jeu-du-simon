let score = 0;
let isUserTurn = false;

const possibleColors = ["orange", "purple", "red", "yellow", "blue", "green"];
const state = document.querySelector("#turn");

let gameColorsPattern = [];
let clikedColors = [];

const backgroundScreen = document.getElementById("background-screen");

const generateRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * possibleColors.length);
  const selectedColor = possibleColors[randomIndex];
  gameColorsPattern.push(selectedColor);
};

const highlightSelectedColor = (tab) => {
  let delay = 1000;
  tab.forEach((color, index) => {
    setTimeout(() => {
      const highlightedColor = document.getElementById(color);
      highlightedColor.style.opacity = "0.5";
      backgroundScreen.style.backgroundColor = color;

      setTimeout(() => {
        highlightedColor.style.opacity = "1";
      }, 500);
    }, index * delay);
  });

  setTimeout(() => {
    backgroundScreen.style.backgroundColor = "white";
    isUserTurn = true; // C'est le tour du joueur
    updateTurnDisplay();
    userChooseAColor();
  }, tab.length * delay);
};

const userChooseAColor = () => {
  const buttonClicked = document.querySelectorAll(".game-button");

  buttonClicked.forEach((button) => {
    button.onclick = () => {
      if (!isUserTurn) return; // Ignorer les clics si ce n'est pas le tour du joueur

      clikedColors.push(button.id);
      console.log(clikedColors);
      console.log(gameColorsPattern);

      // Vérification du motif
      if (clikedColors.length === gameColorsPattern.length) {
        const isCorrectPattern = clikedColors.every((color, index) => color === gameColorsPattern[index]);

        if (isCorrectPattern) {
          score++;
          document.querySelector("#score").innerHTML = score;
          clikedColors = [];
          isUserTurn = false; // Fin du tour du joueur
          updateTurnDisplay();
          simonTurn(); // Passer au tour de Simon
        } else {
          alert("T'as perdu 👎🏻");
          resetGame();
        }
      }
    };
  });
};

const simonTurn = () => {
  isUserTurn = false; // C'est le tour de Simon
  generateRandomColor();
  highlightSelectedColor(gameColorsPattern);
};

const resetGame = () => {
  score = 0;
  clikedColors = [];
  gameColorsPattern = [];
  document.querySelector("#score").innerHTML = score;
  simonTurn();
  updateTurnDisplay();
};

const updateTurnDisplay = () => {
  state.innerHTML = isUserTurn ? "You" : "Simon";
};

// Démarre le jeu pour la première fois
simonTurn();
