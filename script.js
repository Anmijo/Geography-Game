// List of countries and capitals
const countriesList = {
    A: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan"],
    B: ["Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi"],
    C: ["Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic"],
    D: ["Denmark", "Djibouti", "Dominica", "Dominican Republic"],
    E: ["East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia"],
    F: ["Fiji", "Finland", "France"],
    G: ["Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana"],
    H: ["Haiti", "Honduras", "Hungary"],
    I: ["Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy"],
    J: ["Jamaica", "Japan", "Jordan"],
    K: ["Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan"],
    L: ["Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg"],
    M: ["Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar"],
    N: ["Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "North Korea"],
    O: ["Oman"],
    P: ["Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"],
    Q: ["Qatar"],
    R: ["Romania", "Russia", "Rwanda"],
    S: ["Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria"],
    T: ["Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu"],
    U: ["Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan"],
    V: ["Vanuatu", "Vatican City", "Venezuela", "Vietnam"],
    W: ["Wallis and Futuna", "Western Sahara"],
    Y: ["Yemen"],
    Z: ["Zambia", "Zimbabwe"],
};

const capitalsList = {
    A: ["Algiers", "Andorra la Vella", "Addis Ababa", "Abu Dhabi"],
    B: ["Berlin", "Buenos Aires", "Brasília", "Bandar Seri Begawan", "Belmopan", "Bridgetown", "Budapest", "Bucharest"],
    C: ["Cairo", "Canberra", "Caracas", "Castries", "Copenhagen"],
    D: ["Dakar", "Dili", "Dodoma", "Doha", "Dublin", "Dushanbe"],
    E: ["El Aaiún"],
    F: ["Funafuti"],
    G: ["Georgetown"],
    H: ["Harare", "Hanoi"],
    I: ["Islamabad"],
    J: ["Jakarta"],
    K: ["Kabul", "Kathmandu", "Kigali", "Kingston", "Kyiv"],
    L: ["Lima", "Lisbon", "London", "Lomé", "Luanda"],
    M: ["Majuro", "Managua", "Manama", "Maseru", "Mata-Utu", "Mexico City", "Mogadishu", "Moscow", "Muscat"],
    N: ["Nairobi", "Naypyidaw", "N'Djamena", "New Delhi", "Niamey", "Nouakchott", "Nuku'alofa"],
    O: ["Ottawa", "Oslo"],
    P: ["Palikir", "Panama City", "Paris", "Phnom Penh", "Podgorica", "Port Moresby", "Port of Spain", "Port Vila", "Porto-Novo", "Praia", "Pyongyang"],
    Q: ["Quito"],
    R: ["Rabat", "Ramallah"],
    S: ["San Marino", "Sana'a", "Santo Domingo", "São Tomé", "Seoul", "Skopje", "Stockholm", "Suva"],
    T: ["Tallinn", "Tashkent", "Tarawa", "Tbilisi", "Tegucigalpa", "Tehran", "Tokyo", "Tripoli", "Tunis"],
    U: ["Ulaanbaatar"],
    V: ["Vaduz", "Vatican City", "Victoria", "Vienna"],
    W: ["Warsaw", "Washington, D.C.", "Wellington"],
    Y: ["Yaoundé"],
    Z: ["Zagreb"],  
};

let currentLetter;
let correctCriteria;
let incorrectCriteria;
let guessCount; //number of guesses
let remaining; // remaining guesses
let usedList;// combined list of countries and/or capital

let lowercaseCriteria; //list of correct countries

// Function to start the game
function startGame() {
    //check if criterias are selected
    usedList = mergeObjects(countriesTemp, capitalsTemp);

    if (usedList == "") {
        alert("Atleast one criteria must be selected!");
        return;
    }

    document.getElementById("gameArea").style.display = "block";
    document.querySelector("h1").style.display = "none"; 
    document.querySelector(".game-description").style.display = "none";
    document.querySelector(".toggle-container").style.display = "none";
    document.getElementById("startButton").style.display = "none";

    document.getElementById("congrats").style.display = "none";
    document.getElementById("submitGuess").style.display = "block";
    document.getElementById("guessInput").style.display = "block";
    document.getElementById("nextButton").style.display = "none";   
    document.getElementById("correctGuesses").innerHTML = "";
    document.getElementById("incorrectGuesses").innerHTML = "";


    correctCriteria = [];
    incorrectCriteria = [];

    guessCount = 0;
    document.getElementById("guessCount").innerText = guessCount;

    const letters = Object.keys(usedList);
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById("letter").innerText = "Letter: " + currentLetter;

    lowercaseCriteria = usedList[currentLetter].map(criteria => criteria.toLowerCase());
    remaining = lowercaseCriteria.length;
    document.getElementById("remaining").innerText = remaining;
}

// Function to check the guess
function checkGuess() {
    const guess = document.getElementById("guessInput").value.trim();
    if (guess === "") return;

    // Capitalize the first letter of the guess
    const capitalizedGuess = guess.charAt(0).toUpperCase() + guess.slice(1);

    // Check if the guess has already been made
    if (correctCriteria.includes(capitalizedGuess) || incorrectCriteria.includes(capitalizedGuess)) {
        alert("Guess already made!");
        document.getElementById("guessInput").value = "";
        return;
    }

    guessCount++;
    document.getElementById("guessCount").innerText = guessCount;
    
    const lowercaseGuess = capitalizedGuess.toLowerCase();
    if (lowercaseCriteria.includes(lowercaseGuess)) {
        if (!correctCriteria.includes(capitalizedGuess)) {
            correctCriteria.push(capitalizedGuess);
            document.getElementById("correctGuesses").innerHTML += "<li>" + capitalizedGuess + "</li>";
            remaining--; // decrease number of remaining
            document.getElementById("remaining").innerText = remaining;
            if (correctCriteria.length === usedList[currentLetter].length) {
                document.getElementById("congrats").style.display = "block";
                document.getElementById("nextButton").style.display = "block";
                document.getElementById("submitGuess").style.display = "none";
                document.getElementById("guessInput").style.display = "none";
            }
        }
    } else {
        if (!incorrectCriteria.includes(capitalizedGuess)) {
            incorrectCriteria.push(capitalizedGuess);
            document.getElementById("incorrectGuesses").innerHTML += "<li>" + capitalizedGuess + "</li>";
        }
    }
    document.getElementById("guessInput").value = "";
}

// merge objects
function mergeObjects(obj1, obj2) {
    const result = {};

    if(obj2 == ""){
        return obj1;
    }

    if(obj1 == ""){
        return obj2;
    }
    
    const concatArrays = (arr1, arr2) => (arr1 || []).concat(arr2 || []);

    // Iterate over keys in obj1 and add them to result
    Object.keys(obj1).forEach(key => {
      result[key] = concatArrays(obj1[key], obj2[key]);
    });
  
    // Iterate over keys in obj2 that are not in obj1 and add them to result
    Object.keys(obj2).forEach(key => {
      if (!obj1.hasOwnProperty(key)) {
        result[key] = obj2[key];
      }
    });
  
    return result;
  }



// Normal code

// Event listeners
const countriesToggle = document.getElementById('countriesToggle');
const capitalsToggle = document.getElementById('capitalsToggle');

let countriesTemp;
let capitalsTemp;

countriesTemp = JSON.parse(JSON.stringify(countriesList));
capitalsTemp = "";

countriesToggle.checked = true; // default is true

// countries switch event listener
countriesToggle.addEventListener('change', function() {
    if (this.checked) {
        console.log('Countries is ON');
        countriesTemp = JSON.parse(JSON.stringify(countriesList));
    } else {
        console.log('Countries is OFF');
        countriesTemp = "";
    }
});

// capitals switch event listener
capitalsToggle.addEventListener('change', function() {
    if (this.checked) {
        // console.log('Capitals is ON');
        capitalsTemp = JSON.parse(JSON.stringify(capitalsList));
    } else {
        // console.log('Capitals is OFF');
        capitalsTemp = "";
    }
});

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("nextButton").addEventListener("click", startGame);
document.getElementById("submitGuess").addEventListener("click", checkGuess);
document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});
