# Rock Paper Scissors Game

A simple, responsive, and accessible **Rock Paper Scissors** web game built with vanilla JavaScript, HTML, and CSS. Play against a computer that makes random choices, see the result instantly, and keep track of the score.

---

## Features
- **Responsive UI** – works on mobile, tablet, and desktop.
- **Random computer choice** – each round the computer selects rock, paper, or scissors uniformly at random.
- **Result calculation** – classic RPS rules determine win, lose, or tie.
- **Score tracking** – live scoreboard for player and computer.
- **Reset button** – clears scores and result display.
- **Animations** – brief visual feedback on button press.
- **Accessibility** – ARIA live regions, proper labels, and full keyboard navigation.
- **Responsive design** – CSS layout adapts to different screen sizes.

---

## Tech Stack
- **JavaScript** – core game logic and DOM manipulation (`script.js`).
- **HTML5** – semantic markup (`index.html`).
- **CSS3** – styling, layout, and simple animations (`style.css`).

---

## Setup & Usage
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repo‑folder>
   ```
2. **Open the game**
   - Simply double‑click `index.html` or open it in any modern browser.
3. **(Optional) Run a local server** – useful for Chrome extensions that block `file://` access.
   ```bash
   npx serve
   ```
   Then navigate to the URL shown in the terminal (usually `http://localhost:5000`).

---

## File Structure
```
├─ index.html      # Main page – markup and entry point
├─ style.css       # Styling, layout, and animations
├─ script.js       # Game logic, DOM interaction, and utilities
└─ README.md       # Documentation (this file)
```
- **`index.html`** – defines the UI: header, score board, move buttons, result display, and reset button. Includes ARIA attributes for screen‑reader friendliness.
- **`style.css`** – provides a clean, responsive layout, colour scheme, and the `.animate` class used for button feedback.
- **`script.js`** – contains all JavaScript needed to run the game (see Development Notes below).

---

## Development Notes
### Core Functions (`script.js`)
| Function | Purpose | Interaction with DOM |
|----------|---------|----------------------|
| `getComputerMove()` | Returns a random move (`"rock"`, `"paper"`, or `"scissors"`). | No DOM interaction – pure logic.
| `determineOutcome(playerMove, computerMove)` | Applies classic RPS rules and returns `'win'`, `'lose'`, or `'tie'`. | No DOM interaction – pure logic.
| `updateScoreBoard()` | Writes the current `playerScore` and `computerScore` to `#player-score` and `#computer-score`. Sets `aria-live="polite"` so screen readers announce changes. |
| `displayResult(message, outcomeClass)` | Shows the round result text in `#result-display` and adds a CSS class (`result-win`, `result-lose`, `result-tie`) for styling. Also sets `aria-live="polite"`. |
| `handlePlayerMove(e)` | Central event handler for both click and keyboard activation of the move buttons. It:
- Retrieves the player's move from `data-move`.
- Calls `getComputerMove()` and `determineOutcome()`.
- Updates scores and calls `updateScoreBoard()`.
- Builds a human‑readable message and passes it to `displayResult()`.
- Triggers a short animation on the pressed button. |
| `resetGame()` | Resets scores to zero, clears the result display, and refreshes the scoreboard. |

### Event Wiring (DOMContentLoaded)
- All buttons with `data-move` receive `click` and `keydown` listeners that point to `handlePlayerMove`. The `keydown` listener ensures the **Enter** and **Space** keys also trigger a move, supporting keyboard‑only navigation.
- The **Reset** button (`#reset-button`) receives a `click` listener and a similar `keydown` handler for consistency.
- Initial call to `updateScoreBoard()` renders a starting score of `0‑0`.

### Exported API
For testing or external scripts, the module exposes the following via `window.RPS`:
```js
window.RPS = {
  getComputerMove,
  determineOutcome,
  updateScoreBoard,
  displayResult,
};
```
---

## Accessibility
- **ARIA live regions** (`aria-live="polite"`) on the scoreboard and result display announce score changes and round outcomes to screen‑reader users.
- **ARIA labels** on each move button (`aria-label="Rock"`, etc.) provide clear, descriptive text.
- All interactive elements are native `<button>` elements, guaranteeing keyboard focusability. Additional `tabindex="0"` is added programmatically as a safety net.
- Keyboard shortcuts: **Enter** or **Space** activates both move and reset buttons.

---

## License
[Insert license information here – e.g., MIT, Apache 2.0, etc.]
