const fs = require('fs');

let [rules, myTicket, tickets] = fs.readFileSync('input', 'utf-8')
  .trim().split('\n\n')
  .map((part) => part.split('\n'));

tickets = tickets.slice(1);
tickets = tickets.map((ticket) =>
  ticket.split(',').map((x) => parseInt(x, 10)));

myTicket = myTicket[1];
myTicket = myTicket.split(',').map((x) => parseInt(x, 10));

function generateRuleset(descriptions) {
  const ruleset = [];
  for (const desc of descriptions) {
    const [name, rest] = desc.split(':');
    const [high, _, low] = rest.trim().split(' ');
    const lows = low.split('-').map((x) => parseInt(x, 10));
    const highs = high.split('-').map((x) => parseInt(x, 10));
    ruleset.push({ name, highs, lows });
  }

  function applyRule(rule, field) {
    const { highs: [x1, x2], lows: [y1, y2] } = rule;
    return (field >= x1 && field <= x2)
      || (field >= y1 && field <= y2);
  }

  function checker(ticket) {
    const failed = ticket.filter((field) => !ruleset.some((rule) => applyRule(rule, field)));
    return (failed.length === 0);
  }
  function matcher(column) {
    const matches = ruleset.filter((rule) =>
      column.every((field) =>
        applyRule(rule, field)));
    return matches.map((match) => match.name);
  }
  return { checker, matcher };
}

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((x) => x[i])); //thanks https://stackoverflow.com/a/36164530
}

function reducer(matches) {
  const target = matches.length;
  while (matches.flat().length > target) {
    for (let i = 0; i < matches.length; i += 1) {
      const match = matches[i];
      if (match.length === 1) {
        for (let j = 0; j < matches.length; j += 1) {
          if (j !== i) {
            const pos = matches[j].indexOf(match[0]);
            if (pos >= 0) {
              matches[j].splice(pos, 1);
            }
          }
        }
      }
    }
  }
  return matches.flat();
}

function remove(fields, myTicket, pattern) {
  const values = [];
  for (const i in fields) {
    console.log(i)
    if (fields[i].startsWith(pattern)) {
      values.push(myTicket[i]);
    }
  }
  return values;
}

const { checker, matcher } = generateRuleset(rules);
tickets.push(myTicket);
const passed = transpose(tickets.filter(checker));

const matches = passed.map(matcher);

const trueFields = reducer(matches)

const needed = remove(trueFields, myTicket, 'departure')


console.log(needed.reduce((a, b) => a*b))
