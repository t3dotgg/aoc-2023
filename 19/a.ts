const input: string[] = (await Bun.file("input.txt").text()).split("\n\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n\n");

const [rulesIn, messagesIn] = input;

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
console.log("rules?", rules);

// console.log("input?", messagesIn);

const inParsed: Record<string, number>[] = messagesIn
  .split("\n")
  .map((message) => {
    // current format:
    // {x=4,m=211,a=430,s=167}
    // Desired as JSON object
    const json = message
      .replace(/{/g, '{"')
      .replace(/}/g, "}")
      .replace(/=/g, '":')
      .replace(/,/g, ',"');
    return JSON.parse(json);
  });

console.log("inParsed?", inParsed);

const validMessages = inParsed.filter((message) => {
  console.log("message", message);
  let currentRule = "in";
  while (currentRule !== "R" && currentRule !== "A") {
    const cr = rules[currentRule];

    console.log("cr", currentRule, cr);
    const rule = cr.find((rule) => {
      if ("min" in rule) {
        const value = message[rule.variable];
        return rule.min < value && rule.max > value;
      } else {
        return true;
      }
    });

    if (!rule) throw new Error("no rule found");

    currentRule = rule.destination;
  }

  if (currentRule === "A") {
    return true;
  }
});

console.log("valid?", validMessages);

// sum all values from a message
function sumMessage(message: Record<string, number>) {
  return Object.values(message).reduce((acc, value) => {
    return acc + value;
  }, 0);
}

// add all values for all valid messages
const sum = validMessages.reduce((acc, message) => {
  return acc + sumMessage(message);
}, 0);

console.log("sum", sum);
