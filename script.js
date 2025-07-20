let balance = 100;
let currentNumber = Math.floor(Math.random() * 100) + 1;
let betAmount = 5;

const balanceElement = document.getElementById("balance");
const currentNumberElement = document.getElementById("current-number");
const resultMessageElement = document.getElementById("result-message");
const betElement = document.getElementById("bet");

// Update UI
function updateUI() {
	balanceElement.textContent = `Balance: $${balance}`;
	currentNumberElement.textContent = `Number: ${currentNumber}`;
	betElement.textContent = `Bet: $${betAmount}`;
}

// Generate a new random number
function generateRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

// Handle High/Low guess
function handleGuess(isHigh) {
	const nextNumber = generateRandomNumber();
	const isCorrect = (isHigh && nextNumber > currentNumber) || (!isHigh && nextNumber < currentNumber);

	if (isCorrect) {
		balance += betAmount;
		resultMessageElement.textContent = `You Won! Next Number: ${nextNumber}`;
	} else {
		balance -= betAmount;
		resultMessageElement.textContent = `You Lost! Next Number: ${nextNumber}`;
	}

	currentNumber = nextNumber;
	updateUI();

	// Check if the game is over
	if (balance <= 0) {
		alert("Game Over! You ran out of money.");
		resetGame();
	}
}

// Reset the game
function resetGame() {
	balance = 100;
	currentNumber = generateRandomNumber();
	betAmount = 5;
	updateUI();
	resultMessageElement.textContent = "Game Reset! Start Again.";
}

// Event listeners
document.getElementById("highButton").addEventListener("click", () => handleGuess(true));
document.getElementById("lowButton").addEventListener("click", () => handleGuess(false));
document.getElementById("more").addEventListener("click", () => {
	if (betAmount < balance) betAmount += 5;
	updateUI();
});
document.getElementById("less").addEventListener("click", () => {
	if (betAmount > 5) betAmount -= 5;
	updateUI();
});
document.getElementById("submit").addEventListener("click", () => {
	resultMessageElement.textContent = "Choose High or Low!";
});

// Initialize the game
updateUI();