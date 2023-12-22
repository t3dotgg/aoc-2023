const input: string[] = (await Bun.file("input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

const map = input.map((line) => line.split(""));
type Position = { x: number; y: number };
// start = character S
const startY = map.findIndex((line) => line.includes("S"));
const startX = map[startY].findIndex((char) => char === "S");

let validPositions = new Set([`${startX},${startY}`]);

map[startY][startX] = ".";

let steps = 0;

while (steps < 64) {
  const newPositions = new Set<string>();
  validPositions.forEach((position) => {
    console.log("CHECKING POS", position);
    const { x, y }: { x: number; y: number } = JSON.parse(position);
    const up = { x, y: y - 1 };
    const down = { x, y: y + 1 };
    const left = { x: x - 1, y };
    const right = { x: x + 1, y };
    const positions = [up, down, left, right];
    positions.forEach((position) => {
      const { x, y } = position;
      const char = map[y]?.[x];
      if (char === ".") {
        newPositions.add(JSON.stringify(position));
      }
    });
  });
  validPositions = newPositions;
  steps++;

  // Log grid with O for all valid positions
  const grid = map.map((line) => line.map((char) => char));
  validPositions.forEach((position) => {
    const [x, y] = position.split(",").map(Number);
    grid[y][x] = "O";
  });
  console.log(grid.map((line) => line.join("")).join("\n"));
}

console.log("input?", validPositions.size);
