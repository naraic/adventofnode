const fs = require('fs');

const instructions = fs.readFileSync('input', 'utf-8').trim().split('\n');

const mem = {};

function toBinary(dec) {
  const bitLen = 36;
  let int = parseInt(dec, 10);
  let binary = '';
  while (int > 0) {
    binary = String(int % 2) + binary;
    int = Math.floor(int / 2);
  }
  const padding = '0'.repeat(bitLen - binary.length);
  return padding.concat(binary);
}

function toDec(bin) {
  let result = 0;
  [...bin].forEach((digit) => {
    result *= 2;
    if (digit === '1') {
      result += 1;
    }
  });
  return result;
}

function applyMask(addr, mask) {
  let results = [''];
  [...mask].forEach((bit, idx) => {
    switch (bit) {
      case '0':
        results.forEach((result, i) => { results[i] = result.concat(addr[idx]); });
        break;
      case '1':
        results.forEach((result, i) => { results[i] = result.concat('1'); });
        break;
      case 'X':
        results = results.map((result) => `${result}0`)
          .concat(results.map((result) => `${result}1`));
        break;
      default:
    }
  });
  return results;
}

function applyInstruction(mask, ins) {
  const addr = ins.slice(ins.indexOf('[') + 1, ins.indexOf(']'));
  const [, , value] = ins.split(' ');
  const addresses = applyMask(toBinary(addr), mask);
  for (const address of addresses) {
    mem[toDec(address)] = value;
  }
}

function sum() {
  let total = 0;
  for (const [, value] of Object.entries(mem)) {
    total += parseInt(value, 10);
  }
  return total;
}

function run() {
  let mask = null;
  for (const instruction of instructions) {
    if (instruction.includes('mask')) {
      [, , mask] = instruction.split(' ');
    } else {
      applyInstruction(mask, instruction);
    }
  }
  console.log(sum());
}

run();
