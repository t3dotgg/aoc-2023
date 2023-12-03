const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((line) => line.split(""));

let total = 0;

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

    if ((cnum.length > 0 && !char.match(/\d/)) || charNum === line.length - 1) {
      // check if any surrounding characters are symbols
      const surrounding = [];
      for (let y = rowNum - 1; y <= rowNum + 1; y++) {
        for (let x = charNum - cnum.length - 1; x <= charNum; x++) {
          if (input[y] && input[y][x]) {
            surrounding.push(input[y][x]);
          }
        }
      }
      // console.log(cnum, surrounding);

      if (
        surrounding.some((char) => {
          // return true if NOT digit OR period
          return !(char.match(/\d/) || char === ".");
        })
      ) {
        // console.log("valid", cnum);
        total += parseInt(cnum);
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

console.log("total", total);

// console.log("input?", input);
