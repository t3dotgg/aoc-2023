// Yes I hardcoded, no I don't care
const times = [53717880];
const distances = [275118112151524];

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
