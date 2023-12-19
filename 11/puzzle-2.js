const fs = require('fs');

const test = false;
const scale = 1_000_000;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const grid = [];

for (const line of input.split(/\r?\n/).filter(a => a !== '')) {
    grid.push(line.split(''));
}

const emptyX = [];
const emptyY = [];

for (let i = 0; i < grid.length; i++) {
    if (grid[i].every(a => a === '.')) {
        emptyY.push(i);
    }
}


for (let i = 0; i < grid[0].length; i++) {
    let empty = true;
    for (let j = 0; j < grid.length; j++) {
        empty = empty && grid[j][i] === '.'
    }
    if (empty) {
        emptyX.push(i);
    }
}

const galaxies = [];

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
            let scaledX = x + (scale - 1) * emptyX.filter(i => i < x).length
            let scaledY = y + (scale - 1) * emptyY.filter(i => i < y).length
            galaxies.push({x: scaledX, y: scaledY});
        }
    }
}

const differences = [];

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        differences.push(Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y));
    }
}

// console.table(galaxies);
// console.table(differences);
console.log(differences.reduce((acc, val) => acc + val, 0));