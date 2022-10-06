// Codewars solutions

// Battleship field validator - 3kyu
function validateBattlefield(field) {
  const ShipSizeAmountDict = {
    4: 1,
    3: 2,
    2: 3,
    1: 4,
  }
  
  const evaluateShip = (y, x, shipSize) => {
    shipSize++;
    const top = { y: y === 0 ? 0 : y - 1, x };
    const right = { x: x === 9 ? 9 : x + 1, y };
    const bottom = { y: y === 9 ? 9 : y + 1, x };
    const left = { x: x === 0 ? 0 : x - 1, y };

    [top, left, bottom, right].forEach((n) => {
      if (field[n.y][n.x]) {
        field[n.y][n.x] = 0;
        shipSize = evaluateShip(n.y, n.x, shipSize);
      }
    })
    return shipSize;
  }
  
  field.forEach((row, y) => { 
    row.forEach((col, x) => {
      if (field[y][x]) {
        field[y][x] = 0;
        let shipSize = 0;
        shipSize = evaluateShip(y, x, shipSize);
        if (ShipSizeAmountDict[shipSize]) {
          ShipSizeAmountDict[shipSize]--;
        }
      }
    })
  });

  return Object.values(ShipSizeAmountDict).every((shipAmount) => shipAmount === 0);
}

// Nesting Structure Comparison - 4kyu
Array.prototype.sameStructureAs = function (other) {
  
  const serializeStructure = (array, positionX, positionY, string) => {
    string += `x:${positionX}y:${positionY}, `;

    array.forEach((element, nextPositionX) => {
      string += Array.isArray(element) 
      ? serializeStructure(element, nextPositionX, positionY + 1, string)
      : 'false, ';
    });

    return string;
  }

  const thisArrayStructure = Array.isArray(this) ? serializeStructure(this, 0, 0, '') : false;
  const otherArrayStructure = Array.isArray(other) ? serializeStructure(other, 0, 0, '') : false;

  return thisArrayStructure === otherArrayStructure;
};


// Greed is Good - kyu
function score(values) {
  const calculateOnesAndFives = (value, factor) =>
    factor * (value === 1 ? 100 : value === 5 ? 50 : 0);
  const calculateForAmountOfThree = (value) =>
    value === 1 ? 1000 : value * 100;
  const uniqueValuesWithAmounts = [...new Set(values)].map((uv) => ({
    value: uv,
    amount: values.filter((v) => uv === v).length,
  }));

  let score = 0;
  uniqueValuesWithAmounts.forEach(({ value, amount }) => {
    if (amount < 3) score += calculateOnesAndFives(value, amount);
    if (amount === 3) score += calculateForAmountOfThree(value);
    if (amount > 3) {
      const remainder = amount - 3;
      score += calculateForAmountOfThree(value);
      score += calculateOnesAndFives(value, remainder);
    }
  });
  return score;
}
