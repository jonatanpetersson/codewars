// Just a place for me to write codewars solutions and log them

// Greed is Good
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
