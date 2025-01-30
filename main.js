// Constants
const trialCount = 1;  // For single trial test, change back to 10000 for full testing
const range = 37.5;
const deviation = 4;

// B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
const BINGO = ['B', 'I', 'N', 'G', 'O'];

// Function to generate a shuffled list of numbers for B-I-N-G-O
function newPopulatedArray() {
    let ret = [];
    for (let i = 1; i <= 75; i++) {
        ret.push(i);
    }
    return ret;
}

// Function to shuffle the array in place
function shuffle(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let otherPos = Math.floor(Math.random() * (array.length - i) + i);
        let temp = array[i];
        array[i] = array[otherPos];
        array[otherPos] = temp;
    }
    return array; // Ensure the shuffled array is returned
}

// Function to simulate a single game
function runSingleGame() {
    let callOrder = shuffle(newPopulatedArray()); // Correctly assigning shuffled array
    let callTracking = {}; // Track when each number was called
    callOrder.forEach((num, index) => {
        callTracking[num] = index + 1; // Store the position (1-based index)
    });
    return callTracking;
}

// Function to validate no skips or repeats and that full reset is true
function validateFullReset(callTracking) {
    let allNumbers = new Set(Object.keys(callTracking).map(Number)); // Convert keys to numbers and create a Set
    return allNumbers.size === 75;  // True if all numbers are unique
}

function validateNoRepeats(callTracking) {
    let seen = new Set();
    for (let num in callTracking) {
        if (seen.has(num)) return false; // If number is repeated
        seen.add(num);
    }
    return true;
}

function validateNoSkips(callTracking) {
    for (let i = 1; i <= 75; i++) {
        if (!(i in callTracking)) return false; // If a number is skipped
    }
    return true;
}

// Function to output the called numbers in the specified format
function printCalledNumbers(callTracking) {
    const groupedNumbers = {
        B: [],
        I: [],
        N: [],
        G: [],
        O: []
    };

    // Group numbers based on their category (B-I-N-G-O)
    for (let num in callTracking) {
        let category = Math.floor((num - 1) / 15);
        if (category === 0) groupedNumbers.B.push('B' + num);
        else if (category === 1) groupedNumbers.I.push('I' + num);
        else if (category === 2) groupedNumbers.N.push('N' + num);
        else if (category === 3) groupedNumbers.G.push('G' + num);
        else groupedNumbers.O.push('O' + num);
    }

    // Print each category
    for (let cat of ['B', 'I', 'N', 'G', 'O']) {
        console.log(groupedNumbers[cat].join(' '));
    }
}

// Function to run a single automated test for 1 trial
function automatedTest() {
    console.log("Running automated test...");

    // Run a single trial
    let callTracking = runSingleGame();

    // Print the called numbers in the required format
    console.log("Called: ");
    printCalledNumbers(callTracking);

    // Validate results
    let isFullReset = validateFullReset(callTracking);
    let isNoRepeats = validateNoRepeats(callTracking);
    let isNoSkips = validateNoSkips(callTracking);

    // Print validity results
    console.log("\nfull reset: " + isFullReset + "\nno repeats: " + isNoRepeats + "\nno skips: " + isNoSkips);
}

// Run the automated test for 1 trial
automatedTest();
