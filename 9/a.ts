const input = Deno.readTextFileSync("input.txt").split("\n");

const nms = input.map((r) => r.split(" ").map(Number));

const resultArr = nms.map((numbers) => {
  const childSteps = [numbers];
  const getCurrent = () => childSteps[childSteps.length - 1]!;
  while (!getCurrent().every((n) => n === getCurrent()[0])) {
    const current = getCurrent();
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

const sum = resultArr.reduce((acc, c) => {
  return acc + c;
});
console.log("sum", sum);
