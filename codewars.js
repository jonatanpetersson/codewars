// Codewars solutions

// The Hashtag Generator - 5kyu
function generateHashtag(str) {
  if (!str.trim()) return false;
  const hashedString =
    "#" +
    str
      .split(" ")
      .filter((s) => s)
      .map((s) => s[0].toUpperCase() + s.slice(1, s.length))
      .join("");
  if (hashedString.length > 140) return false;
  return hashedString;
}

// Square Every Digit - 7kyu
const squareDigits = (num) =>
  Number(
    num
      .toString()
      .split("")
      .map((n) => Math.pow(Number(n), 2))
      .join("")
  );

// Total amount of points - 8kyu
function points(games) {
  let res = 0;
  games.forEach((g) => {
    const [x, y] = g.split(":");
    if (x > y) res += 3;
    if (x === y) res += 1;
  });
  return res;
}

// The Greatest Warrior - 4kyu

class Warrior {
  constructor() {
    this._ranks = [
      "Pushover",
      "Novice",
      "Fighter",
      "Warrior",
      "Veteran",
      "Sage",
      "Elite",
      "Conqueror",
      "Champion",
      "Master",
      "Greatest",
    ];
    this._battleResponses = [
      "Invalid level",
      "Easy fight",
      "A good fight",
      "An intense fight",
      "You've been defeated",
    ];
    this._trainingResponses = ["Not strong enough"];
    this._achievements = [];
    this._experience = 100;
    this._level = 1;
    this._rank = this._ranks[0];
  }

  achievements() {
    return this._achievements;
  }

  battle(enemyLevel) {
    if (enemyLevel < 1 || enemyLevel > 100) {
      return this._battleResponses[0];
    }

    const levelDifference = Math.abs(enemyLevel - this._level);
    const enemyHigher = enemyLevel - this._level > 0;
    let response = "";

    if (levelDifference === 0) {
      this._experience += 10;
      response = this._battleResponses[2];
    } else if (!enemyHigher && levelDifference === 1) {
      this._experience += 5;
      response = this._battleResponses[2];
    } else if (!enemyHigher && levelDifference >= 1) {
      response = this._battleResponses[1];
    } else if (enemyHigher) {
      const enemyRank = this._ranks[Math.floor(enemyLevel / 10)];
      if (this._rank !== enemyRank && levelDifference > 4) {
        response = this._battleResponses[4];
      } else {
        this._experience += 20 * levelDifference * levelDifference;
        response = this._battleResponses[3];
      }
    }

    this._calculateAndSetLevelAndRank();
    return response;
  }

  experience() {
    return this._experience;
  }

  level() {
    return this._level;
  }

  rank() {
    return this._rank;
  }

  training([description, experience, minimumLevel]) {
    if (minimumLevel > this._level) {
      return this._trainingResponses[0];
    }
    this._experience += experience;
    this._achievements.push(description);
    this._calculateAndSetLevelAndRank();
    return description;
  }

  _calculateAndSetLevelAndRank() {
    this._level = Math.floor(this._experience / 100);
    if (this._level > 100) {
      this._level = 100;
    }
    if (this._experience > 10000) {
      this._experience = 10000;
    }
    this._rank = this._ranks[Math.floor(this._level / 10)];
  }
}

// How many are smaller than me II? - 3kyu
// WIP

// function smaller(arr) {
//   const regexBeginning = "(?<!\\d)";
//   const regexEnding = "\\d*";

//   for (let i = 0; i < arr.length; i++) {
//     if (i === arr.length) continue;

//     let regexMiddle = `-?[0-${arr[i]}]`;
//     if (arr[i] < 0) regexMiddle = `-[${arr[i]}-9]`;

//     const num = arr[i];
//     const regex = regexBeginning + regexMiddle + regexEnding;

//     let numRegex = new RegExp(regex, "g");

//     let count = 0;
//     const remaining = arr.slice(i + 1);
//     const matches = remaining.join(",").match(numRegex);
//     console.log(matches);
//     matches?.forEach((m) => {
//       if (m < num) count++;
//     });
//     arr[i] = count;
//   }
//   console.log(arr);
//   return arr;
// }

// const res = smaller([1, 1, -1, 0, 0]);

// Working for smaller numbers
// function smaller(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (i === arr.length) return;

//     let count = 0;
//     const remaining = arr.slice(i + 1);
//     remaining.forEach((num) => {
//       if (arr[i] > num) count++;
//     });
//     arr[i] = count;
//   }
//   return arr;
// }

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

// The builder of things - 3kyu
// WIP
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

// Greed is Good - 5kyu
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
