export const a = "";

const MAX_LOAD = {
    "red": 12,
    "green": 13,
    "blue": 14
}

const input = await Deno.readTextFile("input.txt");
const games = input.split("\r\n");
let idSum = 0;
console.log("Calculating probability of games happening with passed max balls per color...");

for (let i = 0; i < games.length; i++) {
    const parts = games[i].split(":")
    const gameId = Number.parseInt(parts[0].split(" ")[1]);
    const subsets = parts[1].split(";");
    let possible = true;
    for (let j = 0; j < subsets.length && possible; j++) {
        const subset = subsets[j].split(",");
        for (let y = 0; y < subset.length; y++) {
            const balls = subset[y].trim().split(" ");
            const nBalls = Number.parseInt(balls[0])
            const cBalls = balls[1]
            if(nBalls > MAX_LOAD[cBalls as keyof typeof MAX_LOAD]){
                possible = false;
                break;
            }
        }
        
    }
    if(possible){
        idSum += gameId
    }
}
console.log(idSum);