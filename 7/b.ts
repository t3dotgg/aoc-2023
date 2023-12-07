// const input = Deno.readTextFileSync("example.txt").split("\n");
const input = Deno.readTextFileSync("input.txt").split("\n");

const pairs = input.map((line) => line.split(" "));

const priority = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
].reverse();

const createPermutations = (arr: string[]): string[][] => {
  const jIndex = arr.findIndex((a) => a === "J");

  const permutations = [];

  for (let i = 1; i < 13; i++) {
    const copy = [...arr];
    copy[jIndex] = priority[i];
    permutations.push(copy);

    if (copy.includes("J")) {
      const newPermutations = createPermutations(copy);
      newPermutations.forEach((p) => permutations.push(p));
    }
  }

  return permutations;
};

const checkForType = (hand: string[]) => {
  let highest = -1;

  const permutations = createPermutations(hand);
  permutations.forEach((p) => {
    const it = checkForTypeInternal(p);
    if (it > highest) {
      highest = it;
    }
  });
  return highest;
};
const checkForTypeInternal = (hand: string[]) => {
  const counts = hand.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const countValues = Object.values(counts);

  const sorted = countValues.sort((a, b) => b - a);

  if (sorted[0] === 5) {
    return 5;
  }

  if (sorted[0] === 4) {
    return 4;
  }

  if (sorted[0] === 3 && sorted[1] === 2) {
    return 3;
  }

  if (sorted[0] === 3) {
    return 2;
  }

  if (sorted[0] === 2 && sorted[1] === 2) {
    return 1;
  }

  if (sorted[0] === 2) {
    return 0;
  }

  return -1;
};

const compareHands = (hand1: string, hand2: string) => {
  const h1 = hand1.split("");
  const h2 = hand2.split("");

  const h1Type = checkForType(h1);
  const h2Type = checkForType(h2);

  if (h1Type > h2Type) {
    return 1;
  }

  if (h1Type < h2Type) {
    return -1;
  }

  let location = 0;
  let h1Index = priority.findIndex((p) => p === h1[location]);
  let h2Index = priority.findIndex((p) => p === h2[location]);

  while (h1Index === h2Index) {
    location += 1;
    h1Index = priority.findIndex((p) => p === h1[location]);
    h2Index = priority.findIndex((p) => p === h2[location]);
  }

  if (h1Index > h2Index) {
    return 1;
  } else if (h1Index < h2Index) {
    return -1;
  }
  throw new Error("this should have returned");
};

const sortedHands = pairs.sort((a, b) => {
  const h1 = a[0];
  const h2 = b[0];

  return compareHands(h1, h2);
});

const parsed = sortedHands.map((r, i) => {
  const num = Number(r[1]);
  return num * (i + 1);
});

const sum = parsed.reduce((acc, curr) => acc + curr, 0);

console.log("input?", sum);
