// Rock Paper Scissors core logic and DOM interaction
// ---------------------------------------------------
// Constants
const MOVES = ["rock", "paper", "scissors"];
const OUTCOME = {
  win: "You win!",
  lose: "You lose!",
  tie: "It's a tie!",
};

// Score tracking
let playerScore = 0;
let computerScore = 0;

/**
 * Returns a random move for the computer.
 * @returns {string} One of the values in MOVES.
 */
function getComputerMove() {
  const idx = Math.floor(Math.random() * MOVES.length);
  return MOVES[idx];
}

/**
 * Determines the round outcome using classic RPS rules.
 * @param {string} playerMove - The player's move.
 * @param {string} computerMove - The computer's move.
 * @returns {'win'|'lose'|'tie'} Outcome for the player.
 */
function determineOutcome(playerMove, computerMove) {
  if (playerMove === computerMove) return "tie";
  // win conditions for player
  if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    return "win";
  }
  return "lose";
}

/**
 * Updates the scoreboard DOM elements and ensures they are announced politely.
 */
function updateScoreBoard() {
  const playerSpan = document.getElementById("player-score");
  const computerSpan = document.getElementById("computer-score");
  if (playerSpan) {
    playerSpan.textContent = String(playerScore);
    playerSpan.setAttribute("aria-live", "polite");
  }
  if (computerSpan) {
    computerSpan.textContent = String(computerScore);
    computerSpan.setAttribute("aria-live", "polite");
  }
}

/**
 * Displays the result message and applies the appropriate styling class.
 * @param {string} message - Text to display.
 * @param {string} outcomeClass - One of "win", "lose", "tie".
 */
function displayResult(message, outcomeClass) {
  const resultDiv = document.getElementById("result-display");
  if (!resultDiv) return;
  // Clear previous outcome classes
  resultDiv.classList.remove("result-win", "result-lose", "result-tie");
  // Apply new class based on outcome
  if (outcomeClass) {
    resultDiv.classList.add(`result-${outcomeClass}`);
  }
  resultDiv.textContent = message;
  // Ensure screen readers announce the change
  resultDiv.setAttribute("aria-live", "polite");
}

/**
 * Capitalises the first letter of a move for display purposes.
 * @param {string} move
 * @returns {string}
 */
function capitalise(move) {
  return move.charAt(0).toUpperCase() + move.slice(1);
}

/**
 * Handles a player's move selection.
 * @param {Event} e
 */
function handlePlayerMove(e) {
  // Support both click and keydown events
  if (e.type === "keydown") {
    if (e.key !== "Enter" && e.key !== " ") return; // ignore other keys
    e.preventDefault(); // prevent scrolling on Space
  }

  const button = e.currentTarget;
  const playerMove = button.getAttribute("data-move");
  if (!playerMove) return;

  const computerMove = getComputerMove();
  const outcome = determineOutcome(playerMove, computerMove);

  // Update scores
  if (outcome === "win") {
    playerScore++;
  } else if (outcome === "lose") {
    computerScore++;
  }

  updateScoreBoard();

  // Build result message
  let message = "";
  if (outcome === "tie") {
    message = `${capitalise(playerMove)} equals ${capitalise(computerMove)}. ${OUTCOME.tie}`;
  } else if (outcome === "win") {
    message = `${capitalise(playerMove)} beats ${capitalise(computerMove)}. ${OUTCOME.win}`;
  } else {
    message = `${capitalise(computerMove)} beats ${capitalise(playerMove)}. ${OUTCOME.lose}`;
  }

  displayResult(message, outcome);

  // Brief animation feedback
  button.classList.add("animate");
  setTimeout(() => button.classList.remove("animate"), 300);
}

/**
 * Resets the game state.
 */
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  const resultDiv = document.getElementById("result-display");
  if (resultDiv) {
    resultDiv.textContent = "";
    resultDiv.className = ""; // remove any result-* classes
  }
  updateScoreBoard();
}

// Attach event listeners once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const moveButtons = document.querySelectorAll("button[data-move]");
  moveButtons.forEach((btn) => {
    // Ensure keyboard focusability – buttons are naturally focusable, but we add tabindex for safety
    if (!btn.hasAttribute("tabindex")) btn.setAttribute("tabindex", "0");
    btn.addEventListener("click", handlePlayerMove);
    btn.addEventListener("keydown", handlePlayerMove);
  });

  const resetBtn = document.getElementById("reset-button");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
    // Also allow Enter/Space activation for consistency
    resetBtn.setAttribute("tabindex", "0");
    resetBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        resetGame();
      }
    });
  }

  // Initial scoreboard rendering
  updateScoreBoard();
});

// Expose functions for testing / external use
window.RPS = {
  getComputerMove,
  determineOutcome,
  updateScoreBoard,
  displayResult,
};
