const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((line) => line.split(""));

let total = 0;

const gearMap = new Map<string, number[]>();

const RED = "\u001b[31m";
const BLUE = "\u001b[34m";
const GREEN = "\u001b[32m";
const RESET = "\u001b[0m";
input.forEach((line, rowNum) => {
  let cnum = "";
  let rowTextToPrint = `${RESET}`;
  line.forEach((char, charNum) => {
    // if char is a digit, append to current cnum
    if (char.match(/\d/)) {
      cnum += char;
    }

    let hasGear = false;
    if ((cnum.length > 0 && !char.match(/\d/)) || charNum === line.length - 1) {
      if (charNum === line.length - 1 && char.match(/\d/)) {
        charNum++;
      }
      // check if any surrounding characters are symbols
      for (let y = rowNum - 1; y <= rowNum + 1; y++) {
        for (let x = charNum - cnum.length - 1; x <= charNum; x++) {
          // console.log(cnum, "checking", y, x);
          if (input[y] && input[y][x] && input[y][x] === "*") {
            // console.log(cnum, "found gear", x, y);
            hasGear = true;
            const current = gearMap.get(`${x},${y}`) ?? [];
            current.push(parseInt(cnum));
            gearMap.set(`${x},${y}`, current);
          }
        }
      }
      if (hasGear) {
        rowTextToPrint += `${GREEN}${cnum}${RESET}`;
      } else {
        rowTextToPrint += `${RED}${cnum}${RESET}`;
      }
      cnum = "";
    }
    if (char === ".") {
      rowTextToPrint += `${char}`;
    } else if (!char.match(/\d/)) {
      rowTextToPrint += `${BLUE}${char}${RESET}`;
    }
  });
  console.log(rowTextToPrint);
});

// console.log(gearMap);

gearMap.forEach((values, key) => {
  if (values.length === 2) {
    total += values[0] * values[1];
  }
});

console.log("total", total);

// console.log("input?", input);
