const input: string[] = (await Bun.file("input.txt").text()).split("\n\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n\n");

const [rulesIn, messagesIn] = input;

interface Constraint {
  lower?: string;
  upper?: string;
}

type Constraints = Constraint[];

type Rule =
  | { min: number; max: number; variable: string; destination: string }
  | { destination: string };
const rules: Record<string, Rule[]> = {};

rulesIn.split("\n").forEach((rule) => {
  const [id, ruleString] = rule.split("{");
  const steps = ruleString.replace("}", "").split(",");
  // format example: rr{s>898:A,s>537:A,a<2567:R,A}
  const ruleSet: Rule[] = steps.map((step) => {
    if (step.includes(":")) {
      const [ins, destination] = step.split(":");

      if (ins.includes("<")) {
        const [variable, max] = ins.split("<");
        return {
          min: -Infinity,
          max: parseInt(max),
          variable,
          destination,
        };
      } else if (ins.includes(">")) {
        const [variable, min] = ins.split(">");
        return {
          min: parseInt(min),
          max: Infinity,
          variable,
          destination,
        };
      } else {
        throw new Error("should not happen");
      }
    } else {
      return { destination: step };
    }
  });

  rules[id] = ruleSet;
});

function checkPathWithRange(ins: string, ranges: number[][]): number {
  if (ins === "R") return 0;
  if (ins === "A") return ranges.reduce((acc, curr) => acc * curr.length, 1);

  const entry = rules[ins];
  const pathVals = entry.map((rule) => {
    if (!("min" in rule)) return checkPathWithRange(rule.destination, ranges);

    const newRanges = ranges.map((arr) => [...arr]);
    const index = "xmas".indexOf(rule.variable);

    const check = (x: number) => rule.max > x && x > rule.min;

    newRanges[index] = newRanges[index].filter(check);
    ranges[index] = ranges[index].filter((x) => !check(x));

    return checkPathWithRange(rule.destination, newRanges);
  });

  return pathVals.reduce((acc, curr) => acc + curr, 0);
}

const answer = checkPathWithRange(
  "in",
  Array(4)
    .fill(null)
    .map(() => Array.from({ length: 4000 }, (_, i) => i + 1))
);

console.log("answer", answer);
