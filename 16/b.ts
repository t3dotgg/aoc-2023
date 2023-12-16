// const input = Deno.readTextFileSync("input.txt").split("\n");
const input: string[] = (await Bun.file("input.txt").text()).split("\n");
const grid = input.map((line) => line.split(""));

// velocities: 0 = right, 1 = down, 2 = left, 3 = up
const velocities: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function reflect(char: string, dir: number): number[] {
  if (char === ".") return [dir];
  if (char === "-") {
    if (dir === 2 || dir === 0) return [dir];
    return [2, 0];
  }
  if (char === "|") {
    if (dir === 3 || dir === 1) return [dir];
    return [3, 1];
  }
  if (char === "/") {
    if (dir === 3) return [0];
    if (dir === 0) return [3];
    if (dir === 1) return [2];
    if (dir === 2) return [1];
  }
  if (char === "\\") {
    if (dir === 3) return [2];
    if (dir === 2) return [3];
    if (dir === 1) return [0];
    if (dir === 0) return [1];
  }

  throw new Error("not a valid direction");
}

function countUniquePoints(s: Set<string>) {
  const trimmed = [...s].map((s) => {
    const [x, y] = s.split(",");
    return `${x},${y}`;
  });
  return new Set(trimmed).size;
}

function runGrid(start: [number, number, number]): number {
  const path = new Set<string>();

  // Let's get recursive
  function move(x: number, y: number, dr: number) {
    const key = `${x},${y},${dr}`;
    if (path.has(key)) {
      return;
    }
    path.add(key);
    const char = grid[x][y];
    const dirs = reflect(char, dr);
    dirs.forEach((next) => {
      const [dx, dy] = velocities[next];
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
        move(nx, ny, next);
      }
    });
  }

  move(start[0], start[1], start[2]);
  return countUniquePoints(path);
}

const startingPoints: [number, number, number][] = [];
for (let x = 0; x < grid.length; x++) {
  startingPoints.push([x, 0, 0]);
  startingPoints.push([x, grid[0].length - 1, 2]);
}
for (let y = 0; y < grid[0].length; y++) {
  startingPoints.push([0, y, 1]);
  startingPoints.push([grid.length - 1, y, 3]);
}

const scores = startingPoints.map((test) => runGrid(test));

console.log("answer", Math.max(...scores));
