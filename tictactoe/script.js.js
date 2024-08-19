document.addEventListener('DOMContentLoaded', function () {
    const statusElement = document.getElementById('status');
    const boardElement = document.getElementById('board');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    // Function to check if the board is full (tie)
    function isBoardFull() {
        return !gameBoard.includes('');
    }

    // Function to handle cell click
    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            statusElement.textContent = `Player ${winner} wins!`;
            gameActive = false;
        } else if (isBoardFull()) {
            statusElement.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusElement.textContent = 'Player X\'s turn';
        renderBoard();
    }

    // Function to render the game board
    function renderBoard() {
        boardElement.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gameBoard[i];
            cell.addEventListener('click', () => handleCellClick(i));
            boardElement.appendChild(cell);
        }
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);

    // Initial board rendering
    renderBoard();
});
