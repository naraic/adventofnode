const fs = require('fs');

let [, timetable] = fs.readFileSync('input', 'utf-8').trim().split('\n');

timetable = timetable.split(',');

const buses = timetable.map((n) => {
  if (n !== 'x') {
    return parseInt(n, 10);
  }
  return n;
});

const leastFrequent = Math.max(...buses.filter((n) => n !== 'x'));
const leastFreqPos = buses.indexOf(leastFrequent);

let smartTimetable = buses.filter((n) => n !== 'x');
smartTimetable = smartTimetable.map((bus) => {
  const offset = buses.indexOf(bus);
  return { bus, offset };
});

function test(timestamp, timetable) {
  return timetable.every(({ bus, offset }) => {
    if ((timestamp + offset) % bus !== 0) {
      return false;
    }
    return true;
  });
}

//this was kinda a hint in the question, right?
let factor = Math.floor(100000000000000 / leastFrequent); 
// let factor = 0;

while (true) {
  if (test(((factor * leastFrequent) - leastFreqPos), smartTimetable) === true) {
    console.log((factor * leastFrequent) - leastFreqPos);
    process.exit();
  }
  factor += 1;
}
