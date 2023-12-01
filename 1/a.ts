const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(""));

let total = 0;

input.forEach((row) => {
  // first number in row
  let first = -1;
  let last = -1;
  row.forEach((char) => {
    // check if number
    if (char.match(/\d/)) {
      last = parseInt(char);
      if (first === -1) first = parseInt(char);
    }
  });

  total += first * 10 + last;
});

console.log("total", total);
