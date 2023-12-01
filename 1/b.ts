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
  let second = -1;

  let firstSpelled = "";

  row.forEach((char) => {
    // check if number
    if (char.match(/\d/)) {
      if (first === -1) {
        first = parseInt(char);
        second = parseInt(char);
      } else {
        second = parseInt(char);
      }
    } else {
      firstSpelled += char;
      for (let i = firstSpelled.length - 1; i >= 0; i--) {
        const num = numbersSpelled.indexOf(firstSpelled.slice(i));
        if (num !== -1) {
          if (first === -1) {
            first = num;
            second = num;
          } else {
            second = num;
          }
        }
      }
    }
  });

  total += first * 10 + second;
});

console.log("total", total);
