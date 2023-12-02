export const a = "";
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n")
let totalSum = 0;
console.log("Finding calibration values and adding them...");
for (let i = 0; i < 10; i++) {
    const line = lines[i].split("").filter((value) => {
        const num = Number.parseInt(value)
        if (!Number.isNaN(num)){
            return value
        }
    });
    console.log(lines[i]);
    const calibrationValue = line[0] + line[line.length - 1];
    console.log(calibrationValue);
    totalSum += Number.parseInt(calibrationValue)
}
console.log(totalSum);
    