const input = Deno.readTextFileSync("input.txt").split("\n\n");
// const input = Deno.readTextFileSync("example.txt").split("\n\n");

const [seedsIn, ...rest] = input;
const [_, seedsStr] = seedsIn.split(": ");
const seeds = seedsStr.split(" ").map(Number);

const seedPairs = seeds.reduce((acc, seed, i) => {
  if (i % 2 === 0) {
    acc.push([seed]);
  } else {
    acc[acc.length - 1].push(seed);
  }

  return acc;
}, [] as number[][]);
console.log("seedPairs", seedPairs);

console.log("seeds");

const transforms = rest.map((group) => {
  const [_, ...lines] = group.split("\n");

  const rgs: [number, number, number][] = lines.map(
    (l) => l.split(" ").map(Number) as [number, number, number]
  );

  return rgs;
});

let final = seedPairs.map((seed) => {
  console.log("on seed pair", seed);
  let currentLowest = 9999999999999;
  let checkingSeed = seed[0];
  while (checkingSeed < seed[0] + seed[1] + 1) {
    let current = checkingSeed;
    transforms.forEach((rangeGroup) => {
      const matchingRange = rangeGroup.find(
        ([mapping, start, delta]) => current >= start && current < start + delta
      );

      if (matchingRange) {
        // console.log("MATCHED", current, matchingRange);
        const [mapping, start, delta] = matchingRange;
        current = mapping + (current - start);

        // console.log("NEW VALUE", current);
      }
    });
    if (current < currentLowest) {
      currentLowest = current;
    }
    checkingSeed++;
  }

  // console.log("Final value", current, "\n");

  console.log("clow", currentLowest);
  return currentLowest;
});

// lowest
console.log("lowest", Math.min(...final));
