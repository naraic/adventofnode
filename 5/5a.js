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
let seats = fs.readFileSync('input', 'utf-8').trim().split('\n')

const decodedSeats = seats.map(decode)
const splitSeats = decodedSeats.map(separate)
const seatValues = splitSeats.map(seatID)
console.log(Math.max(...seatValues))

