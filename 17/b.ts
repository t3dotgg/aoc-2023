import MinHeap from "./heap.ts";

const input: string[] = (await Bun.file("input.txt").text()).split("\n");

type Node = { x: number; y: number; repeat: number; dx: number; dy: number };

function genNeighbors(node: Node, data: string[]) {
  const neighbors: [Node, number][] = [];
  const { x, y, repeat, dx, dy } = node;

  if (
    repeat < 10 &&
    x + dx >= 0 &&
    x + dx < data.length &&
    y + dy >= 0 &&
    y + dy < data[0].length
  ) {
    neighbors.push([
      { x: x + dx, y: y + dy, repeat: repeat + 1, dx, dy },
      parseInt(data[x + dx][y + dy]),
    ]);
  }

  const lr = [
    { dx: -dy, dy: dx },
    { dx: dy, dy: -dx },
  ];

  lr.forEach(({ dx, dy }) => {
    if (
      x + dx >= 0 &&
      x + dx < data.length &&
      y + dy >= 0 &&
      y + dy < data[0].length &&
      repeat > 3
    ) {
      neighbors.push([
        { x: x + dx, y: y + dy, repeat: 1, dx, dy },
        parseInt(data[x + dx][y + dy]),
      ]);
    }
  });

  return neighbors;
}

function pathfind(data: string[]) {
  const visited = new Set<string>();
  const start1: Node = { x: 0, y: 0, repeat: 0, dx: 1, dy: 0 };
  const start2: Node = { x: 0, y: 0, repeat: 0, dx: 0, dy: 1 };
  const dist: { [key: string]: number } = {};
  dist[JSON.stringify(start1)] = 0;
  dist[JSON.stringify(start2)] = 0;

  const Q = new MinHeap<[number, Node]>((a, b) => a[0] - b[0]);
  Q.add([0, start1]);
  Q.add([0, start2]);

  const target: [number, number] = [data.length - 1, data[0].length - 1];

  while (!Q.isEmpty()) {
    const [_, current] = Q.pop()!;
    const uKey = JSON.stringify(current);

    if (visited.has(uKey)) continue;
    visited.add(uKey);

    if (
      current.x === target[0] &&
      current.y === target[1] &&
      current.repeat > 3
    ) {
      return dist[uKey];
    }

    const neighbors = genNeighbors(current, data);

    neighbors.forEach(([v, cost]) => {
      const vKey = JSON.stringify(v);
      if (visited.has(vKey)) return;
      const alt = dist[uKey] + cost;
      if (!dist[vKey] || alt < dist[vKey]) {
        dist[vKey] = alt;
        Q.add([alt, v]);
      }
    });
  }
}

const answer = pathfind(input);

console.log("ans", answer);
