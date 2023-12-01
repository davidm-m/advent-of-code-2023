const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input-2.txt' : './input.txt', { encoding: 'utf8' });

let total = 0;

const numbers = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };

for (const line of input.split(/\r?\n/)) {
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i).match(/[0-9]/)) {
            total += 10 * Number.parseInt(line.charAt(i));
            break;
        } else {
            let flag = false;
            for (const num in numbers) {
                if (line.startsWith(num, i)) {
                    total += 10 * numbers[num];
                    flag = true;
                }
            }
            if (flag) {
                break;
            }
        }
    }

    for (let i = line.length - 1; i >= 0; i--) {
        if (line.charAt(i).match(/[0-9]/)) {
            total += Number.parseInt(line.charAt(i));
            break;
        } else {
            let flag = false;
            for (const num in numbers) {
                if (line.startsWith(num, i)) {
                    total += numbers[num];
                    flag = true;
                }
            }
            if (flag) {
                break;
            }
        }
    }
}

console.log(total);