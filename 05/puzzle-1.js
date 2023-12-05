const fs = require('fs');

const test = false;

const input = fs.readFileSync(test ? './test-input.txt' : './input.txt', { encoding: 'utf8' });

const seeds = input.split(/\r?\n/)[0].substring(7).split(' ').map(num => Number.parseInt(num));

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

function mapValue(value, maps) {
    for (const map of maps) {
        if (value >= map.min && value <= map.max) {
            return value + map.diff;
        }
    }
    return value;
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
    journey['soil'] = mapValue(seed, seedToSoil);
    journey['fertiliser'] = mapValue(journey['soil'], soilToFertiliser);
    journey['water'] = mapValue(journey['fertiliser'], fertiliserToWater);
    journey['light'] = mapValue(journey['water'], waterToLight);
    journey['temperature'] = mapValue(journey['light'], lightToTemperature);
    journey['humidity'] = mapValue(journey['temperature'], temperatureToHumidity);
    journey['location'] = mapValue(journey['humidity'], humidityToLocation);

    return journey;
});

console.table(journeys.sort((a, b) => a['location'] - b['location']));