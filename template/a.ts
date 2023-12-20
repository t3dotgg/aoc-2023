const input: string[] = (await Bun.file("input.txt").text()).split("\n\n");
// const input: string[] = (await Bun.file("example.txt").text()).split("\n\n");

console.log("input?", input);
