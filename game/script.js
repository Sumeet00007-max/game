const choices = document.querySelectorAll('.option-circle');
const playerChoiceDisplay = document.getElementById('player-picked');
const computerChoiceDisplay = document.getElementById('pc-picked');
const resultDisplay = document.getElementById('result-display');
const playAgainButton = document.getElementById('play-again-btn');
const computerScoreVal = document.getElementById('computer-score-val');
const playerScoreVal = document.getElementById('player-score-val');
const resultContainer = document.getElementById('result-container');
const optionsContainer = document.getElementById('options-container');
const rulesBtn = document.getElementById('rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');
const rulesPopup = document.getElementById('rules-popup');

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showResultView();
    updateGameUI(winner, playerChoice, computerChoice);
    updateScores();
  });
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  } else if (
    (playerChoice === 'rock ' && computerChoice === 'scissors ') ||
    (playerChoice === 'scissors ' && computerChoice === 'paper ') ||
    (playerChoice === 'paper ' && computerChoice === 'rock ')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function updateGameUI(winner, playerChoice, computerChoice) {
  playerChoiceDisplay.innerHTML = `YOU PICKED <br> ${capitalize(playerChoice)}`;
  computerChoiceDisplay.innerHTML = `PC PICKED <br> ${capitalize(computerChoice)}`;

  if (winner === 'player') {
    resultDisplay.textContent = 'YOU WIN AGAINST PC';
    resultDisplay.classList.add('win-message');
  } else if (winner === 'computer') {
    resultDisplay.textContent = 'YOU LOSE AGAINST PC';
    resultDisplay.classList.add('lose-message');
  } else {
    resultDisplay.textContent = 'IT\'S A DRAW';
    resultDisplay.classList.add('draw-message');
  }

  playAgainButton.style.display = 'block';
}

function updateScores() {
  if (resultDisplay.textContent.includes('WIN')) {
    playerScore++;
  } else if (resultDisplay.textContent.includes('LOSE')) {
    computerScore++;
  }
  playerScoreVal.textContent = playerScore;
  computerScoreVal.textContent = computerScore;
}

playAgainButton.addEventListener('click', () => {
  hideResultView();
});

function showResultView() {
  optionsContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  playAgainButton.style.display = 'block';
}

function hideResultView() {
  resultContainer.style.display = 'none';
  optionsContainer.style.display = 'flex';
  playAgainButton.style.display = 'none';
  resultDisplay.textContent = '';
  playerChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
}

rulesBtn.addEventListener('click', () => {
  rulesPopup.style.display = 'block';
});

closeRulesBtn.addEventListener('click', () => {
  rulesPopup.style.display = 'none';
});

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}