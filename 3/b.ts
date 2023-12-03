export const b = "";

const notOutOfBounds = (y: number, x: number): boolean => {
    return (y < lines.length && y >= 0 ) && (x < lines[y].length && x >= 0);
}

const checkAdjacent = (y: number, x: number): number => {
    const firstY = y == 0 ? y : y - 1;
    const firstX = x == 0 ? x : x - 1;
    //console.log("%s %s", firstY, firstX);
    //console.log("%s %s", y, x);
    let gearRatio = 0;
    let isGear = false;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3 && firstY !== y && firstX !== x; j++) {
            const currentY = firstY+i;
            const currentX = firstX+j;
            if(notOutOfBounds(currentY, currentX)){
                const sChar = lines[currentY][currentX]
                if(sChar.match(validNumber)){
                    if(isGear === false && gearRatio !== 0) isGear = true;
                    const numFound = findWholeNumber(sChar, currentY, currentX);
                    (isGear === false) ? gearRatio = numFound : gearRatio *= numFound
                }
            }
        }
    }
    //console.log("Gear Ratio ", gearRatio);
    return isGear ? gearRatio : 0;
}

const findWholeNumber = (initialNumber: string, y: number, x:number): number => {
    let finalNumber = initialNumber;
    let beforeX = x == 0 ? x : x - 1;
    let afterX = x === lines[y].length - 1 ? x : x + 1;

    /* 
        Using checkAdjacent() inside these whiles prodcued an edge case when a num was right 
        at the end of the array, solved it by adding o reducing by 1 the x value passed since 
        y is never increased here and x does
    */

    while(lines[y][beforeX].match(validNumber)){
        //console.log("Before Num found %s %s | %s", y, beforeX, lines[y][beforeX]);
        finalNumber = lines[y][beforeX] + finalNumber;
        lines[y][beforeX] = ".";
        if(notOutOfBounds(y, beforeX - 1)){
            beforeX--
        }else{
            break;
        }
    }
    
    while(lines[y][afterX].match(validNumber)){
        //console.log("After Num found %s %s | %s", y, afterX, lines[y][afterX]);
        finalNumber += lines[y][afterX];
        lines[y][afterX] = ".";
        if(notOutOfBounds(y, afterX + 1)){
            afterX++;
        }else{
            break;
        }
    }
    //console.log(finalNumber);
    return Number.parseInt(finalNumber);
}

const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map(line => line.split(""));
const validSymbol = new RegExp("^[^\\.\\w]", "s");
const validNumber = new RegExp("\\d");
let gearRSum = 0;
console.log("Finding all of the gear ratios inside the engine schematic and summing them");

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const character = line[j];
        if (character.match(validSymbol)) {
            gearRSum += checkAdjacent(i, j)
        }
    }
}
console.log(gearRSum);