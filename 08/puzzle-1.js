const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });
const lines = input.split(/\r?\n/).filter(line => line !== '');

const instructions = lines[0].split('');

const lookup = {};

for (const line of lines.slice(1)) {
    const node = line.slice(0, 3);
    const left = line.slice(7, 10);
    const right = line.slice(12, 15);
    lookup[node] = {
        L: left,
        R: right,
    }
}

let steps = 0;
let node = "AAA";

while (true) {
    if (node === "ZZZ") {
        break;
    }
    node = lookup[node][instructions[steps % instructions.length]];
    steps++;
}

console.log(steps);