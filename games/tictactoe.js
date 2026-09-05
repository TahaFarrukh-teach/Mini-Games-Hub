const cells =
    document.querySelectorAll(".cell");

const turnDisplay =
    document.getElementById("turn");

const messageDisplay =
    document.getElementById("game-message");

const restartButton =
    document.getElementById("restart-button");

const resetScoreButton =
    document.getElementById("reset-score");

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let currentPlayer = "X";

let xScore =
    Number(localStorage.getItem("ticTacToeXWins")) || 0;

let oScore =
    Number(localStorage.getItem("ticTacToeOWins")) || 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

function updateScores() {

    document.getElementById(
        "x-score"
    ).textContent = xScore;

    document.getElementById(
        "o-score"
    ).textContent = oScore;

    localStorage.setItem(
        "ticTacToeXWins",
        xScore
    );

    localStorage.setItem(
        "ticTacToeOWins",
        oScore
    );

    localStorage.setItem(
        "ticTacToeWins",
        xScore + oScore
    );
}

function updateTurn() {

    turnDisplay.textContent =
        `${currentPlayer}'s Turn`;
}

function handleCellClick(event) {

    const cell = event.target;

    const index =
        Number(cell.dataset.index);

    if (board[index] !== "") return;

    board[index] = currentPlayer;

    cell.textContent = currentPlayer;

    cell.classList.add(
        currentPlayer.toLowerCase()
    );

    const winner =
        checkWinner();

    if (winner) {

        messageDisplay.textContent =
            `${winner} wins! 🎉`;

        if (winner === "X") {
            xScore++;
        } else {
            oScore++;
        }

        updateScores();

        cells.forEach(cell => {
            cell.disabled = true;
        });

        return;
    }

    if (!board.includes("")) {

        messageDisplay.textContent =
            "It's a draw! 🤝";

        cells.forEach(cell => {
            cell.disabled = true;
        });

        return;
    }

    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";

    updateTurn();
}

function checkWinner() {

    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            return board[a];
        }
    }

    return null;
}

function newGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    currentPlayer = "X";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );
    });

    messageDisplay.textContent =
        "Make your move!";

    updateTurn();
}

function resetScores() {

    xScore = 0;
    oScore = 0;

    localStorage.removeItem(
        "ticTacToeXWins"
    );

    localStorage.removeItem(
        "ticTacToeOWins"
    );

    localStorage.removeItem(
        "ticTacToeWins"
    );

    updateScores();

    newGame();
}

cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );
});

restartButton.addEventListener(
    "click",
    newGame
);

resetScoreButton.addEventListener(
    "click",
    resetScores
);

updateScores();
updateTurn();