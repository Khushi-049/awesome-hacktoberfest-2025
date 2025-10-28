const emojis = ["🐼","🐸","🐯","🍉","🍓","🐶","🍇","🐱"];
let cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

const game = document.getElementById("game");
const movesEl = document.getElementById("moves");
const restartBtn = document.getElementById("restartBtn");

let moveCount = 0;
let flippedCard = null;
let lockBoard = false;

function createBoard() {
  game.innerHTML = "";
  cards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">❓</div>
      <div class="back">${emoji}</div>
    `;
    card.addEventListener("click", flipCard);
    game.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains("flip")) return;
  
  this.classList.add("flip");
  
  if (!flippedCard) {
    flippedCard = this;
  } else {
    moveCount++;
    movesEl.textContent = moveCount;
    
    if (this.innerHTML === flippedCard.innerHTML) {
      flippedCard = null;
    } else {
      lockBoard = true;
      setTimeout(() => {
        this.classList.remove("flip");
        flippedCard.classList.remove("flip");
        flippedCard = null;
        lockBoard = false;
      }, 900);
    }
  }
}

restartBtn.addEventListener("click", () => {
  moveCount = 0;
  movesEl.textContent = 0;
  cards.sort(() => Math.random() - 0.5);
  createBoard();
});

createBoard();
