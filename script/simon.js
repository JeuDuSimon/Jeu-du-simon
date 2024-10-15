let score = 0;
let time = 300;

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
  for (let i = 0; i < tab.length; i++) {
    let highlightedColor = document.getElementById(tab[i]);
    highlightedColor.style.opacity = "0.5";
    backgroundScreen.style.backgroundColor = tab[i];
    setTimeout(() => {
      highlightedColor.style.opacity = "1";
      backgroundScreen.style.backgroundColor = "white";
    }, 1000);
  }
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
          simonTurn();
          score++
          document.querySelector("#score").innerHTML = score;
          clikedColors = [];
        } else {
          alert("t'a perdu 👎🏻");
        }
      });
    });
  };
  
const simonTurn = () => {
  state.innerHTML = "Simon";
  generateRandomColor(possibleColors);
  highlightSelectedColor(gameColorsPattern);
};

simonTurn();
userChooseAColor();
