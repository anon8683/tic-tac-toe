const { log } = console;
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

function factoryPlayer(name, number) {
	return {
		name,
		number,
	};
}

const player1 = factoryPlayer("Player", 1);
const player2 = factoryPlayer("Player", 2);
let turn = "x";

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

log(gameBoard.board);
function checkWinner() {
	let player1score = 0;
	let player2score = 0;

	// all winning combonations
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

	// functions to check every()
	function checkX(sign) {
		return sign === "x";
	}
	function checkO(sign) {
		return sign === "o";
	}
	function checkTie(sign) {
		return sign !== "";
	}

	// Checks each array in combo's, changes each element to board[element]
	// checks if every element in that array is === x or === o, if yes that is winner
	for (let i = 0; i < winCombo.length; i += 1) {
		winCombo[i].forEach((element, index) => {
			winCombo[i][index] = gameBoard.board[element];
		});

		if (winCombo[i].every(checkX)) {
			log(" X  WINNER");
			player1score++;
			document.getElementById("p1score").textContent = player1score;
			return;
		}
		if (winCombo[i].every(checkO)) {
			log("O WINNER");
			player2score++;
			document.getElementById("p2score").textContent = player2score;
			return;
		}
	}

	if (gameBoard.board.every(checkTie)) {
		log("tie");
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
			p1.classList.remove("active");
			p2.classList.add("active");
			displayArray();
			checkWinner();
			return;
		}
		gameBoard.board.splice(+box.id, 1, turn);
		turn = "x";
		p2.classList.remove("active");
		p1.classList.add("active");
		displayArray();
		checkWinner();
	});
});
