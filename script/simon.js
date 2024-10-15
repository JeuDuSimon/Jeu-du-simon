let score = 0;
let time = 300;
let isUserTurn = false;

const possibleColors = ["orange", "purple", "red", "yellow", "blue", "green"];
const state = document.querySelector("#turn");

let gameColorsPattern = [];
let clikedColors = [];

const backgroundScreen = document.getElementById("background-screen");

const generateRandomColor = (tab) => {
  let selectedColor;
  let RandomNumber = Math.floor(Math.random() * tab.length);
  selectedColor = possibleColors[RandomNumber];
  console.log(selectedColor);
  gameColorsPattern.push(selectedColor);
};

const highlightSelectedColor = (tab) => {
  let delay = 1000; // Délai entre chaque couleur
  tab.forEach((color, index) => {
    setTimeout(() => {
      let highlightedColor = document.getElementById(color);
      highlightedColor.style.opacity = "0.5"; // Diminue l'opacité
      backgroundScreen.style.backgroundColor = color; // Change le fond

      // Remet l'opacité à 1 après un certain temps
      setTimeout(() => {
        highlightedColor.style.opacity = "1"; // Rétablit l'opacité
      }, 500); // Délai avant de remettre l'opacité
    }, index * delay); // Calcule le délai en fonction de l'index
  });

  // Affiche l'écran blanc après la dernière couleur
  setTimeout(() => {
    backgroundScreen.style.backgroundColor = "white"; // Change le fond à blanc
  }, tab.length * delay); // Délai après toutes les couleurs
};

const userChooseAColor = () => {
  let buttonClicked = document.querySelectorAll(".game-button");

  buttonClicked.forEach((button) => {
    button.addEventListener("click", () => {
      clikedColors.push(button.id);
      console.log(clikedColors);
      console.log(gameColorsPattern);

      // Vérifiez si le motif est correct
      let isCorrectPattern = true; // Variable pour suivre l'état du motif
      for (let i = 0; i < clikedColors.length; i++) {
        if (clikedColors[i] !== gameColorsPattern[i]) {
          isCorrectPattern = false; // Si une couleur ne correspond pas, mettez à jour la variable
          break; // Sortir de la boucle dès qu'une correspondance échoue
        }
      }

      if (isCorrectPattern) {
        if (clikedColors.length === gameColorsPattern.length) {
          score++;
          document.querySelector("#score").innerHTML = score;
          clikedColors = [];
          isUserTurn = !isUserTurn;
          simonTurn(); // Appelle la fonction pour la prochaine étape
        }
      } else {
        alert("T'as perdu 👎🏻");
        // Réinitialisez les variables pour recommencer
        resetGame();
      }
    });
  });
};

if (isUserTurn) {
    state.innerHTML = "You";
  } else {
    state.innerHTML = "Simon";
  }

const simonTurn = () => {
  generateRandomColor(possibleColors);
  highlightSelectedColor(gameColorsPattern);
  isUserTurn = !isUserTurn;
};

const resetGame = () => {
  score = 0;
  clikedColors = [];
  gameColorsPattern = [];
  document.querySelector("#score").innerHTML = score; // Réinitialiser l'affichage du score
  simonTurn(); // Redémarre le jeu
};

// Démarre le jeu pour la première fois
simonTurn();
userChooseAColor();


