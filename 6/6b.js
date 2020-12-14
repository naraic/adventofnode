const fs = require('fs')

let groups = fs.readFileSync('input', 'utf-8').trim().split('\n\n')

function cleanGroup(group) {
    const splitted = group.split('\n')
    const nested = splitted.map(item => item.split(''))
    return nested
    const flattened = nested.flat()
    return flattened
}

const cleanedGroups = groups.map(cleanGroup)

let total = 0
for (const group of cleanedGroups) {
    const size = group.length
    const answers = {}
    for(const person of group) {
        for(const answer of person) {
            if (answer in answers) {
                answers[answer] += 1
            } else {
                answers[answer] = 1
            }
        }
    }
    let count = 0
    for(let [key, value] of Object.entries(answers)) {
        if(value == size) {
            count += 1
        }
    }
    total += count
}
console.log(total)

