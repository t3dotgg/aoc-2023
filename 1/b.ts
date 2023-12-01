const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(""));

let total = 0;

const numbersSpelled = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

input.forEach((row) => {
  // first number in row
  let first = -1;
  let last = -1;

  let firstSpelled = "";

  row.forEach((char) => {
    // check if number
    if (char.match(/\d/)) {
      last = parseInt(char);
      if (first === -1) first = parseInt(char);
    } else {
      firstSpelled += char;
      for (let i = firstSpelled.length - 1; i >= 0; i--) {
        const num = numbersSpelled.indexOf(firstSpelled.slice(i));
        if (num !== -1) {
          last = num;
          if (first === -1) first = num;

          break;
        }
      }
    }
  });

  total += first * 10 + last;
});

console.log("total", total);
