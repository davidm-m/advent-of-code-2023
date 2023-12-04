const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const max = {
    blue: 14,
    green: 13,
    red: 12,
}

let total = 0;
let game = 1;

for (const line of input.split(/\r?\n/)) {
    if (line === '') {
        continue;
    }
    
    let valid = true;

    const reveals = line.split(': ')[1].split('; ')
    for (const reveal of reveals) {
        for (const cubes of reveal.split(', ')) {
            const values = cubes.split(' ');
            let count = Number.parseInt(values[0]);
            let colour = values[1];
            if (count > max[colour]) {
                valid = false;
                break;
            }
        }

        if (!valid) {
            break;
        }
    }

    if (valid) {
        total += game;
    }

    game++;
}

console.log(total);