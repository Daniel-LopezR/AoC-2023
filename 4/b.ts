export const b = "";

const calculateScratchCopies = (winingNumbers: string[], myNumbers: string[]): number => {
    let newScratchCopies = 0;
    winingNumbers.forEach(wN => {
        if (myNumbers.includes(wN)) newScratchCopies++;
    })
    return newScratchCopies;
}

const input = await Deno.readTextFile("input.txt");
const cards = input.split("\r\n");
const scratchCopies: number[] = new Array(cards.length).fill(1);

for (let i = 0; i < cards.length; i++) {
    const cardParts = cards[i].split(":");
    const numbers = cardParts[1].replaceAll("  ", " ").split("|");
    const winingNumbers = numbers[0].trim().split(" ");
    const myNumbers = numbers[1].trim().split(" ");
    const newScratchCopies = calculateScratchCopies(winingNumbers, myNumbers);
    for (let j = 1; j <= newScratchCopies; j++) {
        scratchCopies[i + j] += scratchCopies[i]
    }
}
console.log(scratchCopies.reduce((a, b) => a + b, 0));