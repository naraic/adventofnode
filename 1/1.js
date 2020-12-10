const fs = require('fs')
//const test =  '1721 \
//                979 \
//                366 \
//                299 \
//                675 \
//                1456'
let data = fs.readFileSync('input', 'utf-8').trim().split('\n').map(x => parseInt(x))
const target = 2020
let count = 0
for (let i in data) {
    for (let j of data.slice(i)) {
        count += 1
        console.log(count)
        if (data[i] + j == target) {
            console.log(data[i] * j)
            //process.exit()            
        }
    }
}