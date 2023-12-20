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

function runBoard() {
  let heap = [...startingDestinations];

  console.log("current heap", heap);

  let lowSignals = 1;
  let highSignals = 0;

  while (heap.length) {
    const signal = heap.shift()!;

    console.log(`${signal.from} -${signal.type}-> ${signal.key}`);

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
while (x < 1000) {
  let newAnswers = runBoard();
  sumLow += newAnswers.lowSignals;
  sumHigh += newAnswers.highSignals;
  x++;
}

console.log("input?", sumLow, sumHigh, sumLow * sumHigh);
// console.log("board", runBoard());
