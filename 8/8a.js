#!/usr/bin/env node
const fs = require('fs');

const state = {
  PC: 0,
  ACC: 0,
};

function decodeExecute(op, operand) {
  switch (op) {
    case 'acc':
      state.ACC += operand;
      state.PC += 1;
      break;
    case 'nop':
      state.PC += 1;
      break;
    case 'jmp':
      state.PC += operand;
      break;
    default:
  }
}

function initTracker() {
  const visited = [];
  return (pc) => {
    if (visited.includes(pc)) {
      return false;
    }
    visited.push(pc);
    return true;
  };
}

function check(prog) {
  const haveNotVisited = initTracker();
  do {
    const [op, operand] = prog[state.PC].split(' ');
    decodeExecute(op, parseInt(operand, 10));
  } while (haveNotVisited(state.PC));
  console.log(state.ACC);
}

const prog = fs.readFileSync('input', 'utf-8').trim().split('\n');

check(prog);
