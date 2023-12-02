export const b = "";

const spelledNumbers = ["one","two","three","four","five","six","seven","eight","nine"]

const spelledToNumbers = () => {
    for (let i = 0; i < spelledNumbers.length; i++) {
        const spelledNum = spelledNumbers[i]
        const num = i + 1;
        input = input.replaceAll(spelledNum, spelledNum + num + spelledNum)
    }
}

let input = await Deno.readTextFile("1/input.txt");
spelledToNumbers()
const nonDigits = new RegExp("[a-z]", "gm")
const lines = input.replaceAll(nonDigits, "").split("\r\n")


let totalSum = 0;
console.log("Finding calibration values and adding them...");
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("");
    const calibrationValue = line[0] + line[line.length - 1];
    totalSum += Number.parseInt(calibrationValue)
}
console.log(totalSum);