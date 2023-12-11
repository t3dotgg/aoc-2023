const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

const grid = input.map((line) => line.split(""));

// identify all rows and columns with no #
const noHashRows: number[] = [];
for (let i = 0; i < grid.length; i++) {
  if (!grid[i].includes("#")) {
    noHashRows.push(i);
  }
}

const noHashColumns: number[] = [];
for (let i = 0; i < grid[0].length; i++) {
  if (!grid.some((row) => row[i] === "#")) {
    noHashColumns.push(i);
  }
}

console.log("x", noHashRows, "y", noHashColumns);

// double all rows and columns with no #
const newGrid: string[][] = [...grid].map((r) => [...r]);
for (let i = 0; i < grid.length; i++) {
  const newRow = [...grid[i]];

  console.log("rowBefore", newRow);
  // double columns
  for (let j = noHashColumns.length - 1; j >= 0; j--) {
    newRow.splice(noHashColumns[j], 0, ".");
  }
  console.log("rowAfter", newRow);
  newGrid[i] = newRow;
}

const fullGrid: string[][] = [];

newGrid.forEach((row, i) => {
  if (noHashRows.includes(i)) {
    fullGrid.push(row);
  }
  fullGrid.push(row);
});

console.log("input?", fullGrid);

// identify coordinates of all # in fullGrid
const hashes: [number, number][] = [];
for (let i = 0; i < fullGrid.length; i++) {
  for (let j = 0; j < fullGrid[i].length; j++) {
    if (fullGrid[i][j] === "#") {
      hashes.push([i, j]);
    }
  }
}

// print fullGrid
fullGrid.forEach((row) => {
  console.log(row.join(""));
});

console.log("hashes", hashes);

// calculate distance between two points WITHOUT diagonal movement
function distance(a: [number, number], b: [number, number]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const distances: number[] = [];

for (let a = 0; a < hashes.length - 1; a++) {
  for (let b = a + 1; b < hashes.length; b++) {
    distances.push(distance(hashes[a], hashes[b]));
  }
}

const sum = distances.reduce((a, b) => a + b, 0);
console.log("distances", distances.length, distance(hashes[7], hashes[8]));

console.log("sum?", sum);
