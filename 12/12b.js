const fs = require('fs');

const actions = fs.readFileSync('input', 'utf-8').trim().split('\n');

// each step, 90deg anti-clockwise
const translations = [
  [[0, -1], [1, 0]],
  [[-1, 0], [0, -1]],
  [[0, 1], [-1, 0]],
];

function decode(instruction) {
  const direction = instruction[0];
  const value = parseInt(instruction.slice(1), 10);
  return { direction, value };
}

function translateRotation(waypoint, command) {
  const { direction, value } = command;
  let steps = 0;
  switch (value) {
    case 90:
      steps = 0;
      break;
    case 180:
      steps = 1;
      break;
    case 270:
      steps = 2;
      break;
    default:
  }
  if (direction === 'R') {
    steps = 2 - steps;
  }
  const [[a, b], [c, d]] = translations[steps];
  const newX = (a * waypoint.x) + (b * waypoint.y);
  const newY = (c * waypoint.x) + (d * waypoint.y);
  return { x: newX, y: newY };
}

function updatePosition(cmd, waypoint, shipPosition) {
  const { value } = cmd;
  const newWaypoint = { ...waypoint };
  const newShipPosition = { ...shipPosition };
  switch (cmd.direction) {
    case 'N':
      newWaypoint.y = waypoint.y + value;
      break;
    case 'S':
      newWaypoint.y = waypoint.y - value;
      break;
    case 'E':
      newWaypoint.x = waypoint.x + value;
      break;
    case 'W':
      newWaypoint.x = waypoint.x - value;
      break;
    case 'R':
    case 'L':
      ({ x: newWaypoint.x, y: newWaypoint.y } = translateRotation(waypoint, cmd));
      break;
    case 'F':
      newShipPosition.x = shipPosition.x + (waypoint.x * value);
      newShipPosition.y = shipPosition.y + (waypoint.y * value);
      break;
    default:
  }
  return { newWaypoint, newShipPosition };
}

let waypoint = {
  x: 10,
  y: 1,
};

let ship = {
  x: 0,
  y: 0,
};

for (const action of actions) {
  const cmd = decode(action);
  ({ newWaypoint: waypoint, newShipPosition: ship } = updatePosition(cmd, waypoint, ship));
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));
