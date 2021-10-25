function bestPlay() {
  if (!playerTurn) {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, 0, false);

          board[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    board[bestMove.i][bestMove.j] = ai;
    grid.forEach((item) => {
      if (item.dataset.row == bestMove.i && item.dataset.column == bestMove.j) {
        item.classList.add(ai);
      }
    });
    playerTurn = true;
    if (checkAll() !== null) {
      if (checkAll() == "tie") {
        endGame(`${checkAll()}`);
      } else {
        endGame(`${checkAll()} win`);
      }
    }
  }
}

function minimax(board, depth, isMaximizing) {
  let result = checkAll();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = player;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
