const fs = require('fs');

const actions = fs.readFileSync('input', 'utf-8').trim().split('\n');

function decode(instruction) {
  const direction = instruction[0];
  const value = parseInt(instruction.slice(1), 10);
  return { direction, value };
}

function updatePosition(cmd, position) {
  const { value } = cmd;
  const newPosition = { ...position };
  switch (cmd.direction) {
    case 'N':
      newPosition.y = position.y + value;
      break;
    case 'S':
      newPosition.y = position.y - value;
      break;
    case 'E':
      newPosition.x = position.x + value;
      break;
    case 'W':
      newPosition.x = position.x - value;
      break;
    case 'R':
      newPosition.heading = (position.heading + value) % 360;
      break;
    case 'L':
      newPosition.heading = position.heading - value;
      if (newPosition.heading < 0) {
        newPosition.heading = 360 + newPosition.heading;
      }
      break;
    case 'F':
      switch (position.heading) {
        case 0:
          newPosition.y = position.y + value;
          break;
        case 180:
          newPosition.y = position.y - value;
          break;
        case 90:
          newPosition.x = position.x + value;
          break;
        case 270:
          newPosition.x = position.x - value;
          break;
        default:
      }
      break;
    default:
  }
  return newPosition;
}

let position = {
  x: 0,
  y: 0,
  heading: 90,
};

for (const action of actions) {
  const cmd = decode(action);
  position = updatePosition(cmd, position);
}

console.log(Math.abs(position.x) + Math.abs(position.y));