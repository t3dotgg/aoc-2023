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

// identify coordinates of all # in fullGrid
const hashes: [number, number][] = [];
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "#") {
      hashes.push([i, j]);
    }
  }
}
console.log("hashes", hashes);

const multiplier = 1000000;

// calculate distance between two points WITHOUT diagonal movement
function distance(a: [number, number], b: [number, number]) {
  const base = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

  // find all rows and columns crossed with no hashes
  const crossedRows = noHashRows.filter((row) => {
    return row > Math.min(a[0], b[0]) && row < Math.max(a[0], b[0]);
  });
  const crossedColumns = noHashColumns.filter((column) => {
    return column > Math.min(a[1], b[1]) && column < Math.max(a[1], b[1]);
  });

  return base + (crossedRows.length + crossedColumns.length) * (multiplier - 1);
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
