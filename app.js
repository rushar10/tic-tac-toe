const boardScript = document.querySelector(".board");
const showStatus = document.querySelector(".win-container");
const msg = document.getElementById("msg");
const chooseBtn = document.querySelectorAll(".btn");
const playAgainBtn = document.getElementById("play-again");
const popUp = document.querySelector(".popup");
const popUpContainer = document.querySelector(".popup-container");
let grid;
let playerTurn = false;
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let player;
let ai;
let scores;

chooseBtn.forEach((item) => {
  item.addEventListener("click", () => {
    popUpContainer.classList.add("hide-popup-container");
    popUp.classList.add("hide-popup");
    if (item.dataset.id === "circle") {
      player = "circle";
      ai = "cross";
    } else {
      ai = "circle";
      player = "cross";
    }
    if (ai == "circle") {
      scores = {
        tie: 0,
        circle: 1,
        cross: -1,
      };
    } else {
      scores = {
        tie: 0,
        circle: -1,
        cross: 1,
      };
    }
    bestPlay();
  });
});

function displayBoard() {
  boardScript.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      boardScript.innerHTML += `
      <div class="grid" data-row=${i} data-column=${j}>
      <div></div>
      </div>`;
    }
  }
  grid = document.querySelectorAll(".grid");
  grid.forEach((item) => {
    item.addEventListener("click", (e) => {
      const currentGridRow = parseInt(e.currentTarget.dataset.row);
      const currentGridColumn = parseInt(e.currentTarget.dataset.column);
      if (!board[currentGridRow][currentGridColumn] && playerTurn) {
        board[currentGridRow][currentGridColumn] = player;
        e.currentTarget.classList.add(player);
        playerTurn = false;
        if (checkAll() !== null) {
          if (checkAll() == "tie") {
            endGame(`${checkAll()}`);
          } else {
            endGame(`${checkAll()} win`);
          }
        }
      }
      bestPlay();
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  displayBoard();
});
playAgainBtn.addEventListener("click", playAgain);

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}
function checkAll() {
  let winner = null;
  // Horizontal check
  for (let i = 0; i < board.length; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical Check
  for (let i = 0; i < board.length; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // cross check
  if (
    equals3(board[0][0], board[1][1], board[2][2]) ||
    equals3(board[2][0], board[1][1], board[0][2])
  ) {
    winner = board[1][1];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function endGame(message) {
  setTimeout(() => {
    msg.textContent = message;
    showStatus.style.zIndex = 999;
  }, 200);
}

function playAgain() {
  occupied = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = "";
    }
  }
  displayBoard();
  playerTurn = false;
  bestPlay();
  setTimeout(() => {
    msg.textContent = "";
    showStatus.style.zIndex = -999;
  }, 200);
}
