//B: 1-15, I:16-30, N: 31-45, G: 46-60 O: 61-75
let callOrder = shuffle(newPopulatedArray());

while (callOrder.length > 0) {
    console.log(numToString(callNumber()));
}

function newPopulatedArray() { // returns an int array [1-75] incl, sorted
    let ret = [];
    for (let i = 1; i <= 75; i++) {
        ret.push(i);
    }
    return ret;
}

function shuffle(array) { // shuffles the given array reference
    for (let i = 0; i < array.length - 1; i++) {
        let otherPos = Math.floor(Math.random() * (75 - i) + i);
        let temp = array[i];
        array[i] = array[otherPos];
        array[otherPos] = temp;
    }
}

function callNumber() {
    return callOrder.pop();
}

function numToString(num) {
    let cat = Math.floor((num - 1) / 15);
    return (cat > 2 ? (cat > 3 ? "O" : "G") : (cat > 1 ? "N" : (cat > 0 ? "I" : "B"))) + num;
}