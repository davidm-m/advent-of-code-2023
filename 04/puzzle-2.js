const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const scratchcards = [];

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
    scratchcards.push({points: foundWinners, copies: 1})
}

for (let i = 0; i < scratchcards.length; i++) {
    for (let j = 1; j <= scratchcards[i].points; j++) {
        scratchcards[i + j].copies += scratchcards[i].copies;
    }
};

console.log(scratchcards.reduce((acc, card) => acc += card.copies, 0));