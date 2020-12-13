const fs = require('fs')
const readline = require('readline')

const checkRange = (min, max) => {
    return (numStr) => {
        const num = parseInt(numStr)
        if(isNaN(num)) {
            return false
        } else {
            return (num >= min && num <= max)
        }
    }
}

const checkHgt = (height) => {
    const heightInt = parseInt(height)
    if (height.indexOf('cm') > 0) {
        cmCheck = checkRange(150, 193)
        return cmCheck(heightInt)
    } else if (height.indexOf('in') > 0) {
        inCheck = checkRange(59, 76)
        return inCheck(heightInt)
    } else return false
}

const checkHcl = (colour) => {
    const matches = colour.match(/^#[a-f0-9]{6}$/) || []
    return matches.length > 0
}


const checkEcl = (colour) => {
    const colours = ['amb','blu','brn','gry','grn','hzl','oth']
    return (colours.indexOf(colour) >= 0)
}

const checkPid = (number) => {
    const matches = number.match(/^[0-9]{9}$/) || []
    return matches.length > 0
}

const rules = {
    "byr":checkRange(1920,2020),
    "iyr":checkRange(2010,2020), 
    "eyr":checkRange(2020,2030),
    "hgt":checkHgt, 
    "hcl":checkHcl,
    "ecl":checkEcl,
    "pid":checkPid,
    //"cid":() => { return true }, 
}


let passports = fs.readFileSync('input', 'utf-8').trim().split('\n\n')

const splitPassport = (passport) => {
    const fields = passport.split(/ |\n/)
    const data = {}
    for (field of fields) {
        const [name, value] = field.split(':')
        data[name] = value
    }
    return data 
}

const testPassport = (passport) => {
    const fields = splitPassport(passport)
    for (const [field, test] of Object.entries(rules)) {
        if (field in fields) {
            const value = fields[field]
            if (!test(value)) {
                return false
            }
        } else return false
    }
    return true
}


let count = 0
for (const passport of passports) {
    if (testPassport(passport)) {
        count += 1
    }
}

console.log(count)
