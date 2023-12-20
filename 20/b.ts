const input: string[] = (await Bun.file("input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

// Example
// broadcaster -> a, b, c
// %a -> b
// %b -> c
// %c -> inv
// &inv -> a

type InvPipe = {
  type: "&";

  // k/v of every pipe that outputs to this pipe
  memory: Record<string, "low" | "high">;
};
type FlipFlopPipe = {
  type: "%";
  on: boolean;
};

type Pipe = {
  key: string;
  destinations: string[];
} & (InvPipe | FlipFlopPipe);

type Signal = { key: string; type: "low" | "high"; from: string };

let startingDestinations: Signal[] = [];

let pipes: Pipe[] = [];

input.forEach((line) => {
  const [key, destinations] = line.split(" -> ");
  if (key === "broadcaster") {
    startingDestinations = destinations
      .split(", ")
      .map((key) => ({ key, type: "low", from: "broadcaster" }));
    return;
  }
  if (key.startsWith("&")) {
    pipes.push({
      key: key.slice(1),
      destinations: destinations.split(", "),
      type: "&",
      memory: {},
    });
    return;
  }
  if (key.startsWith("%")) {
    pipes.push({
      key: key.slice(1),
      destinations: destinations.split(", "),
      type: "%",
      on: false,
    });
    return;
  }
});

// map all inv pipes sources into memory
pipes.forEach((pipe) => {
  pipe.destinations.forEach((dest) => {
    const destPipe = pipes.find((p) => p.key === dest);
    if (destPipe?.type === "&") {
      destPipe.memory[pipe.key] = "low";
    }
  });
});

// There is ONE pipe that goes to rx (the one we care about)
// It happens to be an inv pipe
// So we log all the things that go to it
const rxIngest = pipes.find((p) => p.destinations.includes("rx"))!;
if (!rxIngest) throw new Error("No rx ingest pipe");
const keyPlayers = pipes
  .filter((p) => p.destinations.includes(rxIngest.key))
  .map((p) => p.key);

const keyPlayersFound = [-1, -1, -1, -1];

function runBoard(x: number) {
  let heap = [...startingDestinations];

  // console.log("current heap", heap);

  let lowSignals = 1;
  let highSignals = 0;

  while (heap.length) {
    const signal = heap.shift()!;

    if (signal.key === rxIngest.key && signal.type === "high") {
      console.log("FOUND ONE", signal.from, x);
      const idx = keyPlayers.indexOf(signal.from);
      if (idx === -1) throw new Error("not found");
      keyPlayersFound[idx] = x;
    }

    // console.log(`${signal.from} -${signal.type}-> ${signal.key}`);

    if (signal.type === "low") lowSignals++;
    if (signal.type === "high") highSignals++;

    const pipe = pipes.find((p) => p.key === signal.key);
    // console.log("through pipe", pipe);

    if (!pipe) {
      continue;
    }
    if (pipe.type === "%") {
      if (signal.type === "high") continue;
      pipe.on = !pipe.on;
      pipe.destinations.forEach((dest) => {
        heap.push({
          key: dest,
          type: pipe.on ? "high" : "low",
          from: signal.key,
        });
      });
    } else if (pipe.type === "&") {
      if (!signal.from) throw new Error("No signal from");
      pipe.memory[signal.from] = signal.type;

      const allAreHigh = Object.values(pipe.memory).every((v) => v === "high");

      pipe.destinations.forEach((dest) => {
        heap.push({
          key: dest,
          type: allAreHigh ? "low" : "high",
          from: signal.key,
        });
      });
    }

    // console.log("updated heap", heap);
  }

  return { lowSignals, highSignals };
}

let sumLow = 0;
let sumHigh = 0;

let x = 0;
while (keyPlayersFound.some((v) => v === -1)) {
  x++;
  let newAnswers = runBoard(x);

  const stRx = pipes.find((p) => p.destinations.includes("rx"));
  if (!stRx || stRx.type !== "&") throw new Error("rx is not an inv pipe");

  sumLow += newAnswers.lowSignals;
  sumHigh += newAnswers.highSignals;
}

// calculate LCM
function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

console.log("kp", keyPlayersFound);

const lcmOfKeyPlayers = keyPlayersFound.reduce((acc, v) => lcm(acc, v), 1);

console.log("lcm", lcmOfKeyPlayers);
