const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

const memo: { [key: string]: number } = {};

function doWork(s: string, withinRun: number | null, remain: number[]): number {
  // Create a unique key for memoization
  const key = `${s}-${withinRun}-${remain.join(",")}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }

  if (!s) {
    if (withinRun === null && remain.length === 0) {
      return 1;
    }
    if (remain.length === 1 && withinRun !== null && withinRun === remain[0]) {
      return 1;
    }
    return 0;
  }

  let possibleMore: number = 0;
  for (let ch of s) {
    if (ch === "#" || ch === "?") {
      possibleMore += 1;
    }
  }

  if (
    withinRun !== null &&
    possibleMore + withinRun < remain.reduce((a, b) => a + b, 0)
  ) {
    return 0;
  }
  if (withinRun === null && possibleMore < remain.reduce((a, b) => a + b, 0)) {
    return 0;
  }
  if (withinRun !== null && remain.length === 0) {
    return 0;
  }

  let poss: number = 0;
  if (s[0] === "." && withinRun !== null && withinRun !== remain[0]) {
    return 0;
  }
  if (s[0] === "." && withinRun !== null) {
    poss += doWork(s.substring(1), null, remain.slice(1));
  }
  if (s[0] === "?" && withinRun !== null && withinRun === remain[0]) {
    poss += doWork(s.substring(1), null, remain.slice(1));
  }
  if ((s[0] === "#" || s[0] === "?") && withinRun !== null) {
    poss += doWork(s.substring(1), withinRun + 1, remain);
  }
  if ((s[0] === "?" || s[0] === "#") && withinRun === null) {
    poss += doWork(s.substring(1), 1, remain);
  }
  if ((s[0] === "?" || s[0] === ".") && withinRun === null) {
    poss += doWork(s.substring(1), null, remain);
  }

  memo[key] = poss;
  return poss;
}

const counts = input.map((l) => {
  const parts = l.split(" ");
  const s = parts[0];
  const v = parts[1].split(",").map((x) => parseInt(x));
  let news = "";
  for (let j = 0; j < 5; j++) {
    news += "?";
    news += s;
  }
  return doWork(news.substring(1), null, Array(5).fill(v).flat());
});
const sum = counts.reduce((a, b) => a + b, 0);

console.log("answer", sum);
