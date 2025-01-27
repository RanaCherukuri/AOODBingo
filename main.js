let numsCalled = [];//B: 1-15, I:16-30, N: 31-45, G: 46-60 O: 61-75
let number;
for(let i = 0; i < 100; i++) {
    number = Math.floor(Math.random()*75);
    if (!isCalled(number)) {
        numsCalled.push(number);
        console.log(number);
    }
    numsCalled.push(number);
}
console.log("\n");
console.log(numsCalled);


function isCalled(number) {
    for (let i = 0; i < numsCalled.length; i++) {
        if (numsCalled[i] == number) {
            return true;
        }
    }
    return false;
}