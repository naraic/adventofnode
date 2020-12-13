const fs = require('fs')
const readline = require('readline')

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] //, "cid"]

let passports = fs.readFileSync('input', 'utf-8').trim().split('\n\n')

const testPassport = (passport) => {
    for (field of fields) {
        if (passport.indexOf(field) < 0) {
            return false
        }
    }
    return true
}


let count = 0
for (passport of passports) {
    if (testPassport(passport)) {
        count += 1
    }
}
    
console.log(count)


