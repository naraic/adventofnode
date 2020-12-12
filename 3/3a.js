const fs = require('fs')
const readline = require('readline')

let steps = fs.readFileSync('input', 'utf-8').trim().split('\n')

const slope = {x:3, y:1}

const width = steps[0].length
const height = steps.length

const updateProgress = (x, y, slope) => {
    return {x: (x + slope.x), y: (y + slope.y)}
}

let x = 0
let y = 0
let count = 0
while(y < height) {
    if (steps[y][x%width] == '#') {
        count += 1
    }
    ({x, y} = updateProgress(x, y, slope))
}

console.log(count)
