const fs = require('fs');

const initial = fs.readFileSync('input', 'utf-8').trim().split('\n').map((str) => str.split(''));

const OCCUPIED = '#';
const EMPTY = 'L';
const FLOOR = '.';

function countAdjacent(origX, origY, seats) {
  const yMax = seats.length;
  const xMax = seats[0].length;
  let count = 0;
  for (const xOffset of [-1, 0, 1]) {
    for (const yOffset of [-1, 0, 1]) {
      if (xOffset !== 0 || yOffset !== 0) {
        let x = origX + xOffset;
        let y = origY + yOffset;
        let found = false;
        while (found === false
          && y >= 0 && y < yMax
          && x >= 0 && x < xMax) {
          if (seats[y][x] === OCCUPIED) {
            count += 1;
            found = true;
          }
          else if (seats[y][x] === EMPTY) {
            found = true;
          }
          y += yOffset;
          x += xOffset;
        }
      }
    }
  }
  return count;
}

function noChange(prev, curr) {
  // this is horrible and i feel bad
  return JSON.stringify(prev) === JSON.stringify(curr);
}

function countOccupied(seats) {
  let count = 0;
  for (const row of seats) {
    for (const seat of row) {
      if (seat === OCCUPIED) {
        count += 1;
      }
    }
  }
  return count;
}

function nextRound(seats) {
  const next = seats.map((row) => row.slice());
  for (const [y, row] of seats.entries()) {
    for (const [x, seat] of row.entries()) {
      if (seats[y][x] !== FLOOR) {
        const adjacent = countAdjacent(x, y, seats);
        if (adjacent === 0) {
          next[y][x] = OCCUPIED;
        } else if (adjacent >= 5) {
          next[y][x] = EMPTY;
        }
      }
    }
  }
  return next;
}

function print(array) {
  for (const row of array) {
    for (const elem of row) {
      process.stdout.write(elem);
    }
    process.stdout.write('\n');
  }
}

function simulate(start) {
  let next = nextRound(start);
  let curr = start;
  while (noChange(curr, next) === false) {
    curr = next;
    next = nextRound(curr);
  }
  const occupied = countOccupied(curr);
  console.log(occupied);
}

simulate(initial);
