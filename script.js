const stack = document.querySelector(".stack");
const cards = Array.from(stack.children)
  .reverse()
  .filter((child) => child.classList.contains("card"));

// Reverse card stacking for initial order
cards.forEach((card) => stack.appendChild(card));

// Card movement function
function moveCard() {
  const lastCard = stack.lastElementChild;
  if (lastCard.classList.contains("card")) {
    lastCard.classList.add("swap");

    setTimeout(() => {
      lastCard.classList.remove("swap");
      stack.insertBefore(lastCard, stack.firstElementChild);
    }, 1200);
  }
}

// Event listener for both desktop and mobile
function handleCardClick(e) {
  const card = e.target.closest(".card");
  if (card && card === stack.lastElementChild) {
    card.classList.add("swap");

    setTimeout(() => {
      card.classList.remove("swap");
      stack.insertBefore(card, stack.firstElementChild);
      resetAutoplay();
    }, 1200);
  }
}

stack.addEventListener("click", handleCardClick);
stack.addEventListener("touchstart", handleCardClick);

// Autoplay with mobile adjustment
let autoplayInterval = setInterval(moveCard, window.innerWidth <= 650 ? 4000 : 3000);

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(moveCard, window.innerWidth <= 650 ? 4000 : 3000);
}

// Confetti creation function for desktop and mobile
function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  const isMobile = window.innerWidth <= 650;
  const confettiCount = isMobile ? 80 : 150; // Adjust for mobile
  const colors = ["#ff3e43", "#ffd700", "#00c8ff", "#8a2be2", "#ff69b4"];

  // Clear existing confetti
  confettiContainer.innerHTML = "";

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.setProperty('--hue', Math.random() * 360);
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = confetti.style.width;

    confettiContainer.appendChild(confetti);
  }
}

// Call confetti on load and resize
window.onload = createConfetti;
window.addEventListener("resize", createConfetti);
