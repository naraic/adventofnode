const fs = require('fs');

const [rules, myTicket, tickets] = fs.readFileSync('input', 'utf-8')
  .trim().split('\n\n')
  .map((part) => part.split('\n'));

function generateRuleset(descriptions) {
  const ruleset = [];
  for (const desc of descriptions) {
    const [name, high, _, low] = desc.split(' ');
    const lows = low.split('-').map((x) => parseInt(x, 10));
    const highs = high.split('-').map((x) => parseInt(x, 10));
    ruleset.push({ highs, lows });
  }

  function applyRule(field) {
    return (rule) => {
      const { highs: [x1, x2], lows: [y1, y2] } = rule;
      return (
        field >= x1 && field <= x2)
        || (field >= y1 && field <= y2);
    };
  }

  function checker(ticket) {
    const fields = ticket.split(',').map((x) => parseInt(x, 10));
    const failed = fields.filter((field) => !ruleset.some(applyRule(field)));
    return (failed.length !== 0) ? failed[0] : 0;
  }
  return checker;
}

const checker = generateRuleset(rules);
console.log(tickets.slice(1).map(checker).reduce((a, b) => a + b));
