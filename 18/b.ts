const input: string[] = (await Bun.file("input.txt").text()).split("\n");

type Point = { x: number; y: number };

// shoelace for area
function shoelaceArea(vertices: Point[]): number {
  let area = 0.0;
  for (let i = 0; i < vertices.length; i++) {
    const j = (i + 1) % vertices.length;
    const [p1, p2] = [vertices[i], vertices[j]];

    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }

  return Math.abs(area / 2.0);
}

let loc: Point = { x: 0, y: 0 };
let totalDistance = 0;
const vertices: Point[] = [];
const dirMap: Point[] = [
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
];

input.forEach((line) => {
  const [a, b, c] = line.split(" ");

  const dir = dirMap[parseInt(c.slice(-2, -1))];
  const dist = parseInt(c.slice(-7, -2), 16);

  totalDistance += dist;
  loc = { x: loc.x + dist * dir.x, y: loc.y + dist * dir.y };
  vertices.push(loc);
});

const innerArea = shoelaceArea(vertices);

// pick's for interior
const interior = innerArea + 1 - Math.floor(totalDistance / 2);

// add to exterior for final answer
const answer = interior + totalDistance;

console.log("ans", answer);
