const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

let total = 0;

for (const line of input.split(/\r?\n/)) {
    if (line === '') {
        continue;
    }

    const colours = {
        red: 0,
        blue: 0,
        green: 0,
    }

    const reveals = line.split(': ')[1].split('; ')
    for (const reveal of reveals) {
        for (const cubes of reveal.split(', ')) {
            const values = cubes.split(' ');
            let count = Number.parseInt(values[0]);
            let colour = values[1];
            if (count > colours[colour]) {
                colours[colour] = count;
            }
        }
    }

    total += colours['red'] * colours['blue'] * colours['green'];
}

console.log(total);