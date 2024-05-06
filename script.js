// List of countries and capitals
const countriesAndCapitals = {
    A: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan"],
    B: ["Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi"],
    C: ["Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic"],
    D: ["Denmark", "Djibouti", "Dominica", "Dominican Republic"],
    E: ["East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia"],
    F: ["Fiji", "Finland", "France"],
    G: ["Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana"],
    H: ["Haiti", "Honduras", "Hungary"],
    I: ["Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy"],
    J: ["Jamaica", "Japan", "Jordan"],
    K: ["Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan"],
    L: ["Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg"],
    M: ["Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)"],
    N: ["Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway"],
    O: ["Oman"],
    P: ["Pakistan", "Palau", "Palestinian Territories", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"],
    Q: ["Qatar"],
    R: ["Romania", "Russia", "Rwanda"],
    S: ["Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria"],
    T: ["Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu"],
    U: ["Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan"],
    V: ["Vanuatu", "Vatican City", "Venezuela", "Vietnam"],
    W: ["Wallis and Futuna", "Western Sahara"],
    Y: ["Yemen"],
    Z: ["Zambia", "Zimbabwe"],
};

let currentLetter;
let correctCountries;
let incorrectCountries;
let guessCount;

// Function to start the game
function startGame() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    correctCountries = [];
    incorrectCountries = [];
    guessCount = 0;
    const letters = Object.keys(countriesAndCapitals);
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById("letter").innerText = "Letter: " + currentLetter;
}

// Function to check the guess
function checkGuess() {
    const guess = document.getElementById("guessInput").value.trim();
    if (guess === "") return;

    // Capitalize the first letter of the guess
    const capitalizedGuess = guess.charAt(0).toUpperCase() + guess.slice(1);

    // Check if the guess has already been made
    if (correctCountries.includes(capitalizedGuess) || incorrectCountries.includes(capitalizedGuess)) {
        alert("Guess already made!");
        document.getElementById("guessInput").value = "";
        return;
    }

    guessCount++;
    document.getElementById("guessCount").innerText = guessCount;
    
    const lowercaseCountries = countriesAndCapitals[currentLetter].map(country => country.toLowerCase());
    const lowercaseGuess = capitalizedGuess.toLowerCase();
    if (lowercaseCountries.includes(lowercaseGuess)) {
        if (!correctCountries.includes(capitalizedGuess)) {
            correctCountries.push(capitalizedGuess);
            document.getElementById("correctGuesses").innerHTML += "<li>" + capitalizedGuess + "</li>";
            if (correctCountries.length === countriesAndCapitals[currentLetter].length) {
                document.getElementById("congrats").style.display = "block";
            }
        }
    } else {
        if (!incorrectCountries.includes(capitalizedGuess)) {
            incorrectCountries.push(capitalizedGuess);
            document.getElementById("incorrectGuesses").innerHTML += "<li>" + capitalizedGuess + "</li>";
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
