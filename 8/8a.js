#!/usr/bin/env node
const fs = require('fs')

const prog = fs.readFileSync('input', 'utf-8').trim().split('\n')

const state = { PC : 0,
                ACC: 0,
              }

function decode(ins) {
  [op, operand] = ins.split(' ')
    switch(op) {
      case 'acc':
        return (state) => {
          state.ACC += parseInt(operand)
            state.PC += 1
        }
      case 'nop':
        return (state) => {
          state.PC += 1
        }
      case 'jmp':
        return (state) => {
          state.PC += parseInt(operand)
        }
    }
}

function initTracker(state) {
  const visited = []
    function checkPC(state) {
      if (visited.indexOf(state.PC) > 0) {
        return true
      } else {
        visited.push(state.PC)
          return false
      }
    }
  return checkPC
}

const checkPC = initTracker(state)

let ins = prog[0]
while(true) {
  if (checkPC(state)) {
    console.log(state.ACC)
    process.exit()
  }
  const execute = decode(ins)
  execute(state)
  ins = prog[state.PC]
}



