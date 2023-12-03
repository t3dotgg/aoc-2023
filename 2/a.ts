const input = Deno.readTextFileSync("input.txt").split("\n");

function defaultCounts() {
  return {
    red: 12,
    green: 13,
    blue: 14,
  };
}

const parsedPairs = input.map((line, i) => {
  const [, row] = line.split(": ");

  let counts = defaultCounts();

  let valid = true;

  const textGroups = row
    .split("; ")
    .map((g) => g.split(", ").map((p) => p.split(" ")));

  textGroups.forEach((round) => {
    round.forEach(([count, color]) => {
      counts[color] = counts[color] - Number(count);
    });
    const isInvalid = Object.values(counts).some((c) => c < 0);
    if (isInvalid) {
      valid = false;
    }
    counts = defaultCounts();
  });

  // check no counts are below 0

  return {
    row: i + 1,
    isInvalid: !valid,
    counts,
  };
});

// sum of valid row numbers
const validRows = parsedPairs.filter((p) => !p.isInvalid);
const validRowNumbers = validRows.map((p) => p.row);
const sum = validRowNumbers.reduce((a, b) => a + b, 0);

console.log(sum);
