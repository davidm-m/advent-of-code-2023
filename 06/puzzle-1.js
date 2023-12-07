const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const [timeLine, distanceLine] = input.split(/\r?\n/);

const times = timeLine.replace(/  +/g, ' ').slice(6).split(' ').map(num => Number.parseInt(num));
const distances = distanceLine.replace(/  +/g, ' ').slice(10).split(' ').map(num => Number.parseInt(num));

const counts = [];

for (let i = 0; i < times.length; i++) {
    let count = 0;
    for (let t = 1; t < times[i]; t++) {
        if ((times[i] - t) * t > distances[i]) {
            count++;
        }
    }
    counts.push(count);
}

console.log(counts.reduce((acc, num) => acc * num, 1));