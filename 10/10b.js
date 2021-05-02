const fs = require('fs');

const adapterList = fs.readFileSync('input', 'utf-8')
  .trim()
  .split('\n')
  .map((num) => parseInt(num, 10));

adapterList.push(0); // wall socket
adapterList.push(Math.max(...adapterList) + 3); // device power

adapterList.sort((a, b) => a - b);

function countDiffs(adapters) {
  let counting = false;
  let start = 0;
  let combinations = 1;
  for (let i = 1; i < adapters.length; i += 1) {
    switch (adapters[i] - adapters[i - 1]) {
      case 1:
        if (counting === false) {
          counting = true;
          start = i - 1;
        }
        break;
      case 2:
        console.log('oh no');
        break;
      case 3:
        if (counting === true) {
          counting = false;
          const end = i - 1;
          const len = end - start + 1;
          if (len === 5) {
            combinations *= 7;
          } else if (len === 4) {
            combinations *= 4;
          } else if (len === 3) {
            combinations *= 2;
          }
        }
        break;
      default:
        console.log('oops');
    }
  }
  console.log(combinations);
}

countDiffs(adapterList);
