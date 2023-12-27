export const a = "";

const calculateWiningNumbers = (winingNumbers: string[], myNumbers: string[]): number => {
    let points = 0;
    winingNumbers.forEach(wN => {
        if (myNumbers.includes(wN)) {
            points = points === 0 ? 1 : points * 2;
        }
    })
    return points
}

const input = await Deno.readTextFile("input.txt");
const cards = input.split("\r\n")
let pointsSum = 0;

cards.forEach((card) => {
    const cardParts = card.split(":");
    const numbers = cardParts[1].replaceAll("  ", " ").split("|");
    const winingNumbers = numbers[0].trim().split(" ");
    const myNumbers = numbers[1].trim().split(" ");
    pointsSum += calculateWiningNumbers(winingNumbers, myNumbers);
})

console.log(pointsSum);