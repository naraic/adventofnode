const fs = require('fs');

const numbers = fs.readFileSync('input', 'utf-8')
  .trim().split(',');

const seen = {};

// load initial
numbers.slice(0, numbers.length - 1).forEach((num, i) => {
  seen[num] = i + 1;
});

const target = 30000000;

let last = numbers[numbers.length - 1];
let next;
for (let turn = numbers.length; turn < target; turn += 1) {
  if (seen.hasOwnProperty(last)) {
    next = String(turn - seen[last]);
  } else {
    seen[last] = turn;
    next = '0';
  }
  seen[last] = turn;
  last = next;
}

console.log(last)
