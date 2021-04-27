#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
const fs = require('fs')

const numbers = fs.readFileSync('input', 'utf-8').trim().split('\n').map(num => parseInt(num))

const preambleLength = 25;

function search(nums, offset, target) {
  const searchSpace = nums.slice(offset, offset + preambleLength);
  for (const [idx, val] of searchSpace.entries()) {
    const subSpace = searchSpace.slice(idx);
    for (const subVal of subSpace) {
      if (val + subVal === target) {
        return true;
      }
    }
  }
  return false;
}

function findSequence(nums, target) {
  let i = 0;
  let j = 1;
  while (true) {
    const seq = nums.slice(i, j);
    const sum = seq.reduce((acc, val) => acc + val);
    if (sum === target) {
      console.log(Math.min(...seq) + Math.max(...seq));
      process.exit();
    }
    if (sum > target) {
      i += 1;
    } else {
      j += 1;
    }
  }
}

function walk(nums) {
  for (let offset = preambleLength - 1; offset < nums.length; offset += 1) {
    if (search(nums, offset - preambleLength + 1, nums[offset + 1]) === false) {
      const target = nums[offset + 1];
      findSequence(nums, target);
    }
  }
}

walk(numbers);
