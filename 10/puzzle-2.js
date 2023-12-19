const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const sX = test ? 0 : 74;
const sY = test ? 2 : 95;
const sReplace = test ? 'F' : 'L';

const grid = [];
const newGrid = [];

for (const line of input.split(/\r?\n/).filter(a => a !== '')) {
    grid.push(line.split(''));
}
for (let i = 0; i < grid.length; i++) {
    newGrid.push(new Array(grid[i].length).fill('.'));
}
newGrid[sY][sX] = sReplace;

const expandedGrid = [];
for (let i = 0; i < newGrid.length; i++) {
    const line = [];
    for (let j = 0; j < newGrid[i].length; j++) {
        line.push(newGrid[i][j]);
        line.push('*');
    }
    const secondLine = new Array(line.length).fill('*');
    expandedGrid.push(line);
    expandedGrid.push(secondLine);
}

let x = sX + 1;
let y = sY;
expandedGrid[2 * y][2 * x - 1] = '-';
let prevX = sX;
let prevY = sY;
let count = 1;
while (grid[y][x] !== 'S') {
    count++;
    newGrid[y][x] = grid[y][x];
    switch (grid[y][x]) {
        case '|':
            expandedGrid[2 * y][2 * x] = '|'
            if (prevY === y + 1) {
                prevY = y;
                y =  y - 1;
                expandedGrid[2 * y + 1][2 * x] = '|'
            } else {
                prevY = y;
                y = y + 1;
                expandedGrid[2 * y - 1][2 * x] = '|'
            }
            break;
        case '-':
            expandedGrid[2 * y][2 * x] = '-'
            if (prevX === x + 1) {
                prevX = x;
                x = x - 1;
                expandedGrid[2 * y][2 * x + 1] = '-'
            } else {
                prevX = x;
                x = x + 1;
                expandedGrid[2 * y][2 * x - 1] = '-'
            }
            break;
        case 'L':
            expandedGrid[2 * y][2 * x] = 'L'
            if (prevX === x + 1) {
                prevX = x;
                y = y - 1;
                expandedGrid[2 * y + 1][2 * x] = '|'
            } else {
                prevY = y;
                x = x + 1;
                expandedGrid[2 * y][2 * x - 1] = '-'
            }
            break;
        case 'J':
            expandedGrid[2 * y][2 * x] = 'J'
            if (prevX === x - 1) {
                prevX = x;
                y = y - 1;
                expandedGrid[2 * y + 1][2 * x] = '|'
            } else {
                prevY = y;
                x = x - 1;
                expandedGrid[2 * y][2 * x + 1] = '-'
            }
            break;
        case '7':
            expandedGrid[2 * y][2 * x] = '7'
            if (prevX === x - 1) {
                prevX = x;
                y = y + 1;
                expandedGrid[2 * y - 1][2 * x] = '|'
            } else {
                prevY = y;
                x = x - 1;
                expandedGrid[2 * y][2 * x + 1] = '-'
            }
            break;
        case 'F':
            expandedGrid[2 * y][2 * x] = 'F'
            if (prevX === x + 1) {
                prevX = x;
                y = y + 1;
                expandedGrid[2 * y - 1][2 * x] = '|'
            } else {
                prevY = y;
                x = x + 1;
                expandedGrid[2 * y][2 * x - 1] = '-'
            }
            break;
        default:
            throw new Error(`${grid[y][x]} is not a pipe! y = ${y}, x = ${x}`);
    }
}

for (let i = 0; i < expandedGrid.length; i++) {
    console.log(expandedGrid[i].join(''));
}
console.log(expandedGrid.length * expandedGrid[0].length);

while (true) {
    let x = -1;
    let y = -1;
    for (let i = 0; i < expandedGrid.length; i++) {
        x = expandedGrid[i].indexOf('.');
        if (x !== -1) {
            y = i;
            break;
        }
    }
    if (x === -1 && y === -1) {
        break;
    }

    const search = [{x: x, y: y}];
    const visited = [];
    let edge = false;
    while (search.length > 0) {
        const coords = search.pop();
        let result = explore(coords.x, coords.y, expandedGrid, visited, search);
        edge = edge || result;
    }

    let char = edge ? 'X' : '+';
    for (const coords of visited) {
        if (expandedGrid[coords.y][coords.x] === '.') {
            expandedGrid[coords.y][coords.x] = char;
        }
    }
}

for (let i = 0; i < expandedGrid.length; i++) {
    console.log(expandedGrid[i].join(''));
}
console.log(expandedGrid.reduce((outerAcc, outerVal) => {
    return outerAcc += outerVal.reduce((innerAcc, innerVal) => innerAcc += (innerVal === '+' ? 1 : 0), 0)
}, 0));

function explore(x, y, expandedGrid, visited, search) {
    let edge = false;
    visited.push({x: x, y: y});
    const adjacent = [];

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (x + dx < 0 || y + dy < 0 || x + dx >= expandedGrid[y].length || y + dy >= expandedGrid.length) {
                edge = true;
                continue;
            }
            if (dx === 0 && dy === 0) {
                continue;
            }
            adjacent.push({x: x + dx, y: y + dy});
        }
    }

    for (const coords of adjacent) {
        const character = expandedGrid[coords.y][coords.x];
        if ((character === '.' || character === '*') && !visited.some(visited => visited.x === coords.x && visited.y === coords.y) && !search.some(search => search.x === coords.x && search.y === coords.y)) {
            search.push(coords);
        }
    }
    return edge;
}