#!/usr/bin/env node

const fs = require('fs')

let rules = fs.readFileSync('testinput', 'utf-8').trim().split('\n')
//let rules = fs.readFileSync('input', 'utf-8').trim().split('\n')

function splitRule(rule) {
    const container = rule.match(/^(\w+ \w+)/)[1] //.*(\d \w+ \w+).*(\d \w+ \w+)/)[
    const re = /(\d) (\w+ \w+)/g
    let match = re.exec(rule)
    let contents = []
    while (match != null) {
        const num = match[1]
        const colour = match[2]
        contents.push({colour,num})
        match = re.exec(rule)
    }
    return {container, contents}
}

const util = require('util')

console.log(util.inspect(rules.map(splitRule), {depth:4}))
//console.log(rules.map(splitRule))
