const choiceButtons =
    document.querySelectorAll(
        ".choice-button"
    );

const playerChoiceDisplay =
    document.getElementById(
        "player-choice"
    );

const computerChoiceDisplay =
    document.getElementById(
        "computer-choice"
    );

const resultDisplay =
    document.getElementById("result");

const playerScoreDisplay =
    document.getElementById(
        "player-score"
    );

const computerScoreDisplay =
    document.getElementById(
        "computer-score"
    );

const drawScoreDisplay =
    document.getElementById(
        "draw-score"
    );

const restartButton =
    document.getElementById(
        "restart-button"
    );

const resetButton =
    document.getElementById(
        "reset-button"
    );

const choices = [
    "rock",
    "paper",
    "scissors"
];

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

let playerScore =
    Number(
        localStorage.getItem(
            "rpsPlayerWins"
        )
    ) || 0;

let computerScore =
    Number(
        localStorage.getItem(
            "rpsComputerWins"
        )
    ) || 0;

let drawScore =
    Number(
        localStorage.getItem(
            "rpsDraws"
        )
    ) || 0;

function updateScore() {

    playerScoreDisplay.textContent =
        playerScore;

    computerScoreDisplay.textContent =
        computerScore;

    drawScoreDisplay.textContent =
        drawScore;

    localStorage.setItem(
        "rpsPlayerWins",
        playerScore
    );

    localStorage.setItem(
        "rpsComputerWins",
        computerScore
    );

    localStorage.setItem(
        "rpsDraws",
        drawScore
    );

    localStorage.setItem(
        "rpsWins",
        playerScore
    );
}

function getComputerChoice() {

    const randomIndex =
        Math.floor(
            Math.random() * choices.length
        );

    return choices[randomIndex];
}

function determineWinner(
    player,
    computer
) {

    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" &&
            computer === "scissors") ||

        (player === "paper" &&
            computer === "rock") ||

        (player === "scissors" &&
            computer === "paper")
    ) {
        return "player";
    }

    return "computer";
}

function playRound(playerChoice) {

    const computerChoice =
        getComputerChoice();

    playerChoiceDisplay.textContent =
        emojis[playerChoice];

    computerChoiceDisplay.textContent =
        emojis[computerChoice];

    const winner =
        determineWinner(
            playerChoice,
            computerChoice
        );

    if (winner === "player") {

        playerScore++;

        resultDisplay.textContent =
            "🎉 You Win!";

    } else if (winner === "computer") {

        computerScore++;

        resultDisplay.textContent =
            "😮 Computer Wins!";

    } else {

        drawScore++;

        resultDisplay.textContent =
            "🤝 It's a Draw!";
    }

    updateScore();
}

function newRound() {

    playerChoiceDisplay.textContent =
        "❓";

    computerChoiceDisplay.textContent =
        "❓";

    resultDisplay.textContent =
        "Choose your move!";
}

function resetScores() {

    playerScore = 0;
    computerScore = 0;
    drawScore = 0;

    localStorage.removeItem(
        "rpsPlayerWins"
    );

    localStorage.removeItem(
        "rpsComputerWins"
    );

    localStorage.removeItem(
        "rpsDraws"
    );

    localStorage.removeItem(
        "rpsWins"
    );

    updateScore();

    newRound();
}

choiceButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const choice =
                button.dataset.choice;

            playRound(choice);
        }
    );
});

restartButton.addEventListener(
    "click",
    newRound
);

resetButton.addEventListener(
    "click",
    resetScores
);

updateScore();
newRound();