const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

const chunks = input[0].split(",");

let boxes = new Map<number, { id: string; focal: number }[]>();

function getAsciiNumberForCharacter(character: string): number {
  return character.charCodeAt(0);
}

const calculateHashForString = (chars: string[]): number => {
  let sum = 0;
  chars.forEach((char) => {
    sum += getAsciiNumberForCharacter(char);
    sum = sum * 17;
    sum = sum % 256;
  });

  return sum;
};

const answers = chunks.map((chunk) => {
  if (chunk.includes("-")) {
    const chars = chunk.replace("-", "").split("");
    const index = calculateHashForString(chars);
    if (boxes.has(index)) {
      const existing = boxes.get(index);
      boxes.set(
        index,
        existing?.filter((item) => item.id !== chars.join("")) ?? []
      );
    }
  } else {
    const [key, focal] = chunk.split("=");
    const chars = key.split("");
    const index = calculateHashForString(chars);
    if (boxes.has(index)) {
      const existing =
        boxes
          .get(index)
          ?.map((item) =>
            item.id === key ? { id: key, focal: parseInt(focal) } : item
          ) ?? [];

      if (existing.some((item) => item.id === key)) {
        boxes.set(index, existing);
      } else {
        boxes.set(index, [...existing, { id: key, focal: parseInt(focal) }]);
      }
    } else {
      boxes.set(index, [{ id: key, focal: parseInt(focal) }]);
    }
  }
  console.log("chunk", chunk);
  console.log("updated", boxes);
  console.log("\n");
});

const scores = Array.from(boxes.values()).map((box) => {
  const base = calculateHashForString(box[0]?.id.split("") ?? []) + 1;
  let score = 0;
  box.forEach((item, index) => {
    score += base * (index + 1) * item.focal;
  });
  return score;
});

console.log("boxes?", boxes);
console.log("scores?", scores);

const sum = scores.reduce((acc, curr) => acc + curr, 0);

console.log("input?", sum);
