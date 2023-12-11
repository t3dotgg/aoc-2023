const data = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((x) => x.split(""));

let startPosition: [number, number] = [0, 0];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "S") {
      startPosition = [i, j];
      data[i][j] = "7";
    }
  }
}

let count = 0;
let i = startPosition[0];
let j = startPosition[1];
let visited = new Set<string>(`${i},${j}`);
let loop = Array.from(new Array(data.length * 2), () =>
  new Array(data[0].length * 2).fill(false)
);

while (true) {
  loop[i * 2][j * 2] = true;
  const c = data[i][j];
  const up = c == "|" || c == "L" || c == "J";
  const down = c == "|" || c == "7" || c == "F";
  const left = c == "-" || c == "7" || c == "J";
  const right = c == "-" || c == "L" || c == "F";

  if (up && !visited.has(`${i - 1},${j}`)) {
    loop[i * 2 - 1][j * 2] = true;
    i--;
    visited = visited.add(`${i},${j}`);
    count++;
    continue;
  }

  if (down && !visited.has(`${i + 1},${j}`)) {
    loop[i * 2 + 1][j * 2] = true;
    i++;
    visited = visited.add(`${i},${j}`);
    count++;
    continue;
  }

  if (left && !visited.has(`${i},${j - 1}`)) {
    loop[i * 2][j * 2 - 1] = true;
    j--;
    visited = visited.add(`${i},${j}`);
    count++;
    continue;
  }

  if (right && !visited.has(`${i},${j + 1}`)) {
    loop[i * 2][j * 2 + 1] = true;
    j++;
    visited = visited.add(`${i},${j}`);
    count++;
    continue;
  }

  break;
}

for (const line of loop) {
  console.log(line.map((x) => (x ? "X" : " ")).join(""));
}

const queue = [[0, 0]];

function neighbors([i, j]: [number, number]) {
  const result = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];

  return result;
}

while (queue.length > 0) {
  const [i, j] = queue.shift()!;
  for (const pt of neighbors([i, j])) {
    const [ii, jj] = pt;
    if (
      ii >= 0 &&
      jj >= 0 &&
      ii < loop.length &&
      jj < loop[0].length &&
      !loop[ii][jj]
    ) {
      loop[ii][jj] = true;
      queue.push([ii, jj]);
    }
  }
}

console.log("\n".repeat(20));

for (const line of loop) {
  console.log(line.map((x) => (x ? "X" : " ")).join(""));
}

let ans = 0;

for (let i = 0; i < loop.length; i++) {
  for (let j = 0; j < loop[i].length; j++) {
    if (!loop[i][j] && i % 2 == 0 && j % 2 == 0) {
      ans++;
    }
  }
}

console.log("ANSWER", ans);
