const fs = require('fs')

let items = fs.readFileSync('input', 'utf-8').trim().split('\n')

const checkValidity = (policy, password) => {
    const rule = genRule(policy)
    return rule(password)
}

const genRule = (policy) => {
    const [range, letter] = policy.split(' ')
    const [one, two] = range.split('-').map(n => parseInt(n))
    return (password) => {
        return password[one] == letter ^ password[two] == letter
    }
}    

let valid = 0
const split_items = items.map(item => item.split(':'))
console.log(split_items.filter(([policy,password]) => checkValidity(policy, password)).length)

process.exit()
for (item of items) {
    const [policy, password] = item.split(':')
    checkValidity(policy, password)
    //console.log(policy, password)
}
