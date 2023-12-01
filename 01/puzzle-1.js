const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

let total = 0;

for (const line of input.split(/\r?\n/)) {
    for (const character of line.split('')) {
        if (character.match(/[0-9]/)) {
            total += 10 * Number.parseInt(character);
            break;
        }
    }

    for (const character of line.split('').reverse()) {
        if (character.match(/[0-9]/)) {
            total += Number.parseInt(character);
            break;
        }
    }
}

console.log(total);