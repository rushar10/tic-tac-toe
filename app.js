const boardScript = document.querySelector(".board");
const showStatus = document.querySelector(".win-container");
const msg = document.getElementById("msg");
const circleChoose = document.getElementById("circle-button");
const crossChosse = document.getElementById("cross-button");
const playAgainBtn = document.getElementById("play-again");
const popUp = document.querySelector(".popup");
const popUpContainer = document.querySelector(".popup-container");
let playerTurn = false;
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let win = false;
let count = 0;
circleChoose.addEventListener("click", () => {
  popUpContainer.classList.add("hide-popup-container");
  popUp.classList.add("hide-popup");
  count = 0;
});

crossChosse.addEventListener("click", () => {
  popUpContainer.classList.add("hide-popup-container");
  popUp.classList.add("hide-popup");
  count = 1;
});
function displayBoard() {
  boardScript.innerHTML = null;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      boardScript.innerHTML += `
      <div class="grid ${
        board[i][j] && board[i][j]
      }" data-row=${i} data-column=${j}>
      <div></div>
      </div>`;
    }
  }
  checkAll();
  const grid = document.querySelectorAll(".grid");
  grid.forEach((item) => {
    item.addEventListener("click", (e) => {
      const currentGridRow = parseInt(e.currentTarget.dataset.row);
      const currentGridColumn = parseInt(e.currentTarget.dataset.column);
      if (!board[currentGridRow][currentGridColumn]) {
        board[currentGridRow][currentGridColumn] = crossAndCircle[count];
        count++;
        occupied++;
        if (count === 2) {
          count = 0;
        }
      }
      displayBoard();
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  displayBoard();
});
playAgainBtn.addEventListener("click", playAgain);
const crossAndCircle = ["circle", "cross"];

let occupied = 0;
function rowCheck() {
  for (let i = 0; i < board.length; i++) {
    const set = new Set(board[i]);
    if (
      (set.has(crossAndCircle[0]) || set.has(crossAndCircle[1])) &&
      set.size === 1
    ) {
      win = true;
      endGame(`${set.values().next().value} win`);
      break;
    }
  }
}

function columnCheck() {
  for (let i = 0; i < board.length; i++) {
    const col = [board[0][i], board[1][i], board[2][i]];
    const set = new Set(col);
    if (
      (set.has(crossAndCircle[0]) || set.has(crossAndCircle[1])) &&
      set.size === 1
    ) {
      win = true;
      endGame(`${set.values().next().value} win`);
      break;
    }
  }
}

function crossCheck() {
  const cross1 = [board[0][0], board[1][1], board[2][2]];
  const cross2 = [board[0][2], board[1][1], board[2][0]];
  const set1 = new Set(cross1);
  const set2 = new Set(cross2);
  if (
    ((set1.has(crossAndCircle[0]) || set1.has(crossAndCircle[1])) &&
      set1.size === 1) ||
    ((set2.has(crossAndCircle[0]) || set2.has(crossAndCircle[1])) &&
      set2.size === 1)
  ) {
    win = true;
    endGame(
      `${
        set1.size === 1
          ? set1.values().next().value
          : set2.values().next().value
      } win`
    );
  }
}

function checkAll() {
  rowCheck();
  columnCheck();
  crossCheck();
  Draw();
}

function endGame(message) {
  setTimeout(() => {
    msg.textContent = message;
    showStatus.style.zIndex = 999;
  }, 200);
}

function playAgain() {
  count = 0;
  occupied = 0;

  win = false;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = "";
    }
  }
  displayBoard();
  setTimeout(() => {
    msg.textContent = "";
    showStatus.style.zIndex = -999;
  }, 200);
}

function Draw() {
  if (occupied === 9 && !win) {
    endGame("Draw");
  }
}

function random(n) {
  return Math.floor(Math.random() * n);
}
const bot = () => {
  const cornor = [0, 2];
};
