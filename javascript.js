/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
// eslint-disable-next-line no-console

const { log } = console;
function factoryPlayer(name, number) {
  return {
    name, number,
  };
}

const player1 = factoryPlayer('Player', 1);
const player2 = factoryPlayer('Player', 2);
let turn = 'x';

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  return { board };
})();

function displayArray() {
// need to put our array items into corresponding dom elements
  for (let index = 0; index < gameBoard.board.length; index++) {
    const element = gameBoard.board[index];
    const cellToChange = document.getElementById(`${index}`);
    cellToChange.textContent = element;
  }
}

log(gameBoard.board);
function checkWinner() {
  const winArray = [3, 4, 5];
  const xWins = 0;
  const oWins = 0;

  const indexToCheck = [];

  for (let index = 0; index < winArray.length; index++) {
    const boardIndex = winArray[index];
    indexToCheck.push(boardIndex);
  }

  log(indexToCheck);

  // for (let index = 0; index < winArray.length; index++) {
  //   const element = winArray[index];
  //   for (let i = 0; i < element.length; i++) {
  //     const boardIndex = element[i];
  //     if (gameBoard.board[boardIndex] === 'x') {
  //       xWins++;
  //     } else if (gameBoard.board[boardIndex] === 'o') {
  //       oWins++;
  //     }
  //   }
  //   if (xWins === 3) {
  //     log('X WINNER');
  //   }

  //   if (oWins === 3) {
  //     log('O WINNER');
  //   }
  // }
}

// When a cell is clicked update the corresponding array index
const cell = document.querySelectorAll('.cell');
cell.forEach((box) => {
  box.addEventListener('click', (e) => {
    log('clicked');
    if (gameBoard.board[+box.id] !== '') {
      return;
    }

    if (turn === 'x') {
      gameBoard.board.splice(+box.id, 1, turn);
      turn = 'o';
      displayArray();
      checkWinner();
      return;
    }
    gameBoard.board.splice(+box.id, 1, turn);
    turn = 'x';
    displayArray();
    checkWinner();
  });
});
