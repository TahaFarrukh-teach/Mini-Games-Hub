const board =
    document.getElementById(
        "memory-board"
    );

const movesDisplay =
    document.getElementById("moves");

const timerDisplay =
    document.getElementById("timer");

const bestScoreDisplay =
    document.getElementById(
        "best-score"
    );

const message =
    document.getElementById(
        "memory-message"
    );

const restartButton =
    document.getElementById(
        "restart-button"
    );

const resetBestButton =
    document.getElementById(
        "reset-best-button"
    );

const symbols = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍒",
    "🥝",
    "🍍"
];

let cards = [];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

let seconds = 0;
let timer = null;

let gameStarted = false;

let bestScore =
    localStorage.getItem(
        "memoryBestScore"
    );

function loadBestScore() {

    if (bestScore !== null) {

        bestScoreDisplay.textContent =
            bestScore + " moves";

    } else {

        bestScoreDisplay.textContent =
            "--";
    }
}

function saveBestScore() {

    if (
        bestScore === null ||
        moves < Number(bestScore)
    ) {

        bestScore = moves;

        localStorage.setItem(
            "memoryBestScore",
            bestScore
        );

        bestScoreDisplay.textContent =
            bestScore + " moves";

        return true;
    }

    return false;
}

function startTimer() {

    if (gameStarted) return;

    gameStarted = true;

    timer = setInterval(() => {

        seconds++;

        updateTimer();

    }, 1000);
}

function stopTimer() {

    clearInterval(timer);

    timer = null;
}

function updateTimer() {

    const minutes =
        Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");

    const secs =
        (seconds % 60)
            .toString()
            .padStart(2, "0");

    timerDisplay.textContent =
        `${minutes}:${secs}`;
}

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[randomIndex]
        ] = [
            array[randomIndex],
            array[i]
        ];
    }

    return array;
}

function createCards() {

    cards =
        [...symbols, ...symbols];

    shuffle(cards);

    board.innerHTML = "";

    cards.forEach((symbol, index) => {

        const card =
            document.createElement(
                "button"
            );

        card.className =
            "memory-card";

        card.dataset.symbol =
            symbol;

        card.dataset.index =
            index;

        card.textContent =
            symbol;

        card.addEventListener(
            "click",
            flipCard
        );

        board.appendChild(card);
    });
}

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (
        this.classList.contains(
            "matched"
        )
    ) {
        return;
    }

    startTimer();

    this.classList.add("flipped");

    if (!firstCard) {

        firstCard = this;

        return;
    }

    secondCard = this;

    moves++;

    movesDisplay.textContent =
        moves;

    checkMatch();
}

function checkMatch() {

    const isMatch =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;

    if (isMatch) {

        disableMatchedCards();

    } else {

        unflipCards();
    }
}

function disableMatchedCards() {

    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );

    firstCard.disabled = true;
    secondCard.disabled = true;

    matchedPairs++;

    resetSelection();

    if (
        matchedPairs ===
        symbols.length
    ) {

        gameWon();
    }
}

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove(
            "flipped"
        );

        secondCard.classList.remove(
            "flipped"
        );

        resetSelection();

    }, 700);
}

function resetSelection() {

    firstCard = null;
    secondCard = null;

    lockBoard = false;
}

function gameWon() {

    stopTimer();

    const newBest =
        saveBestScore();

    if (newBest) {

        message.textContent =
            `🎉 New Best! ${moves} moves!`;

    } else {

        message.textContent =
            `🎉 You won in ${moves} moves!`;
    }
}

function newGame() {

    stopTimer();

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    moves = 0;
    matchedPairs = 0;

    seconds = 0;
    gameStarted = false;

    movesDisplay.textContent =
        "0";

    timerDisplay.textContent =
        "00:00";

    message.textContent =
        "Find all 8 pairs!";

    createCards();
}

function resetBestScore() {

    localStorage.removeItem(
        "memoryBestScore"
    );

    bestScore = null;

    bestScoreDisplay.textContent =
        "--";

    message.textContent =
        "Best score reset!";
}

restartButton.addEventListener(
    "click",
    newGame
);

resetBestButton.addEventListener(
    "click",
    resetBestScore
);

loadBestScore();
newGame();