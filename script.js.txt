// Bingo phrases array
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

// Game state variables
let playerName = "";
let playerColor = "#ff4081";
let cells = [];
let bingoDeclared = false;

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for buttons (assuming they'll exist in HTML)
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }
    if (resetButton) {
        resetButton.addEventListener("click", resetBoard);
    }
});

// Start game function
function startGame() {
    try {
        playerName = document.getElementById("player-name")?.value.trim() || "Player";
        playerColor = document.getElementById("player-color")?.value || "#ff4081";

        // Validate player name
        if (playerName.length > 20) {
            playerName = playerName.substring(0, 20);
        }

        document.documentElement.style.setProperty('--player-color', playerColor);
        document.getElementById("setup").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("greeting").innerText = `Hello, ${playerName}!`;

        generateCard();
    } catch (error) {
        console.error("Error starting game:", error);
        alert("An error occurred while starting the game. Please try again.");
    }
}

// Shuffle array function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generate bingo card
function generateCard() {
    const board = document.getElementById("bingo-board");
    if (!board) {
        console.error("Bingo board element not found");
        return;
    }

    board.innerHTML = "";
    document.getElementById("winner-message").innerText = "";
    bingoDeclared = false;

    let shuffledPhrases = shuffle([...phrases]).slice(0, 24);
    shuffledPhrases.splice(12, 0, "FREE");
    cells = [];

    shuffledPhrases.forEach((phrase, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = phrase;
        cell.dataset.index = index;

        if (phrase === "FREE") {
            cell.classList.add("checked");
        }

        cell.addEventListener("click", () => {
            if (!bingoDeclared) {
                cell.classList.toggle("checked");
                checkBingo();
            }
        });

        board.appendChild(cell);
        cells.push(cell);
    });
}

// Reset game board
function resetBoard() {
    if (cells.length === 0) return;
    
    cells.forEach(cell => cell.classList.remove("checked"));
    document.getElementById("winner-message").innerText = "";
    bingoDeclared = false;
    generateCard();
}

// Check for bingo win
function checkBingo() {
    if (bingoDeclared || cells.length === 0) return;

    const gridSize = 5;
    let checked = cells.map(cell => cell.classList.contains("checked"));

    // Check rows
    for (let r = 0; r < gridSize; r++) {
        if (checked.slice(r * gridSize, r * gridSize + gridSize).every(v => v)) {
            announceWinner();
            return;
        }
    }

    // Check columns
    for (let c = 0; c < gridSize; c++) {
        if ([0, 1, 2, 3, 4].map(i => checked[i * gridSize + c]).every(v => v)) {
            announceWinner();
            return;
        }
    }

    // Check diagonals
    if ([0, 6, 12, 18, 24].map(i => checked[i]).every(v => v) ||
        [4, 8, 12, 16, 20].map(i => checked[i]).every(v => v)) {
        announceWinner();
        return;
    }
}

// Announce winner
function announceWinner() {
    const winnerMessage = document.getElementById("winner-message");
    if (winnerMessage) {
        winnerMessage.innerText = `🎉 BINGO! ${playerName} won first! 🎉`;
        bingoDeclared = true;
        
        // Optional: Disable all cells after win
        cells.forEach(cell => cell.style.pointerEvents = "none");
    }
}

// Utility function to save game state (optional)
function saveGameState() {
    const gameState = {
        playerName,
        playerColor,
        checkedCells: cells.map(cell => cell.classList.contains("checked")),
        bingoDeclared
    };
    localStorage.setItem("bingoGameState", JSON.stringify(gameState));
}

// Utility function to load game state (optional)
function loadGameState() {
    const savedState = localStorage.getItem("bingoGameState");
    if (savedState) {
        const gameState = JSON.parse(savedState);
        playerName = gameState.playerName;
        playerColor = gameState.playerColor;
        bingoDeclared = gameState.bingoDeclared;
        // You'd need to modify generateCard to apply checked states
    }
}
