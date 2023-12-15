console.time()
const input = await Deno.readTextFile("input.txt");
const histories = input.split("\r\n")
    .map(history => history.split(" ")
        .map(value => Number(value)));
const newValues: number[] = []
let totalSum = 0;

function genSequence(sequences: number[][]): void {
    const last = sequences.length - 1;
    const newSquence: number[] = []
    for (let i = 0; i < sequences[last].length; i++) {
        if(i + 1 !== sequences[last].length){
            newSquence.push(sequences[last][i + 1] - sequences[last][i])
        }
    }
    sequences.push(newSquence);
    if(newSquence.filter(value => value !== 0).length > 0){
        genSequence(sequences)
    }
    return 
}

function genNewValue(sequences: number[][]): number{
    let newValue = 0;
    sequences.forEach(sequence => {
        const last = sequence.length - 1;
        newValue += sequence[last];
    })
    return newValue
}

histories.forEach(history => {
    const sequences:number[][] = [history]
    genSequence(sequences);
    newValues.push(genNewValue(sequences));
})
totalSum = newValues.reduce((a, b) => a + b);
console.log(totalSum);
console.timeEnd()