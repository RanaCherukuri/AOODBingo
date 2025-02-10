// Constants
const expectedAverage = 37.5;
const maxDeviation = 4;
// Bingo frames
const HLineOneArray = [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
const HLineTwoArray = [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
const HLineThreeArray = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
const HLineFourArray = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0]];
const HLineFiveArray = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 1, 1, 1]];
const VLineOneArray = [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]];
const VLineTwoArray = [[0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]];
const VLineThreeArray = [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]];
const VLineFourArray = [[0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0]];
const VLineFiveArray = [[0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1]];
const DLineOneArray = [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
const DLineTwoArray = [[0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]];

const CArray = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]];
const HArray = [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]];
const SArray = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 1]];
const BlackoutArray = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]];
const OutlineArray = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]];
const FourCornersArray = [[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 1]];
const CrossArray = [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]];
const XArray = [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]];

// Other variables
let trialCount = 10000;  // For single trial test, change back to 10000 for full testing
let fullResetCount = 0;
let noSkipCount = 0;
let noRepeatCount = 0;



// B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
const BINGO = ['B', 'I', 'N', 'G', 'O'];

// Function to generate a shuffled list of all numbers [1-75] (incl)
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
    for(let i = 0; i < trialCount; i++){
        callTracking = runSingleGame();
        if(validateFullReset(callTracking)) {
            fullResetCount++;
        }
        if (validateNoRepeats(callTracking)) {
            noRepeatCount++;
        } 
        if (validateNoSkips(callTracking)) {
            noSkipCount++;
        }
    }
    
    // Validate results
    let isFullReset = validateFullReset(callTracking);
    let isNoRepeats = validateNoRepeats(callTracking);
    let isNoSkips = validateNoSkips(callTracking);
    
    // Print validity results
    console.log("\ntotal runs: " + trialCount + "\ntotal proper resets: " + fullResetCount + "\ntotal runs without repeats: " + noRepeatCount + "\ntotal runs without skips: " + noSkipCount);
    console.log("\ntotal improper resets: " + (trialCount-fullResetCount) + "\ntotal runs with repeats: " + (trialCount - noRepeatCount) + "\ntotal runs with skips: " + (trialCount - noSkipCount));

}

// Run the automated test for 1 trial
automatedTest();

class BingoCaller {
            constructor() {
                this.callOrder = this.generateBingoNumbers();
                this.calledNumbers = [];
                this.interval = null;
                this.delay = 1000; // Default 1 second
                this.createBingoGrid();
                this.isPaused = true;
            }

            generateBingoNumbers() {
                let numbers = Array.from({ length: 75 }, (_, i) => i + 1);
                for (let i = numbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                }
                return numbers;
            }

            createBingoGrid() {
                const grid = document.getElementById("bingoGrid");
                for (let i = 1; i <= 75; i++) {
                    let circle = document.createElement("div");
                    circle.classList.add("bingo-circle");
                    circle.innerText = i;
                    circle.id = `circle-${i}`;
                    grid.appendChild(circle);
                }
            }
            startCalling() {
                if(this.isPaused){
                    if (this.interval || this.callOrder.length === 0) return;
                    this.interval = setInterval(() => this.callNumber(), this.delay);
                    this.isPaused = false;
                    document.getElementById("playButton").innerHTML = "Stop";
                } else {
                    clearInterval(this.interval);
                    this.interval = null;
                    this.isPaused = true;
                    document.getElementById("playButton").innerHTML = "Play";
                }
                
            }

            pauseCalling() {
                clearInterval(this.interval);
                this.isPaused = false;
                this.startCalling();
                this.interval = null;
            }
            callNumber() {
                if (this.callOrder.length > 0) {
                    let num = this.callOrder.shift();
                    this.calledNumbers.push(num);

                    // Create a new circle for the called number
                    const calledNumberElement = document.createElement("span");
                    calledNumberElement.innerText = num;
                    document.getElementById("calledNumbers").appendChild(calledNumberElement);

                    // If more than 4 numbers have been called, remove the oldest
                    if (this.calledNumbers.length > 4) {
                        const oldest = document.getElementById("calledNumbers").firstChild;
                        document.getElementById("calledNumbers").removeChild(oldest);
                    }

                    // If the number is one of the 4 most recent, make it large
                    if (this.calledNumbers.length <= 4) {
                        calledNumberElement.classList.add('recent');
                    }

                    // Update the grid with the called number
                    document.getElementById(`circle-${num}`).classList.add("called");
                    console.log(`Called Number: ${num}`);
                    document.getElementById("testOutput").innerText = `\nLast Called: ${num}`;
                } 
            }
            updateSpeed(value) {
                this.delay = value;
                document.getElementById("speedLabel").innerText = (value / 1000).toFixed(1) + "s";
                if (this.interval) {
                    this.pauseCalling();
                    this.startCalling();
                }
            }
            reset() {
                this.pauseCalling();
                console.log("reset!");
                for (let i = 1; i <= 75; i++) {
                    document.getElementById(`circle-${i}`).classList.remove("called");
                }
                
                for(let i = 0; i < this.calledNumbers.length; i++){
                    calledNumbers.shift();
                }
                
    
                this.callOrder = this.generateBingoNumbers();
                console.log("reset!");
            }
        }
        function showOptionMenu(){
            document.getElementById("optionMenu").style.visibility = "visible";
        }
        function hideOptionMenu(){
            document.getElementById("optionMenu").style.visibility = "hidden";
        }
        const bingoCaller = new BingoCaller();
        document.getElementById("playButton").addEventListener("click", () => bingoCaller.startCalling());
        document.getElementById("speedSlider").addEventListener("input", (e) => bingoCaller.updateSpeed(e.target.value));
        document.getElementById("optionButton").addEventListener("click",() => showOptionMenu());
        document.getElementById("hideOptionButton").addEventListener("click",() => hideOptionMenu());
        document.getElementById("resetButton").addEventListener("click",() => bingoCaller.reset());