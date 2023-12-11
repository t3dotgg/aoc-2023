const input = Deno.readTextFileSync("input.txt")
  // const input = Deno.readTextFileSync("example.txt")
  .split("\n")
  .map((r) => r.split(""));

const startY = input.findIndex((r) => r.includes("S"));
const startX = input[startY].findIndex((c) => c === "S");

const visitedPoints = [
  { x: startX, y: startY },
  { x: startX, y: startY - 1 },
  // { x: startX + 1, y: startY }, // for example
];

const step = () => {
  const currentPoint = visitedPoints[visitedPoints.length - 1]!;
  const prevPoint = visitedPoints[visitedPoints.length - 2]!;
  const current = input[currentPoint.y][currentPoint.x];

  console.log("visiting", currentPoint, current);

  if (current === "|") {
    const newY = currentPoint.y + (currentPoint.y - prevPoint.y);
    visitedPoints.push({ x: currentPoint.x, y: newY });
  } else if (current === "-") {
    const newX = currentPoint.x + (currentPoint.x - prevPoint.x);
    visitedPoints.push({ x: newX, y: currentPoint.y });
  } else if (current === "L") {
    // down to right or left to up
    if (prevPoint.y < currentPoint.y) {
      visitedPoints.push({ x: currentPoint.x + 1, y: currentPoint.y });
    } else {
      visitedPoints.push({ x: currentPoint.x, y: currentPoint.y - 1 });
    }
  } else if (current === "F") {
    // up to right or left to down
    if (prevPoint.y > currentPoint.y) {
      visitedPoints.push({ x: currentPoint.x + 1, y: currentPoint.y });
    } else {
      visitedPoints.push({ x: currentPoint.x, y: currentPoint.y + 1 });
    }
  } else if (current === "7") {
    // up to left or right to down
    if (prevPoint.y > currentPoint.y) {
      visitedPoints.push({ x: currentPoint.x - 1, y: currentPoint.y });
    } else {
      visitedPoints.push({ x: currentPoint.x, y: currentPoint.y + 1 });
    }
  } else if (current === "J") {
    // down to left or right to up
    if (prevPoint.y < currentPoint.y) {
      visitedPoints.push({ x: currentPoint.x - 1, y: currentPoint.y });
    } else {
      visitedPoints.push({ x: currentPoint.x, y: currentPoint.y - 1 });
    }
  } else if (current === "S") {
    console.log("WE DID IT", (visitedPoints.length - 1) / 2);

    throw new Error();
  }
};

while (true) {
  step();
}
