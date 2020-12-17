#!/usr/bin/env node
const fs = require('fs')

let rules = fs.readFileSync('input', 'utf-8').trim().split('\n')

function splitRule(rule) {
    const container = rule.match(/^(\w+ \w+)/)[1] 
    const re = /(\d) (\w+ \w+)/g
    let match = re.exec(rule)
    let contents = []
    while (match != null) {
        const num = parseInt(match[1])
        const colour = match[2]
        contents.push({colour, num})
        match = re.exec(rule)
    }
    return [container, contents]
}

function makeMap(rules) {
  let dict = new Map()
  for (const rule of rules) {
    const [container, contents] = splitRule(rule)
    dict.set(container, contents)
  }
  return dict
}

function deepCount(bag, bags) {
  if (bags.get(bag).length == 0) {
    return 0
  } 
  total = 0
  for (const {colour,num} of bags.get(bag)) {
    total += (num + (num * deepCount(colour, bags)))
  }
  return total
}

const bags = makeMap(rules)

console.log(deepCount('shiny gold', bags)) 
