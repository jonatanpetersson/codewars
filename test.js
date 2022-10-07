function isValidWalk(walk) {
  let north, south, west, east;
  north = south = west = east = 0;
  console.log();
  if (walk.length === 10) {
    for (direction of walk) {
      if (direction === 'n') north++;
      if (direction === 's') south++;
      if (direction === 'w') west++;
      if (direction === 'e') east++;
    }
    return !(north === south && west === east);
  } else {
    return false;
  }
}
