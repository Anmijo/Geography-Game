// List of countries and capitals
const countriesAndCapitals = {
    A: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan"],
    B: ["Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi"],
    // Add more countries starting with different letters...
};

let currentLetter;
let correctCountries;
let incorrectCountries;

// Function to start the game
function startGame() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    correctCountries = [];
    incorrectCountries = [];
    const letters = Object.keys(countriesAndCapitals);
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById("letter").innerText = "Letter: " + currentLetter;
}

// Function to check the guess
function checkGuess() {
    const guess = document.getElementById("guessInput").value.trim();
    if (guess === "") return;
    if (countriesAndCapitals[currentLetter].includes(guess)) {
        if (!correctCountries.includes(guess)) {
            correctCountries.push(guess);
            document.getElementById("correctGuesses").innerHTML += "<li>" + guess + "</li>";
            if (correctCountries.length === countriesAndCapitals[currentLetter].length) {
                document.getElementById("congrats").style.display = "block";
            }
        }
    } else {
        if (!incorrectCountries.includes(guess)) {
            incorrectCountries.push(guess);
            document.getElementById("incorrectGuesses").innerHTML += "<li>" + guess + "</li>";
        }
    }
    document.getElementById("guessInput").value = "";
}

// Event listeners
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("submitGuess").addEventListener("click", checkGuess);
document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});