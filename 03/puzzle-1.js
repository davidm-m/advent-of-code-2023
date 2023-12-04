const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const lines = input.split(/\r?\n/);
const symbolCoords = [];
const numberCoords = [];

for (let [i, line] of lines.entries()) {
    for (let j = 0; j < line.length; j++) {
        if (!line.charAt(j).match(/[0-9\.]/)) {
            const adjacentCoords = [];
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    adjacentCoords.push({i: i + x, j: j + y});
                }
            }
            symbolCoords.push({i: i, j: j, adjacentCoords: adjacentCoords});
        }
        if (line.charAt(j).match(/[0-9]/)) {
            let start = j;
            while (line.charAt(j + 1).match(/[0-9]/)) {
                j++;
            }
            const coords = [];
            for (let x = start; x <= j; x++) {
                coords.push({i: i, j: x});
            }
            numberCoords.push({value: Number.parseInt(line.substring(start, j+1)), i: i, start: start, end: j, coords: coords, part: false});
        }
    }
}

for (const symbol of symbolCoords) {
    const adjacentNumbers = numberCoords.filter(number => {
        if (number.part) {
            return false;
        }

        for (const symbolCoord of symbol.adjacentCoords) {
            if (number.coords.some(numCoord => symbolCoord.i === numCoord.i && symbolCoord.j === numCoord.j)) {
                return true;
            }
        }
        return false;
    });
    adjacentNumbers.forEach(num => num.part = true);
}

// console.table(symbolCoords[0].adjacentCoords);
// console.table(numberCoords[0].coords);
console.log(numberCoords.filter(num => num.part === true).reduce((acc, num) => acc + num.value, 0));