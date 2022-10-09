// Codewars solutions

// The Hunger Games - Zoo Disaster! - 5kyu
var whoEatsWho = function (zoo) {
  zoo = zoo.split(",");
  const originalZoo = [...zoo];

  const foodChain = {
    antelope: { grass: "grass" },
    bear: {
      "big-fish": "big-fish",
      bug: "bug",
      chicken: "chicken",
      cow: "cow",
      leaves: "leaves",
      sheep: "sheep",
    },
    "big-fish": { "little-fish": "little-fish" },
    bug: { leaves: "leaves" },
    chicken: { bug: "bug" },
    cow: { grass: "grass" },
    fox: { chicken: "chicken", sheep: "sheep" },
    giraffe: { leaves: "leaves" },
    lion: { antelope: "antelope", cow: "cow" },
    panda: { leaves: "leaves" },
    sheep: { grass: "grass" },
  };

  const meals = [];

  const eating = (animal, neighbourAnimal, toTheLeft, index) => {
    meals.push(animal + " eats " + neighbourAnimal);
    zoo.splice(toTheLeft ? index - 1 : index + 1, 1);
    eatingCircle();
  };

  const eatingCircle = () => {
    for (let i = 0; i < zoo.length; i++) {
      const animal = zoo[i];
      const leftAnimal = zoo[i - 1];
      const rightAnimal = zoo[i + 1];

      // Optional chaining is no supported in codewars it seems.
      if (foodChain[animal] && foodChain[animal][leftAnimal]) {
        eating(animal, leftAnimal, true, i);
        break;
      }

      if (foodChain[animal] && foodChain[animal][rightAnimal]) {
        eating(animal, rightAnimal, false, i);
        break;
      }
    }
  };
  eatingCircle();
  return [originalZoo.join(","), ...meals, zoo.join(",")];
};

const res = whoEatsWho("fox,bug,chicken,grass,sheep");
console.log(res);

// The builder of things - 3kyu
class Thing {
  constructor(name) {
    this.name = name;

    this.is_a_person;
    this.is_a_man;
    this.is_a_woman;

    this.parent_of;

    this.legs;

    this.head;

    this.is_a = new Proxy(this, {
      get: (target, prop) => {
        Reflect.set(target, `is_a_${prop}`, true);
      },
    });

    this.is_not_a = new Proxy(this, {
      get: (target, prop) => {
        Reflect.set(target, `is_a_${prop}`, false);
        Reflect.set(target, `is_not_a_${prop}`, true);
      },
    });

    this.is_the = new Proxy(this, {
      get: (_, prop) => {
        return new Proxy(this, {
          get: (_, nextProp) => {
            Reflect.set(this, prop, nextProp);
          },
        });
      },
    });
  }
}

// old
// class Thing {
//   constructor(name) {
//     this.name = name;

//     this.is_a = new Proxy(this, {
//       get: (target, prop) => {
//         Reflect.set(target, `is_a_${prop}`, true);
//       },
//     });

//     this.is_not_a = new Proxy(this, {
//       get: (target, prop) => {
//         Reflect.set(target, `is_a_${prop}`, false);
//         Reflect.set(target, `is_not_a_${prop}`, true);
//       },
//     });

//     this.is_the = new Proxy(this, {
//       get: (_, prop) => {
//         return new Proxy(this, {
//           get: (_, nextProp) => {
//             Reflect.set(this, prop, nextProp);
//           },
//         });
//       },
//     });
//   }
// }

// Sudoku Solution Validator - 4kyu
function validSolution(board) {
  const getBaseArray = () => [[], [], [], [], [], [], [], [], []];
  const addToSquaresPerRow = (x, y, rowSquares) => {
    if (x >= 0 && x < 3) squares[rowSquares[0]].push(board[y][x]);
    if (x >= 3 && x < 6) squares[rowSquares[1]].push(board[y][x]);
    if (x >= 6 && x < 9) squares[rowSquares[2]].push(board[y][x]);
  };

  const squares = getBaseArray();
  const columns = getBaseArray();
  const rows = getBaseArray();

  for (let y = 0; y < 9; y++) {
    rows[y] = board[y];

    for (let x = 0; x < 9; x++) {
      columns[x].push(board[y][x]);

      if (y >= 0 && y < 3) addToSquaresPerRow(x, y, [0, 1, 2]);
      if (y >= 3 && y < 6) addToSquaresPerRow(x, y, [3, 4, 5]);
      if (y >= 6 && y < 9) addToSquaresPerRow(x, y, [6, 7, 8]);
    }
  }

  const collectionOfNumbers = [...squares, ...rows, ...columns].map((n) =>
    n.sort((x, y) => x - y).join("")
  );

  return collectionOfNumbers.every((n) => n === "123456789");
}

// First non-repeating character - 5kyu
function firstNonRepeatingLetter(s) {
  const arr = s.toLowerCase().split("");
  for (let i = 0; i < s.length; i++) {
    if (arr.filter((a) => a === arr[i]).length === 1) {
      return s[i];
    }
  }
  return "";
}

// Delete occurrences of an element if it occurs more than n times - 6kyu
function deleteNth(arr, n) {
  return arr.reduce(
    (acc, curr) =>
      [...acc, curr].filter((val) => val === curr).length > n
        ? acc
        : [...acc, curr],
    []
  );
}

// Shortened
// const deleteNth = (arr, n) =>
//   arr.reduce(
//     (a, b) => ([...a, b].filter((c) => c === b).length > n ? a : [...a, b]),
//     []
//   );

// Sort the odd - 6kyu
function sortArray(array) {
  const isOdd = (val) => val % 2 !== 0;
  const odd = array.filter(isOdd).sort((x, y) => x - y);
  return array.map((val) => (isOdd(val) ? odd.shift() : val));
}

// Nesting Structure Comparison - 4kyu
Array.prototype.sameStructureAs = function (other) {
  const serializeStructure = (array, positionX, positionY, string) => {
    string += `x:${positionX}y:${positionY}, `;

    array.forEach((element, nextPositionX) => {
      string += Array.isArray(element)
        ? serializeStructure(element, nextPositionX, positionY + 1, string)
        : "false, ";
    });

    return string;
  };

  const thisArrayStructure = Array.isArray(this)
    ? serializeStructure(this, 0, 0, "")
    : false;
  const otherArrayStructure = Array.isArray(other)
    ? serializeStructure(other, 0, 0, "")
    : false;

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
