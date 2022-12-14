const { log } = console;
function factoryPlayer(name, number) {
	return {
		name,
		number,
	};
}

const player1 = factoryPlayer("Player", 1);
const player2 = factoryPlayer("Player", 2);
let turn = "x";
const hello = "hi";

const gameBoard = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	return { board };
})();

function displayArray() {
	// need to put our array items into corresponding dom elements
	for (let index = 0; index < gameBoard.board.length; index += 1) {
		const element = gameBoard.board[index];
		const cellToChange = document.getElementById(`${index}`);
		cellToChange.textContent = element;
	}
}
function checkX(sign) {
	return sign === "x";
}
function checkO(sign) {
	return sign === "o";
}

log(gameBoard.board);
function checkWinner() {
	const winCombo = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < winCombo.length; i += 1) {
		winCombo[i].forEach((element, index) => {
			winCombo[i][index] = gameBoard.board[element];
		});

		if (winCombo[i].every(checkX)) {
			log(" X  WINNER");
		}
		if (winCombo[i].every(checkO)) {
			log("O WINNER");
		}
	}
}

// When a cell is clicked update the corresponding array index
const cell = document.querySelectorAll(".cell");
cell.forEach((box) => {
	box.addEventListener("click", (e) => {
		if (gameBoard.board[+box.id] !== "") {
			return;
		}

		if (turn === "x") {
			gameBoard.board.splice(+box.id, 1, turn);
			turn = "o";
			displayArray();
			checkWinner();
			return;
		}
		gameBoard.board.splice(+box.id, 1, turn);
		turn = "x";
		displayArray();
		checkWinner();
	});
});
