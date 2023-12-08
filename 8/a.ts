const input = Deno.readTextFileSync("input.txt");

const [ins, rest] = input.split("\n\n");

const pairings = rest.split("\n");

const mappings: Record<string, { L: string; R: string }> = {};

let current = "AAA";

pairings.forEach((p) => {
  const [k, v] = p.split(" = (");

  console.log(v);
  const [L, R] = v.replace(")", "").split(", ");

  mappings[k] = { L, R };
});

console.log(mappings);

let i = 0;
while (current !== "ZZZ") {
  console.log(current, mappings[current]);
  current = mappings[current][ins[i % ins.length]];
  i++;
}

console.log("input?", i);
