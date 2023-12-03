const input = Deno.readTextFileSync("input.txt").split("\n");

function defaultCounts() {
  return {
    red: 0,
    green: 0,
    blue: 0,
  };
}

const parsedPairs = input.map((line, i) => {
  const [, row] = line.split(": ");

  const counts = defaultCounts();

  const textGroups = row
    .split("; ")
    .map((g) => g.split(", ").map((p) => p.split(" ")));

  textGroups.forEach((round) => {
    round.forEach(([count, color]) => {
      if (counts[color] < Number(count)) {
        counts[color] = Number(count);
      }
    });
  });

  // check no counts are below 0

  const product = Object.values(counts).reduce((a, b) => a * b, 1);
  console.log("PRODUCT", product);
  return {
    product,
  };
});

// sum of valid row numbers
const validRowNumbers = parsedPairs.map((p) => p.product);
const sum = validRowNumbers.reduce((a, b) => a + b, 0);

console.log(sum);
