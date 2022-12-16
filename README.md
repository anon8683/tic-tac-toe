# tic-tac-toe

The aim of the game is to get 3 of your symbols ("X" or "O") in a row. Either horizontally, vertically, or diagonally. Players can place their symbol by clicking on the desired column (if it's empty)

Users can play 'PvP' and enter the names of the 2 users. Or the user can play against the AI.

## How does it work?

The grid corresponds to an array where we store our symbols.
When a user clicks a part of the grid, the corresponding array index is updated with their symbol.

e.g

> board["","","","","","","","",""]
> // user X clicks the third square on our grid
> board["","","x","","","","","",""]
