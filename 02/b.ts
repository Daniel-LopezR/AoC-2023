export const b = "";

const input = await Deno.readTextFile("input.txt");
const games = input.split("\r\n");
const colors = ["red", "green", "blue"]
let powerSum = 0;
console.log("Calculating minimum amout of balls for the game to be possible...");

for (let i = 0; i < games.length; i++) {
    const parts = games[i].split(":")
    const subsets = parts[1].split(";");
    const minimumBalls = [0, 0, 0]    
    for (let j = 0; j < subsets.length; j++) {
        const subset = subsets[j].split(",");
        for (let y = 0; y < subset.length; y++) {
            const balls = subset[y].trim().split(" ");
            const nBalls = Number.parseInt(balls[0])
            const cBalls = balls[1]
            const idxMinBalls = colors.indexOf(cBalls);
            if(nBalls > minimumBalls[idxMinBalls]){
                minimumBalls[idxMinBalls] = nBalls
            }
        }
    }
    const power = minimumBalls[0] * minimumBalls[1] * minimumBalls[2];
    powerSum += power;
}
console.log(powerSum);