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
    if (state.PC >= prog.length) {
      if (state.PC === prog.length) {
        console.log(`yay! ${state.ACC}`);
      }
      process.exit();
    }
    const [op, operand] = prog[state.PC].split(' ');
    decodeExecute(op, parseInt(operand, 10));
  } while (haveNotVisited(state.PC));
}

function swap(instruction) {
  const [opcode, operand] = instruction.split(' ');
  if (opcode === 'nop') {
    return `jmp ${operand}`;
  }
  return `nop ${operand}`;
}

function bruteForce(prog) {
  for (let i = 0; i < prog.length; i += 1) {
    if (!prog[i].includes('acc')) {
      const copy = [...prog];
      copy[i] = swap(copy[i]);
      state.PC = 0;
      state.ACC = 0;
      check(copy);
    }
  }
}

const prog = fs.readFileSync('input', 'utf-8').trim().split('\n');
bruteForce(prog);
