const fs = require('fs')

const decode = (s) => {
    let output = ''
    for (const c of s) {
        if(c == 'B' || c == 'R') {
            output += '1'
        } else {
            output += '0'
        }
    }
    return output
}

const parseBin = (n) => {
    let total = 0
    for (const b of n) {
        total *= 2
        total += parseInt(b)
    }
    return total
}

const separate = (seat) => {
    const row = seat.slice(0,7)
    const col = seat.substr(7)
    return {row, col}
}

const seatID = ({row, col}) => {
    return (parseBin(row) * 8) + parseBin(col)
}

const addOffset = (arr) => {
    return [...Array(sorted[0]).keys()].concat(arr)
}

const findSeat = (seats) => {
    for (const index in seats) {
        if (seats[index] != index)
        {
            return index
        }
    }
}


let seats = fs.readFileSync('input', 'utf-8').trim().split('\n')

const decodedSeats = seats.map(decode)
const splitSeats = decodedSeats.map(separate)
const seatValues = splitSeats.map(seatID)
const sorted = seatValues.sort((x, y) => { return x - y})
const offset = addOffset(sorted) //this is so we can binary search, someday...
console.log(findSeat(offset))


