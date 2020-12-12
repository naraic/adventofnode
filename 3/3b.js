const fs = require('fs')
const readline = require('readline')

let steps = fs.readFileSync('input', 'utf-8').trim().split('\n')

const slopes = [{x:1, y:1},
                {x:3, y:1},
                {x:5, y:1},
                {x:7, y:1},
                {x:1, y:2}]

const width = steps[0].length
const height = steps.length

const updateProgress = (x, y, slope) => {
    return {x: (x + slope.x), y: (y + slope.y)}
}

let product = 1
for (const slope of slopes) {
    let x = 0
    let y = 0
    let count = 0
    while(y < height) {
        if (steps[y][x%width] == '#') {
            count += 1
        }
        ({x, y} = updateProgress(x, y, slope))
    }
    product *= count
    count = 0
}

console.log(product)

