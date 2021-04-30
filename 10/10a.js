const fs = require('fs')

const adapters = fs.readFileSync('input', 'utf-8').trim().split('\n').map(num => parseInt(num, 10))

adapters.push(0); //wall socket
adapters.push(Math.max(...adapters) + 3); //device power

adapters.sort((a, b) => a - b);

function countDiffs(adapters) {
  let ones = 0;
  let twos = 0;
  let threes = 0;
  for (let i = 1; i < adapters.length; i += 1) {
    switch(adapters[i] - adapters[i - 1]) {
      case 1: 
        ones += 1;
        break;
      case 2:
        twos += 1;
        break;
      case 3:
        threes += 1;
        break;
      default:
        console.log('oops');
    }
  }
  console.log(ones * threes);
}

countDiffs(adapters);
