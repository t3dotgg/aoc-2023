const input: string[] = (await Bun.file("input.txt").text()).split("\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n");

type Brick = [number, number, number, number, number, number];

let bricks: Brick[] = input.map((line) => {
  const parts = line.split("~").map((coord) => coord.split(",").map(Number));

  return [...parts[0], ...parts[1]] as Brick;
});

function isSupported(
  allPoints: Set<string>,
  x: number,
  y: number,
  z: number
): boolean {
  if (z === 0) {
    return true;
  }
  return allPoints.has(`${x},${y},${z}`);
}

function move(bricks: Brick[]): [boolean, Brick[]] {
  let unstable = false;
  const allPoints = new Set<string>();
  bricks.forEach(([sx, sy, sz, ex, ey, ez]) => {
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        allPoints.add(`${x},${y},${ez}`);
      }
    }
  });

  const newBricks: Brick[] = [];
  bricks.forEach((brick) => {
    let supp = false;
    const [sx, sy, sz, ex, ey, ez] = brick;
    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        if (isSupported(allPoints, x, y, sz - 1)) {
          supp = true;
          break;
        }
      }
      if (supp) break;
    }
    if (!supp) {
      unstable = true;
      newBricks.push([sx, sy, sz - 1, ex, ey, ez - 1]);
    } else {
      newBricks.push(brick);
    }
  });
  return [unstable, newBricks];
}

let unstable = true;
while (unstable) {
  [unstable, bricks] = move(bricks);
}

let validToRemove = 0;

for (let i = 0; i < bricks.length; i++) {
  const bricksMinusOne = [...bricks];
  bricksMinusOne.splice(i, 1);
  if (!move(bricksMinusOne)[0]) {
    validToRemove += 1;
  }
}

console.log(validToRemove);
