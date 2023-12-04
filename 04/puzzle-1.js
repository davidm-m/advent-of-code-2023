const fs = require('fs');

const test = true;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

let total = 0;

for (const line of input.split(/\r?\n/)) {
    if (line === '') {
        continue;
    }

    const winners = line.split(': ')[1].split(' | ')[0].split(' ')
        .filter(num => num !== '')
        .map(num => Number.parseInt(num));
    
    const numbers = line.split(' | ')[1].split(' ')
        .filter(num => num !== '')
        .map(num => Number.parseInt(num));
    
    const foundWinners = numbers.filter(num => winners.includes(num)).length;

    if (foundWinners > 0) {
        total += 2 ** (foundWinners - 1);
    }
}

console.log(total);