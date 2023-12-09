const input = Deno.readTextFileSync("input.txt").split("\n");
// const input = Deno.readTextFileSync("example.txt").split("\n");

const nms = input.map((r) => r.split(" ").map(Number));

const resultArr = nms.map((numbers) => {
  let childSteps = [numbers];
  while (
    !childSteps[childSteps.length - 1]!.every(
      (n) => n === childSteps[childSteps.length - 1][0]
    )
  ) {
    let current = childSteps[childSteps.length - 1]!;
    let last = current[0];
    const newArr: number[] = [];

    for (let i = 1; i < current.length; i++) {
      const n = current[i];
      newArr.push(n - last);
      last = n;
    }

    childSteps.push(newArr);
  }

  return childSteps.reduce((acc, c) => {
    return acc + c[c.length - 1];
  }, 0);
});

console.log("input?", resultArr);

const sum = resultArr.reduce((acc, c) => {
  return acc + c;
});
console.log("sum", sum);
