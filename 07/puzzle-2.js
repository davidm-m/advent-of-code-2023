const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const powerMap = {
    "J": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const handMap = {
    "high": 1,
    "pair": 2,
    "2pair": 3,
    "3kind": 4,
    "house": 5,
    "4kind": 6,
    "5kind": 7,
}

const hands = input.split(/\r?\n/).filter(line => line !== '').map(line => {
    const [hand, betStr] = line.split(' ');
    const bet = Number.parseInt(betStr);
    let type;
    const jCount = hand.split('').filter(a => a === 'J').length;
    const distinct = [...new Set(hand.split('').filter(a => a !== 'J'))];
    if (distinct.length === 1 || distinct.length === 0) {
        type = "5kind";
    } else if (distinct.length === 2) {
        const firstCount = hand.split('').filter(a => a === distinct[0]).length;
        const secondCount = hand.split('').filter(a => a === distinct[1]).length;
        if (firstCount + jCount === 4 || secondCount + jCount === 4) {
            type = "4kind";
        } else {
            type = "house";
        }
    } else if (distinct.length === 3) {
        const firstCount = hand.split('').filter(a => a === distinct[0]).length;
        const secondCount = hand.split('').filter(a => a === distinct[1]).length;
        const thirdCount = hand.split('').filter(a => a === distinct[2]).length;
        if (firstCount + jCount === 3 || secondCount + jCount === 3 || thirdCount + jCount === 3) {
            type = "3kind";
        } else {
            type = "2pair"
        }
    } else if (distinct.length === 4) {
        type = "pair"
    } else {
        type = "high"
    }

    return {
        hand: hand,
        bet: bet,
        type: type,
    }
});

hands.sort((a, b) => {
    if (handMap[a.type] !== handMap[b.type]) {
        return handMap[a.type] - handMap[b.type];
    }

    let aCards = a.hand.split('');
    let bCards = b.hand.split('');
    for (let i = 0; i < aCards.length; i++) {
        if (aCards[i] !== bCards[i]) {
            return powerMap[aCards[i]] - powerMap[bCards[i]];
        }
    }
    return 0;
})

let total = 0;
for (let i = 0; i < hands.length; i++) {
    total += (i + 1) * hands[i].bet;
}
console.log(total);