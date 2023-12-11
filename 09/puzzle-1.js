const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

let total = 0;

for (const line of input.split(/\r?\n/).filter(a => a !== '')) {
    const initialValues = line.split(' ').map(x => Number.parseInt(x));
    const differences = [initialValues];
    while (true) {
        const values = differences[differences.length - 1];
        const newValues = [];
        for (let i = 1; i < values.length; i++) {
            newValues.push(values[i] - values[i - 1]);
        }
        differences.push(newValues);
        if (newValues.reduce((acc, val) => acc && (val === 0), true)) {
            newValues.push(0);
            break;
        }
    }
    for (let i = differences.length - 2; i >= 0; i--) {
        const newChain = differences[i];
        const oldChain = differences[i + 1];
        newChain.push(newChain[newChain.length - 1] + oldChain[oldChain.length - 1]);
    }
    total += differences[0][differences[0].length - 1];
}

console.log(total);