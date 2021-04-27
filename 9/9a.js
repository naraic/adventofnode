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

function walk(nums) {
  for (let offset = preambleLength - 1; offset < nums.length; offset += 1) {
    if (search(nums, offset - preambleLength + 1, nums[offset + 1]) === false) {
      console.log(`found! ${nums[offset + 1]}`);
      process.exit();
    }
  }
}

walk(numbers);
