export const a = ""

const input = await Deno.readTextFile("input.txt");
const spaces = new RegExp(" +", "gm");
const lines = input.replaceAll(spaces, " ").split("\r\n");
const times = lines[0].split(":")[1].trim().split(" ");
const distances = lines[1].split(":")[1].trim().split(" ");
// product of Number of Wins
let pNW = 1;

const checkForRecord = (time: number, distance: number) => {
    let limit = time;
    let nR = 0;
    for (let i = 1; i <= limit; i++) {
        const rDistance = i * (time - i)
        if(rDistance > distance){
            if(limit === time) limit = time - i;
            nR++;
        }
    }
    console.log(nR);
    return nR;
}

for (let i = 0; i < times.length; i++) {
    pNW *= checkForRecord(Number(times[i]), Number(distances[i]));
}

console.log(pNW);
