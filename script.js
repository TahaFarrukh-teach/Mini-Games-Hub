document.addEventListener("DOMContentLoaded", () => {

```
/* =========================
   LOADING SCREEN
========================= */

const loadingScreen =
    document.getElementById("loading-screen");

setTimeout(() => {

    if (loadingScreen) {
        loadingScreen.classList.add("hidden");
    }

}, 2300);


/* =========================
   SIDE MENU
========================= */

const menuButton =
    document.getElementById("menu-button");

const closeMenuButton =
    document.getElementById("close-menu");

const sideMenu =
    document.getElementById("side-menu");

const menuOverlay =
    document.getElementById("menu-overlay");


function openMenu() {

    sideMenu.classList.add("open");
    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


if (menuButton) {
    menuButton.addEventListener(
        "click",
        openMenu
    );
}


if (closeMenuButton) {
    closeMenuButton.addEventListener(
        "click",
        closeMenu
    );
}


if (menuOverlay) {
    menuOverlay.addEventListener(
        "click",
        closeMenu
    );
}


/* Close menu when a menu link is clicked */

const menuLinks =
    document.querySelectorAll(
        "#side-menu nav a"
    );

menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* Close menu with Escape */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =========================
   DARK / LIGHT MODE
========================= */

const themeButton =
    document.getElementById("theme-button");


function updateThemeButton() {

    if (!themeButton) return;

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        themeButton.textContent =
            "☀️ Light Mode";

    } else {

        themeButton.textContent =
            "🌙 Dark Mode";
    }
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("darkMode");


if (savedTheme === "true") {

    document.body.classList.add(
        "dark-mode"
    );

}


updateThemeButton();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            const darkMode =
                document.body.classList.contains(
                    "dark-mode"
                );

            localStorage.setItem(
                "darkMode",
                darkMode
            );

            updateThemeButton();

        }
    );

}


/* =========================
   HIGH SCORES
========================= */

const snakeScore =
    document.getElementById(
        "snake-score"
    );

const tttScore =
    document.getElementById(
        "ttt-score"
    );

const rpsScore =
    document.getElementById(
        "rps-score"
    );

const memoryScore =
    document.getElementById(
        "memory-score"
    );


/* Snake */

if (snakeScore) {

    const score =
        localStorage.getItem(
            "snakeHighScore"
        );

    snakeScore.textContent =
        score || "0";
}


/* Tic-Tac-Toe */

if (tttScore) {

    const score =
        localStorage.getItem(
            "ticTacToeWins"
        );

    tttScore.textContent =
        score || "0";
}


/* Rock Paper Scissors */

if (rpsScore) {

    const score =
        localStorage.getItem(
            "rpsWins"
        );

    rpsScore.textContent =
        score || "0";
}


/* Memory Game */

if (memoryScore) {

    const score =
        localStorage.getItem(
            "memoryBestScore"
        );

    memoryScore.textContent =
        score ? score + " moves" : "--";
}


/* =========================
   SCROLL ANIMATIONS
========================= */

const animatedElements =
    document.querySelectorAll(
        ".game-card, .about-box, .instruction-card"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

} else {

    animatedElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =========================
   CONSOLE MESSAGE
========================= */

console.log(
    "🎮 Mini Games Hub loaded successfully!"
);

console.log(
    "Made by: TahaFarrukh"
);
```

});
