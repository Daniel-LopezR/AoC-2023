console.time()
const input = await Deno.readTextFile("input.txt")
const inputParts = input.split("\r\n\r\n");
const instruction = inputParts[0].split("");
const nodes = new Map<string, string[]>();
const lastNode = "ZZZ";

const initNodes = () => {
    inputParts[1].split("\r\n").forEach(node => {
        const nodeParts =  node.split(" = ");
        nodes.set(nodeParts[0], nodeParts[1].replace("(", "").replace(")", "").split(", "))
    }
)}

const stepsToLastNode = () => {
    let currentNode = "AAA";
    let currentInst = 0;
    let steps = 0;
    do{
        steps++;
        if(currentInst === instruction.length) currentInst = 0;
        const nextNodeIdx = instruction[currentInst] === "L" ? 0 : 1;  
        const possibleNextNodes = nodes.get(currentNode)!;
        console.log(currentNode, " => ", possibleNextNodes[nextNodeIdx]);
        currentNode = possibleNextNodes[nextNodeIdx];
        currentInst++;
    }while(currentNode !== lastNode);
    return steps;
}

initNodes()
console.log(stepsToLastNode());
console.timeEnd()
