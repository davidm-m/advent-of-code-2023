const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const seeds = []
for (let [i, value] of input.split(/\r?\n/)[0].substring(7).split(' ').map(num => Number.parseInt(num)).entries()) {
    if (i % 2 === 0) {
        seeds.push({min: value})
    } else {
        let currSeed = seeds[seeds.length - 1]
        currSeed.max = currSeed.min + value - 1;
    }
}

function linesToMap(lines) {
    const map = [];
    for (const line of lines) {
        const numbers = line.split(' ').map(num => Number.parseInt(num));
        map.push({
            min: numbers[1],
            max: numbers[1] + numbers[2] - 1,
            diff: numbers[0] - numbers[1],
        });
    }
    return map;
}

function mapRanges(ranges, maps) {
    const newRanges = [];
    for (const range of ranges) {
        newRanges.push(mapRange(range, maps));
    }
    return newRanges.flat();
}

function mapRange(range, maps) {
    const newRanges = [];
    let start = range.min;
    while (start <= range.max) {
        const map = maps.find(m => start >= m.min && start <= m.max);
        if (map === undefined) {
            const nextMap = maps.filter(m => m.min > start && m.min <= range.max).sort((a, b) => a.min - b.min)[0];
            if (nextMap === undefined) {
                newRanges.push({min: start, max: range.max});
                break;
            }
            newRanges.push({min: start, max: nextMap.min - 1});
            start = nextMap.min;
            continue;
        }
        newRanges.push({min: start + map.diff, max: range.max > map.max ? map.max + map.diff : range.max + map.diff});
        start = map.max + 1;
    }
    return newRanges;
}

const maps = input.split(/(\r?\n){2}/).slice(1).filter(val => !val.match(/^\r?\n$/));
const seedToSoil = linesToMap(maps[0].split(/\r?\n/).slice(1));
const soilToFertiliser = linesToMap(maps[1].split(/\r?\n/).slice(1));
const fertiliserToWater = linesToMap(maps[2].split(/\r?\n/).slice(1));
const waterToLight = linesToMap(maps[3].split(/\r?\n/).slice(1));
const lightToTemperature = linesToMap(maps[4].split(/\r?\n/).slice(1));
const temperatureToHumidity = linesToMap(maps[5].split(/\r?\n/).slice(1));
const humidityToLocation = linesToMap(maps[6].split(/\r?\n/).slice(1));

const journeys = seeds.map(seed => {
    const journey = {seed: seed};
    journey['soil'] = mapRange(seed, seedToSoil);
    journey['fertiliser'] = mapRanges(journey['soil'], soilToFertiliser);
    journey['water'] = mapRanges(journey['fertiliser'], fertiliserToWater);
    journey['light'] = mapRanges(journey['water'], waterToLight);
    journey['temperature'] = mapRanges(journey['light'], lightToTemperature);
    journey['humidity'] = mapRanges(journey['temperature'], temperatureToHumidity);
    journey['location'] = mapRanges(journey['humidity'], humidityToLocation);

    return journey;
});

let minLocation = Number.MAX_SAFE_INTEGER;
for (const journey of journeys) {
    for (const range of journey.location) {
        if (range.min < minLocation) {
            minLocation = range.min;
        }
    }
}

console.table(minLocation);