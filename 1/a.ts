const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(""));

let total = 0;

input.forEach((row) => {
  // first number in row
  let first = -1;
  let second = -1;
  row.forEach((char) => {
    // check if number
    if (char.match(/\d/)) {
      if (first === -1) {
        first = parseInt(char);
        second = parseInt(char);
      } else {
        second = parseInt(char);
      }
    }
  });

  total += first * 10 + second;
});

console.log("total", total);
