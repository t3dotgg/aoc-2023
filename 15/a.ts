const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

const chunks = input[0].split(",");

function getAsciiNumberForCharacter(character: string): number {
  return character.charCodeAt(0);
}

const answers = chunks.map((chunk) => {
  const chars = chunk.split("");
  let sum = 0;
  chars.forEach((char) => {
    sum += getAsciiNumberForCharacter(char);
    sum = sum * 17;
    sum = sum % 256;
  });

  return sum;
});

const sum = answers.reduce((acc, curr) => acc + curr, 0);

console.log("input?", sum);
