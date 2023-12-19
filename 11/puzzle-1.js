const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const grid = [];

for (const line of input.split(/\r?\n/).filter(a => a !== '')) {
    grid.push(line.split(''));
}

for (let i = 0; i < grid.length; i++) {
    if (grid[i].every(a => a === '.')) {
        grid.splice(i + 1, 0, new Array(grid[i].length).fill('.'));
        i++;
    }
}

for (let i = 0; i < grid[0].length; i++) {
    let empty = true;
    for (let j = 0; j < grid.length; j++) {
        empty = empty && grid[j][i] === '.'
    }
    if (empty) {
        for (let j = 0; j < grid.length; j++) {
            grid[j].splice(i + 1, 0, '.');
        }
        i++;
    }
}

const galaxies = [];

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
            galaxies.push({x, y});
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