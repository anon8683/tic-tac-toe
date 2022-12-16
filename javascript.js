/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
const { log } = console;
const announceWinner = document.getElementById("gameWinner");
const cells = document.querySelectorAll(".cell");
let winCombs = [[]];
const realCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function smarter() {
	for (let i = 0; i < winCombs.length; i++) {
		const element = winCombs[i];
		if (
			element.indexOf("o") !== element.lastIndexOf("o") &&
			element.includes("")
		) {
			const smartMoveIndex = element.indexOf("");
			const smartestMove = realCombo[i][smartMoveIndex];

			return smartestMove;
		}
	}
}

let player1score = 0;
let player2score = 0;
let player1 = "Player 1";
let player2 = "Player 2";

// Initial vars, x will be the first turn
let turn = "x";
let ai = false;

// our gameboard array. filled with 9 empty strings
const gameBoard = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	return { board };
})();

// Disables click on our cells, called when a winner is detected
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

		// since our cells id are "0-9" we know that "0" cell should be equal
		// to whatever is gameBoard.board[0]. loop through each board element
		// and change the corresponding cell to display that array element
	}
}
// resets out gameboard array and displays it
// allows for cells to be clicked again by removing noClick class
function resetGame() {
	gameBoard.board = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((cell) => {
		cell.classList.remove("noClick");
	});
	displayArray();
}

// displays the results of the round and adjusts the scores of player 1 / player 2
function displayResults(roundWinner) {
	const p1 = document.getElementById("p1score");
	const p2 = document.getElementById("p2score");
	const winner = roundWinner;

	// This brings up over round winner overlay
	setTimeout(() => {
		document.getElementById("roundWinner").style.opacity = 100;
		document.getElementById("roundWinner").style.visibility = "visible";
	}, 250);

	// adjust the score and winner text based on results from checkWinner()
	if (winner === "x") {
		player1score++;
		p1.textContent = player1score;
		announceWinner.textContent = `${player1} won that round!`;
	}
	if (winner === "o") {
		player2score++;
		p2.textContent = player2score;
		announceWinner.textContent = `${player2} won that round!`;
	}
	if (winner === "tie") {
		announceWinner.textContent = "That was a draw";
	}

	// after 1.5s, reset board, and remove round announce overlay
	setTimeout(() => {
		resetGame();
		document.getElementById("roundWinner").style.opacity = 0;
		document.getElementById("roundWinner").style.visibility = "hidden";
	}, 1500);
}

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
	// if a winner is found, clicks are disabled and results are displayed
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
	winCombs = winCombo;
}
function aiTurn() {
	// ai has to determine what indexes of the board array have not been filled with an X or O
	// iterate through each element in board array, if it contains an empty string ""
	// then push that index (i) to our new array
	// if (gameBoard.board.includes("o")) {
	// 	const indexO = gameBoard.board.indexOf("o");
	// 	if (gameBoard.board[indexO - 1] === "") {
	// 		const smarterChoice = indexO - 1;
	// 		gameBoard.board.splice(smarterChoice, 1, turn);
	// 		checkWinner();
	// 		displayArray();
	// 		return;
	// 	}
	// }

	if (
		gameBoard.board.includes("o") &&
		gameBoard.board.indexOf("o") !== gameBoard.board.lastIndexOf("o")
	) {
		gameBoard.board.splice(smarter(), 1, turn);
		checkWinner();
		displayArray();
		return;
	}

	const freeIndex = [];
	for (let i = 0; i < gameBoard.board.length; i++) {
		if (gameBoard.board[i] === "") freeIndex.push(i);
	}

	const randomNumber = Math.floor(Math.random() * freeIndex.length);
	const aiChoice = freeIndex[randomNumber];
	if (freeIndex.length === 0) {
		return;
	}

	// adjust board array with our random choice
	// check for win and display array

	gameBoard.board.splice(aiChoice, 1, turn);
	checkWinner();
	displayArray();
}

// When a cell is clicked update the corresponding array index
// add event listener to each cell
// cells id will correlate with board array index
// if the cell clicked already has something in it, do nothing
const cell = document.querySelectorAll(".cell");
cell.forEach((box) => {
	box.addEventListener("click", () => {
		if (gameBoard.board[+box.id] !== "") {
			return;
		}

		// default starting turn is x. adjust array index based on cell clicked
		// set the turn to "o". display adjusted array and check for a winner
		// if AI has been selected, call for aiTurn
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
		// since after the first move, turn has beens set to "o", first block is ignored
		// "o" can place their turn and switch turn back to X
		gameBoard.board.splice(+box.id, 1, turn);
		turn = "x";
		p2.classList.remove("active");
		p1.classList.add("active");
		displayArray();
		checkWinner();
	});
});

// closes our intro overlay once AI has been selected, or start button clicked
function closeOverlay() {
	const overlay = document.getElementById("overlay");
	overlay.style.opacity = 0;
	overlay.style.visibility = "hidden";
}

// when start game button is clicked after selecting pvp
// adjust player names based on input form values
// if nothing inputed, default player1/2
// close the overlay to allow the game to start

// it' called on button click, ignore eslint
// eslint-disable-next-line no-unused-vars
function startPvp() {
	const input1 = document.getElementById("playerInput1");
	const input2 = document.getElementById("playerInput2");
	const name1 = document.getElementById("p1");
	const name2 = document.getElementById("p2");
	player1 = input1.value;
	player2 = input2.value;

	name1.textContent = input1.value;
	name2.textContent = input2.value;

	if (input1.value === "") {
		name1.textContent = "Player 1";
		player1 = "Player 1";
	}
	if (input2.value === "") {
		name2.textContent = "Player 2";
		player2 = "Player 2";
	}

	closeOverlay();
}

// dom elements to remove AI choice after PvP has been selected
// and bring up the inputs/start button
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

// our intro overlay asking player to choose pvp/ai
// if ai is clicked set ai to true and player = computer
// close the overlay as soon as AI is chosen
// if user clicked PvP, call inputs to continue
const choice = document.querySelectorAll(".choice");
choice.forEach((choices) => {
	choices.addEventListener("click", () => {
		if (choices.id === "pve") {
			ai = true;
			player2 = "Computer";
			document.getElementById("p2").textContent = player2;
			document.getElementById("p1").textContent = "You";
			closeOverlay();
			return;
		}
		pvpInputs();
	});
});
