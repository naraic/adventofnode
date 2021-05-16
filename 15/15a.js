const fs = require('fs');

const numbers = fs.readFileSync('input', 'utf-8')
  .trim().split(',')
  .map((n) => parseInt(n, 10));

let last = numbers[numbers.length - 1];

while (numbers.length < 2020) {
  const recent = numbers.slice(0, numbers.length - 1).lastIndexOf(last);
  if (recent === -1) {
    numbers.push(0);
  } else {
    numbers.push(numbers.length - recent - 1);
  }
  last = numbers[numbers.length - 1];
}

console.log(last);
