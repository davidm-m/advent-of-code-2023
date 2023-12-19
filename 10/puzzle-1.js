const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const sX = test ? 0 : 74;
const sY = test ? 2 : 95;

const grid = [];

for (const line of input.split(/\r?\n/).filter(a => a !== '')) {
    grid.push(line.split(''));
}

let x = sX + 1;
let y = sY;
let prevX = sX;
let prevY = sY;
let count = 1;
while (grid[y][x] !== 'S') {
    count++;
    switch (grid[y][x]) {
        case '|':
            if (prevY === y + 1) {
                prevY = y;
                y =  y - 1;
            } else {
                prevY = y;
                y = y + 1;
            }
            break;
        case '-':
            if (prevX === x + 1) {
                prevX = x;
                x = x - 1;
            } else {
                prevX = x;
                x = x + 1;
            }
            break;
        case 'L':
            if (prevX === x + 1) {
                prevX = x;
                y = y - 1;
            } else {
                prevY = y;
                x = x + 1;
            }
            break;
        case 'J':
            if (prevX === x - 1) {
                prevX = x;
                y = y - 1;
            } else {
                prevY = y;
                x = x - 1;
            }
            break;
        case '7':
            if (prevX === x - 1) {
                prevX = x;
                y = y + 1;
            } else {
                prevY = y;
                x = x - 1;
            }
            break;
        case 'F':
            if (prevX === x + 1) {
                prevX = x;
                y = y + 1;
            } else {
                prevY = y;
                x = x + 1;
            }
            break;
        default:
            throw new Error(`${grid[y][x]} is not a pipe! y = ${y}, x = ${x}`);
    }
}

console.log(count / 2);