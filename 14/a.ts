const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

type Grid = string[][];
const grid: Grid = input.map((line) => line.split(""));

function doMove(grid: Grid) {
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

let updatedGrid = doMove(grid);
while (!compareGrids(updatedGrid, doMove(updatedGrid))) {
  updatedGrid = doMove(updatedGrid);
}

function printGrid(grid: Grid) {
  grid.forEach((row) => console.log(row.join("")));
}

function calculageLoad(grid: Grid) {
  let load = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "O") {
        load = load + (grid.length - row);
      }
    }
  }
  return load;
}

printGrid(updatedGrid);

console.log("Answer", calculageLoad(updatedGrid));
