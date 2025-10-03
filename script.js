const board = document.getElementById("board");
const statusText = document.getElementById("status");
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const human = "X";
const ai = "O";

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", () => handleHumanMove(index));
    board.appendChild(cell);
  });
}

function handleHumanMove(index) {
  if (gameState[index] !== "" || !gameActive) return;
  makeMove(index, human);
  if (gameActive) {
    setTimeout(aiMove, 500); // AI plays after short delay
  }
}

function aiMove() {
  let emptyCells = gameState
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  if (emptyCells.length === 0) return;
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, ai);
}

function makeMove(index, player) {
  gameState[index] = player;
  const cell = board.querySelector(`[data-index='${index}']`);
  cell.textContent = player;
  cell.classList.add("taken");

  checkResult(player);
}

function checkResult(player) {
  let won = winningConditions.some(condition => {
    return condition.every(index => gameState[index] === player);
  });

  if (won) {
    statusText.textContent = (player === human ? "You win! 🎉" : "AI wins! 🤖");
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  statusText.textContent = (player === human ? "AI's turn..." : "Your turn (X)");
}

function resetGame() {
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Your turn (X)";
  createBoard();
}

createBoard();
