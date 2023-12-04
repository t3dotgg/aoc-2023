// const input = Deno.readTextFileSync("example.txt").split("\n");
const input = Deno.readTextFileSync("input.txt").split("\n");

// fill with 1's for length of input
const cardCounts = new Array(input.length).fill(1);

input.map((line, currentCard) => {
  const [_, sides] = line.split(": ");
  const [winningNumbers, myNumbers] = sides.split(" | ");

  const winningNumbersArray = winningNumbers
    .trim()
    .replaceAll("  ", " ")
    .split(" ")
    .map((num) => parseInt(num));
  const myNumbersArray = myNumbers
    .trim()
    .replaceAll(" ", " ")
    .split(" ")
    .map((num) => parseInt(num));

  // first match is 1 point, every additional match doubles points
  const points = winningNumbersArray.reduce((acc, num) => {
    if (myNumbersArray.includes(num)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const myCount = cardCounts[currentCard] || 1;

  for (let i = 1; i < points + 1; i++) {
    cardCounts[currentCard + i] = cardCounts[currentCard + i] || 1;
    cardCounts[currentCard + i] += myCount;
  }

  return points;
});

const totalPoints = cardCounts.reduce((acc, num) => acc + num, 0);

console.log("totalPoints?", totalPoints);
