const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

function createPermutations(input: string): string[] {
  if (!input.includes("?")) {
    return [input];
  }
  const permutations = [];

  // replace all ? with . and #
  const firstQuestionMark = input.indexOf("?");
  const before = input.slice(0, firstQuestionMark);
  const after = input.slice(firstQuestionMark + 1);
  const dot = before + "." + after;
  const notDot = before + "#" + after;

  return [...createPermutations(dot), ...createPermutations(notDot)];
}

const permutated = input.map((p) => createPermutations(p.split(" ")[0]));

// #.#.### 1,1,3
// First 2 groups of # are length 1, third is length 3
// Calculate if a permutation

const accuratePermutations = permutated.map((perms, i) => {
  const nums = input[i].split(" ")[1].split(",").map(Number);

  const accuratePerms = [];

  perms.forEach((perm) => {
    const shiftable = perm.split(".").filter((x) => x !== "");
    if (shiftable.length !== nums.length) {
      return;
    }
    const accurate = shiftable.every((x, i) => x.length === nums[i]);
    if (accurate) {
      accuratePerms.push(perm);
    }
  });

  return accuratePerms.length;
});

const sum = accuratePermutations.reduce((a, b) => a + b, 0);

console.log("answer?", sum);
