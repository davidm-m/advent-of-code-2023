const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const [timeLine, distanceLine] = input.split(/\r?\n/);

const time = Number.parseInt(timeLine.replace(/ +/g, '').slice(5));
const distance = Number.parseInt(distanceLine.replace(/ +/g, '').slice(9));

let count = 0;
for (let t = 1; t < time; t++) {
    if ((time - t) * t > distance) {
        count++;
    }
}

console.log(count);