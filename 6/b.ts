export const b = ""

const input = await Deno.readTextFile("input.txt");
const lines = input.replaceAll(" ", "").split("\r\n");
const time = Number(lines[0].split(":")[1].trim());
const distance = Number(lines[1].split(":")[1].trim());

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
    return nR;
}

console.log(checkForRecord(time, distance));
