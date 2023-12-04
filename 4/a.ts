const input = Deno.readTextFileSync("input.txt").split("\n");

const parsed = input.map((line) => {
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

  console.log("winningNumbersArray?", winningNumbersArray);
  console.log("myNumbersArray?", myNumbersArray);
  // first match is 1 point, every additional match doubles points
  const points = winningNumbersArray.reduce((acc, num) => {
    if (myNumbersArray.includes(num)) {
      if (acc === 0) return 1;
      return acc * 2;
    }
    return acc;
  }, 0);

  console.log("points?", points);
  return points;
});

const totalPoints = parsed.reduce((acc, num) => acc + num, 0);

console.log("totalPoints?", totalPoints);
