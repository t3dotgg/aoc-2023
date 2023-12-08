const input = Deno.readTextFileSync("input.txt");

const [ins, rest] = input.split("\n\n");

const pairings = rest.split("\n");

const mappings: Record<string, { L: string; R: string }> = {};

let starting: string[] = [];

pairings.forEach((p) => {
  const [k, v] = p.split(" = (");

  if (k[2] === "A") starting.push(k);

  console.log(v);
  const [L, R] = v.replace(")", "").split(", ");

  mappings[k] = { L, R };
});

const allZs = () => {
  return starting.every((c) => c[2] === "Z");
};

console.log(mappings);

// let i = 0;
// while (!allZs()) {
//   current = current.map((c) => mappings[c]![ins[i % ins.length]]);
//   i++;
// }

const earliest = starting.map((c) => {
  let current = c;

  let i = 0;
  while (current[2] !== "Z") {
    console.log(current, mappings[current]);
    current = mappings[current][ins[i % ins.length]];
    i++;
  }

  return i;
});

// I ran this output through an LCM calculator online lol
console.log("input?", earliest);
