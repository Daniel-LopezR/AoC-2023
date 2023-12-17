console.time();
const input = await Deno.readTextFile("input.txt");
const pipesLines = input.split("\r\n");
const pipeSystem = pipesLines.map(pipe => pipe.split(""));
const startY = pipesLines.findIndex(pL => pL.includes("S"))
const startX = pipesLines[startY].indexOf("S")

function getNextPipe (y: number, x: number, bY: number, bX: number, currentPipe: string): number[] {
    const newBY = y;
    const newBX = x;
    switch(currentPipe){
        case "|":
            if(y + 1 !== bY)++y;
            else --y;
            break;
        case "-":
            if(x + 1 !== bX) ++x;
            else --x;
            break;
        case "L":
            if(y - 1 !== bY) --y;
            else ++x;
            break;
        case "J":
            if(y - 1 !== bY) --y;
            else --x;
            break;
        case "7":
            if(x - 1 !== bX) --x;
            else ++y;
            break;
        case "F":
            if(x + 1 !== bX) ++x;
            else ++y;
            break;
        default:
            if (![".", "-", "L", "J"].includes(pipeSystem[y - 1][x])) --y;
            else if (![".", "|", "L", "F"].includes(pipeSystem[y][x + 1])) ++x;
            else if (![".", "-", "F", "7"].includes(pipeSystem[y + 1][x])) ++y;
            else if (![".", "|", "J", "7"].includes(pipeSystem[y][x - 1])) --x;
            break;
    }
    return [y, x, newBY, newBX]
}

function getFarthestPointLoop (startY: number, startX: number) {
    let y, bY;
    y = bY = startY
    let x, bX;
    x = bX = startX;
    let steps = 0;
    let currentPipe = pipeSystem[y][x];
    do{
        [y, x, bY, bX] = getNextPipe(y, x, bY, bX, currentPipe);
        currentPipe = pipeSystem[y][x];
        steps++;
    }while(currentPipe !== "S");
    return steps/2
}
console.log(getFarthestPointLoop(startY, startX));
console.timeEnd()

