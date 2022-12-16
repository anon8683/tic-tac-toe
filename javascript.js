/* eslint-disable no-plusplus */
const { log } = console;
const announceWinner = document.getElementById("gameWinner");
const cells = document.querySelectorAll(".cell");

let ai = false;
let player1score = 0;
let player2score = 0;

let turn = "x";

const gameBoard = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	return { board };
})();

// Disables click on our cells
function disableClick() {
	cells.forEach((cell) => {
		cell.classList.add("noClick");
	});
}

function displayArray() {
	// need to put our array items into corresponding dom elements
	for (let index = 0; index < gameBoard.board.length; index += 1) {
		const element = gameBoard.board[index];
		const cellToChange = document.getElementById(`${index}`);
		cellToChange.textContent = element;
	}
}
// resets out gameboard array and displays it
function resetGame() {
	gameBoard.board = ["", "", "", "", "", "", "", "", ""];
	announceWinner.textContent = "";
	cells.forEach((cell) => {
		cell.classList.remove("noClick");
	});
	displayArray();
}
function displayResults(roundWinner) {
	const p1 = document.getElementById("p1score");
	const p2 = document.getElementById("p2score");
	const winner = roundWinner;
	setTimeout(() => {
		document.getElementById("roundWinner").style.opacity = 100;
		document.getElementById("roundWinner").style.visibility = "visible";
	}, 250);

	if (winner === "x") {
		player1score++;
		p1.textContent = player1score;
		announceWinner.textContent = "Player 1 won that round!";
	}
	if (winner === "o") {
		player2score++;
		p2.textContent = player2score;
		announceWinner.textContent = "Player 2 won that round!";
	}
	if (winner === "tie") {
		announceWinner.textContent = "That was a draw";
	}

	setTimeout(() => {
		resetGame();
		document.getElementById("roundWinner").style.opacity = 0;
		document.getElementById("roundWinner").style.visibility = "hidden";
	}, 1500);
}
log(gameBoard.board);
function checkWinner() {
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
			disableClick();
			displayResults("x");
			return;
		}
		if (winCombo[i].every(checkO)) {
			disableClick();
			displayResults("o");
			return;
		}
	}

	if (gameBoard.board.every(checkTie)) {
		displayResults("tie");
		disableClick();
	}
}
function aiTurn() {
	const freeIndex = [];
	for (let i = 0; i < gameBoard.board.length; i++) {
		if (gameBoard.board[i] === "") freeIndex.push(i);
	}

	const randomNumber = Math.floor(Math.random() * freeIndex.length);
	const aiChoice = freeIndex[randomNumber];
	if (freeIndex.length === 0) {
		return;
	}

	gameBoard.board.splice(aiChoice, 1, turn);
	checkWinner();
	displayArray();
	log(freeIndex);
	log(randomNumber);
	log(aiChoice);
}

// When a cell is clicked update the corresponding array index
const cell = document.querySelectorAll(".cell");
cell.forEach((box) => {
	box.addEventListener("click", () => {
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
			if (ai === true) {
				setTimeout(() => {
					aiTurn();
					turn = "x";
				}, 100);
			}
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

function closeOverlay() {
	const overlay = document.getElementById("overlay");
	overlay.style.opacity = 0;
	overlay.style.visibility = "hidden";
}

// it' called on button click, ignore eslint
// eslint-disable-next-line no-unused-vars
function startPvp() {
	const input1 = document.getElementById("playerInput1");
	const input2 = document.getElementById("playerInput2");
	const name1 = document.getElementById("p1");
	const name2 = document.getElementById("p2");

	name1.textContent = input1.value;
	name2.textContent = input2.value;

	if (input1.value === "") {
		name1.textContent = "Player 1";
	}
	if (input2.value === "") {
		name2.textContent = "Player 2";
	}

	closeOverlay();
}
function pvpInputs() {
	const pvp = document.getElementById("pvp");

	if (document.getElementById("pve") !== null) {
		document.getElementById("pve").remove();
	}
	pvp.classList.remove("choice");
	pvp.classList.add("choiceActive");
	pvp.style.marginTop = 0;
	document.getElementById("initiate").style.gap = 0;

	document.querySelector(".inputs").style.opacity = 100;
	document.getElementById("start").style.opacity = 100;
}
const choice = document.querySelectorAll(".choice");
choice.forEach((choices) => {
	choices.addEventListener("click", () => {
		if (choices.id === "pve") {
			ai = true;
			document.getElementById("p2").textContent = "Computer";
			document.getElementById("p1").textContent = "You";
			closeOverlay();
			return;
		}
		pvpInputs();
	});
});
