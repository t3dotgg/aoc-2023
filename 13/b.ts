const parsed = Deno.readTextFileSync("input.txt").split("\n\n");
// const input = Deno.readTextFileSync("example.txt").split("\n\n");

const grids = parsed.map((grid) =>
  grid.split("\n").map((row) => row.split(""))
);

const rotate = (input: string[][]) => {
  const output: string[][] = [];
  for (let i = 0; i < input[0].length; i++) {
    const row: string[] = [];
    for (let j = 0; j < input.length; j++) {
      row.push(input[j][i]);
    }
    output.push(row);
  }
  return output;
};

const matching = (a: string[], b: string[]) => {
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
  }
  return diffs;
};

function getReflection(grid: string[][]) {
  main: for (let r = 0; r < grid.length - 1; r++) {
    let diffs = 0;
    const shortest = Math.min(r, grid.length - r);
    for (let i = 0; i < shortest + 1; i++) {
      const lowRow = r - i;
      const highRow = r + i + 1;
      if (lowRow < 0 || highRow >= grid.length) break;
      diffs += matching(grid[lowRow], grid[highRow]);
      if (diffs > 1) {
        continue main;
      }
    }
    if (diffs === 1) {
      return r + 1;
    }
  }
  return 0;
}

const answers = grids.map((grid) => {
  const horizontal = getReflection(grid);
  const vertical = getReflection(rotate(grid));
  return 100 * horizontal + vertical;
});

const sum = answers.reduce((a, b) => a + b, 0);

console.log("sum", sum);
