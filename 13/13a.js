const fs = require('fs');

let [departure, timetable] = fs.readFileSync('input', 'utf-8').trim().split('\n');

timetable = timetable.split(',');

let buses = timetable.filter((n) => n !== 'x');

departure = parseInt(departure, 10);
buses = buses.map((n) => parseInt(n, 10));

const waits = buses.map((x) => ((Math.floor(departure / x) + 1) * x) - departure);

const shortest = Math.min(...waits);

const soonest = buses[waits.indexOf(shortest)];

console.log(soonest * shortest);
