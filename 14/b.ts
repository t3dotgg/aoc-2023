const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

type Grid = string[][];
let grid: Grid = input.map((line) => line.split(""));

function doMoveInternal(grid: Grid) {
  // Check for all "O" chars, if "." is above, move up
  // Otherwise, do nothing
  const updatedGrid = grid.map((row) => row.map((char) => char));
  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "O") {
        if (grid[row - 1][col] === ".") {
          updatedGrid[row - 1][col] = "O";
          updatedGrid[row][col] = ".";
        }
      }
    }
  }

  return updatedGrid;
}

function compareGrids(grid1: Grid, grid2: Grid) {
  return JSON.stringify(grid1) === JSON.stringify(grid2);
}

function slide(grid: Grid) {
  let updatedGrid = doMoveInternal(grid);
  while (!compareGrids(updatedGrid, doMoveInternal(updatedGrid))) {
    updatedGrid = doMoveInternal(updatedGrid);
  }

  return updatedGrid;
}

function getScore(grid: Grid) {
  const n = grid.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += (n - i) * grid[i].filter((cell) => cell === "O").length;
  }
  return ans;
}

function rotate(grid: Grid) {
  const height = grid.length;
  const width = grid[0].length;
  const newGrid: Grid = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => ".")
  );
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      newGrid[column][height - row - 1] = grid[row][column];
    }
  }
  return newGrid;
}

function toStr(grid: Grid) {
  return JSON.stringify(grid);
}

const seenGrids: { [key: string]: [number, number] } = {};
const goal = 1000000000;
let runs = 1;

while (true) {
  for (let j = 0; j < 4; j++) {
    grid = slide(grid);
    grid = rotate(grid);
  }
  const flattenedGrid = toStr(grid);
  if (seenGrids[flattenedGrid]) {
    const cycleLen = runs - seenGrids[flattenedGrid][0];
    for (const [index, score] of Object.values(seenGrids)) {
      if (
        index >= seenGrids[flattenedGrid][0] &&
        index % cycleLen === goal % cycleLen
      ) {
        console.log("ANSWER", score);
        break;
      }
    }
    break;
  }
  seenGrids[flattenedGrid] = [runs, getScore(grid)];
  runs++;
}
