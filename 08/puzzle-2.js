const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input-2.txt' : './input.txt', { encoding: 'utf8' });
const lines = input.split(/\r?\n/).filter(line => line !== '');

const instructions = lines[0].split('');

const lookup = {};

for (const line of lines.slice(1)) {
    const node = line.slice(0, 3);
    const left = line.slice(7, 10);
    const right = line.slice(12, 15);
    lookup[node] = {
        L: left,
        R: right,
    }
}

let nodes = Object.keys(lookup).filter(node => node.endsWith('A'));

const nodeLoops = [];

nodes.forEach((startNode, i) => {
    const path = [];
    let node = startNode;
    let step = 0;
    while (true) {
        const matchingStep = path.filter(s => s.node === node && s.instruction === step % instructions.length)[0]
        if (matchingStep !== undefined) {
            nodeLoops.push({
                startNode: startNode,
                loopStart: matchingStep.step,
                period: step - matchingStep.step,
                goals: path.filter(x => x.node.endsWith('Z') && x.step >= matchingStep.step).map(x => x.step - matchingStep.step),
            });

            break;
        }

        path.push({
            node: node,
            instruction: step % instructions.length,
            step: step,
        });

        node = lookup[node][instructions[step % instructions.length]];
        step++;
    }
});

console.table(nodeLoops);
// Now put the periods in an online lowest common multiple calculator