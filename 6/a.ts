const input = Deno.readTextFileSync("input.txt").split("\n");
// formatted as
// Time:        53     71     78     80
// Distance:   275   1181   1215   1524
// NOTE SPACE BETWEEN NUMBERS

// reduce whitespaces to 1 whitespace
input[0] = input[0].replace(/\s+/g, " ");
input[1] = input[1].replace(/\s+/g, " ");

const times = input[0].split(" ").map(Number);
times.shift();
const distances = input[1].split(" ").map(Number);
distances.shift();

console.log("input?", times, distances);

let winsMulti = 1;

distances.forEach((distance, i) => {
  const record = times[i];
  let chargeTime = 1;
  let validWaits: number[] = [];
  while (chargeTime < record) {
    const traverseTime = distance / chargeTime;
    if (traverseTime + chargeTime <= record) {
      validWaits.push(chargeTime);
    }
    chargeTime++;
  }
  console.log("valid waits", validWaits);
  winsMulti *= validWaits.length;
});

console.log("wins", winsMulti);
