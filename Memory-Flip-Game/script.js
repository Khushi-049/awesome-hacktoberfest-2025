const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const matchesText = document.getElementById("matches");
const hintBtn = document.getElementById("hintBtn");
const restartBtn = document.getElementById("restartBtn");
const overlayRestart = document.getElementById("overlayRestart");
const endOverlay = document.getElementById("endOverlay");
const endMatches = document.getElementById("endMatches");
const endMoves = document.getElementById("endMoves");

let symbols = ["🍎", "🍌", "🍪", "🍇"];
let cards = [];
let first = null;
let second = null;
let moves = 0;
let matches = 0;
let lock = false;
let hintActive = false;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function initializeGame() {
  lock = false;
  moves = 0;
  matches = 0;
  movesText.textContent = moves;
  matchesText.textContent = matches;

  endOverlay.classList.add("hidden");
  board.innerHTML = "";

  cards = shuffle([...symbols, ...symbols]);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = symbol;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lock || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.value;

  if (!first) {
    first = this;
    return;
  }

  second = this;
  moves++;
  movesText.textContent = moves;
  lock = true;

  if (first.dataset.value === second.dataset.value) {
    first.classList.add("matched");
    second.classList.add("matched");
    matches++;
    matchesText.textContent = matches;

    first = second = null;
    lock = false;

    if (matches === symbols.length) showWin();
  } else {
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "";
      second.textContent = "";
      first = second = null;
      lock = false;
    }, 700);
  }
}

function showHint() {
  if (hintActive || lock) return;

  hintActive = true;
  lock = true;

  const allCards = document.querySelectorAll(".card:not(.matched)");
  allCards.forEach(c => {
    c.classList.add("flipped");
    c.textContent = c.dataset.value;
  });

  setTimeout(() => {
    allCards.forEach(c => {
      if (!c.classList.contains("matched")) {
        c.classList.remove("flipped");
        c.textContent = "";
      }
    });
    hintActive = false;
    lock = false;
  }, 2000);
}

function showWin() {
  endOverlay.classList.remove("hidden");
  endMatches.textContent = matches;
  endMoves.textContent = moves;
}

hintBtn.addEventListener("click", showHint);
restartBtn.addEventListener("click", initializeGame);
overlayRestart.addEventListener("click", initializeGame);

initializeGame();
