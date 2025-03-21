  const phrases = [
    "Someone shows up in pajamas",
    "Forgot their Bible, but has their phone",
    "“I needed this” (said 5+ times)",
    "Group selfie captioned “Blessed”",
    "Falls asleep during a session",
    "“I feel the Spirit moving” moment",
    "At least one woman openly cries",
    "“We should do this more often”",
    "Matching t-shirts or hats spotted",
    "Husband calls asking where something is",
    "Drinks way too much coffee",
    "Brings their own blanket or pillow",
    "Too perky in the morning",
    "Buys something from the gift shop",
    "Worship music gets emotional",
    "Brings snacks for everyone",
    "Quotes Proverbs 31",
    "Sand everywhere",
    "Long prayer before eating",
    "“I’m not crying, you’re crying”",
    "Someone mentions The Chosen",
    "“Can we do this at church?”",
    "Bra comes off immediately in the room",
    "Sings way too loud in worship",
    "Talks about past retreats",
    "Shares a personal testimony",
    "Forgets where they parked",
    "Mentions 'mountaintop experience'",
    "Calls home to check on the dog",
    "“God is teaching me patience”",
    "Cracks a joke during a serious moment",
    "Asks what time breakfast is… twice",
    "Says they’ll go to bed early (but doesn’t)",
    "Starts packing a full day before checkout",
    "“Next year, we need to book a suite”"
];

let playerName = "";
let playerColor = "#ff4081";
let cells = [];
let bingoDeclared = false;

// Start Game Setup
function startGame() {
    console.log("startGame called");
    playerName = document.getElementById("player-name").value || "Player";
    console.log("Player name:", playerName);
    playerColor = document.getElementById("player-color").value;
    console.log("Player color:", playerColor);

    document.documentElement.style.setProperty('--player-color', playerColor);
    console.log("Color set");
    document.getElementById("setup").style.display = "none";
    console.log("Setup hidden");
    document.getElementById("game").style.display = "block";
    console.log("Game displayed");
    document.getElementById("greeting").innerText = `Hello, ${playerName}!`;
    console.log("Greeting set");

    generateCard();
    console.log("generateCard called");
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateCard() {
    const board = document.getElementById("bingo-board");
    board.innerHTML = "";
    document.getElementById("winner-message").innerText = "";
    bingoDeclared = false;

    let shuffledPhrases = shuffle([...phrases]).slice(0, 24);
    shuffledPhrases.splice(12, 0, "FREE"); // Center space

    cells =;

    shuffledPhrases.forEach((phrase, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = phrase;
        cell.dataset.index = index;

        if (phrase === "FREE") {
            cell.classList.add("checked");
        }

        cell.addEventListener("click", () => {
            cell.classList.toggle("checked");
            checkBingo();
        });

        board.appendChild(cell);
        cells.push(cell);
    });
}

function resetBoard() {
    cells.forEach(cell => cell.classList.remove("checked"));
    document.getElementById("winner-message").innerText = "";
    bingoDeclared = false;
    generateCard(); //regenerate the card.
}

// Check for Bingo
function checkBingo() {
    if (bingoDeclared) return;

    const gridSize = 5;
    let checked = cells.map(cell => cell.classList.contains("checked"));

    for (let r = 0; r < gridSize; r++) {
        if (checked.slice(r * gridSize, r * gridSize + gridSize).every(v => v)) {
            announceWinner();
            return;
        }
    }

    for (let c = 0; c < gridSize; c++) {
        if ([0, 1, 2, 3, 4].map(i => checked[i * gridSize + c]).every(v => v)) {
            announceWinner();
            return;
        }
    }

    if ([0, 6, 12, 18, 24].map(i => checked[i]).every(v => v) ||
        [4, 8, 12, 16, 20].map(i => checked[i]).every(v => v)) {
        announceWinner();
        return;
    }
}

// Announce Winner
function announceWinner() {
    document.getElementById("winner-message").innerText = `🎉 BINGO! ${playerName} won first! 🎉`;
    bingoDeclared = true;
}
