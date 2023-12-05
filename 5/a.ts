const input = Deno.readTextFileSync("input.txt").split("\n\n");
// const input = Deno.readTextFileSync("example.txt").split("\n\n");

const [seedsIn, ...rest] = input;
const [_, seedsStr] = seedsIn.split(": ");
const seeds = seedsStr.split(" ").map(Number);

console.log("seeds");

const transforms = rest.map((group) => {
  const [_, ...lines] = group.split("\n");

  const rgs: [number, number, number][] = lines.map(
    (l) => l.split(" ").map(Number) as [number, number, number]
  );
  console.log("lines", rgs);

  return rgs;
});

let final = seeds.map((seed) => {
  console.log("Seed", seed);
  let current = seed;
  transforms.forEach((rangeGroup) => {
    const matchingRange = rangeGroup.find(
      ([mapping, start, delta]) => current >= start && current <= start + delta
    );

    if (matchingRange) {
      console.log("MATCHED", current, matchingRange);
      const [mapping, start, delta] = matchingRange;
      current = mapping + (current - start);

      console.log("NEW VALUE", current);
    }
  });

  console.log("Final value", current, "\n");

  return current;
});

// lowest
console.log("lowest", Math.min(...final));
