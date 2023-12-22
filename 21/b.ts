const input: string[] = (await Bun.file("input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const map = input.map((line) => line.split(""));
type Position = { x: number; y: number };
// start = character S
const startY = map.findIndex((line) => line.includes("S"));
const startX = map[startY].findIndex((char) => char === "S");

let validPositions = new Set([JSON.stringify({ x: startX, y: startY })]);

const length = map.length;

map[startY][startX] = ".";

let steps = 0;

const acceptedSpots: number[] = [];

const GOAL = 26501365;

while (acceptedSpots.length < 3) {
  const newPositions = new Set<string>();
  validPositions.forEach((position) => {
    // console.log("CHECKING POS", position);
    const { x, y }: { x: number; y: number } = JSON.parse(position);
    const up = { x, y: y - 1 };
    const down = { x, y: y + 1 };
    const left = { x: x - 1, y };
    const right = { x: x + 1, y };
    const positions = [up, down, left, right];
    positions.forEach((position) => {
      const { x, y } = position;
      const char = map[Math.abs(y) % length]?.[Math.abs(x) % length];
      if (char === ".") {
        newPositions.add(JSON.stringify(position));
      }
    });
  });
  validPositions = newPositions;
  steps++;

  if (steps % length === GOAL % length) {
    acceptedSpots.push(validPositions.size);
    console.log("valid size", steps, validPositions.size);
  }

  // Log grid with O for all valid positions
  // const grid = map.map((line) => line.map((char) => char));
  // validPositions.forEach((position) => {
  //   const [x, y] = position.split(",").map(Number);
  //   grid[y][x] = "O";
  // });
  // console.log(grid.map((line) => line.join("")).join("\n"));
}

console.log("input?", validPositions.size);

// Quadratic formula
function quad(a: number, b: number, c: number) {
  const root = Math.sqrt(b * b - 4 * a * c);
  const x1 = (-b + root) / (2 * a);
  const x2 = (-b - root) / (2 * a);
  return [x1, x2];
}

function f(n: number): number {
  const a0 = acceptedSpots[0];
  const a1 = acceptedSpots[1] - a0;
  const a2 = acceptedSpots[2] - a1;
  return a0 + a1 * n + Math.floor((n * (n - 1)) / 2) * (a2 - a1);
}

const answer = f(Math.floor(GOAL / length));
console.log(answer);
