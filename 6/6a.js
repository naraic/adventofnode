const fs = require('fs')

let groups = fs.readFileSync('input', 'utf-8').trim().split('\n\n')

function cleanGroup(group) {
    const splitted = group.split('\n')
    const nested = splitted.map(item => item.split(''))
    const flattened = nested.flat()
    return flattened
}

const cleanedGroups = groups.map(cleanGroup)
const setGroups = cleanedGroups.map(group => new Set(group))

const sizeGroups = setGroups.map(set => set.size)

const summed = sizeGroups.reduce((a, b) => a + b, 0)
console.log(summed)


