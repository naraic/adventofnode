#!/usr/bin/env node
const fs = require('fs')

let rules = fs.readFileSync('input', 'utf-8').trim().split('\n')

function splitRule(rule) {
    const container = rule.match(/^(\w+ \w+)/)[1] 
    const re = /(\d) (\w+ \w+)/g
    let match = re.exec(rule)
    let contents = []
    while (match != null) {
        const num = match[1]
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

function searchList(needle, haystack) {
    for (const {colour, num} of haystack) {
        if (colour == needle) {
            return true
       }
    }
    return false
}


function deepSearch(bag, bags) {
  if (bags.get(bag) == []) {
    return false
  } 
  if (searchList('shiny gold', bags.get(bag))) {
    return true
  }
  for (const {colour,num} of bags.get(bag)) {
    if(deepSearch(colour, bags)) {
      return true
    }
  }
  return false
}

const bags = makeMap(rules)

let count = 0

for (const bag of bags.keys()) {
  if (deepSearch(bag, bags)) {
    count += 1
  }
}

console.log(count)
