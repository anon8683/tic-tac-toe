# Tic-Tac-Toe

### The aim of the game is to get 3 of your symbols ['x' or 'o'] in a row. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. If all the spaces on the board are filled without a winner, the result is a tie.

**Player vs Player**
Users can play Player vs Player and enter the names of the two users.

**Player vs AI**
The user plays against the computer.

### How does it work?

The grid corresponds to an array where we store our symbols. When a user clicks a part of the grid, the corresponding array index is updated with their symbol.

> _e.g_
>
> ```js
> //user X clicks the 3rd square on our grid
> board[("", "", "x", "", "", "", "", "", "")];
>
> //user O clicks the 7th square
> board[("", "", "x", "", "", "", "", "", "o")];
> ```

#### Check for a winner:

There are 8 possible winning patterns in Tic-Tac-Toe ;

```js
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
```

If the these indexes of our board array contain all "x" or all "o" then we know that a winner has been found.
If the board is full of symbols, but neither symbol fills these indexes, then the result is a tie.

## AI

The AI has 3 types of moves;

> - **Random move**
> - **Winning move**
> - **Block enemy winning move**

The highest priority move is Winning move, followed by Block move, then Random move.
Using the winning combinations array, it can find if any of the array's have two of a given symbol.

If an array has two of the AI's symbol and it is the AI's turn, the AI will fill the remaining spot to guarantee a win.
If there is no possible winning move available, the AI will check to see if it's opponent _could_ win on their next turn. If it can, the AI will block that winning combinations. If there are multiple enemy winning combinations the AI will randomly block one.
