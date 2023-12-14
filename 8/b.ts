console.time()
const input = await Deno.readTextFile("input.txt")
const inputParts = input.split("\r\n\r\n");
const instruction = inputParts[0].split("");
const nodes = new Map<string, string[]>();
const startingNodes: string[] = [];

const getStartNodes = () => {
    Array.from(nodes.keys()).forEach(nodeKey => {
        if(nodeKey[2] === "A") startingNodes.push(nodeKey)
    })
}

const initNodes = () => {
    inputParts[1].split("\r\n").forEach(node => {
        const nodeParts =  node.split(" = ");
        nodes.set(nodeParts[0], nodeParts[1].replace("(", "").replace(")", "").split(", "))
    }
)}

const findLCMSteps = (nodeSteps: number[]) => {
   // Using euclidean algorithm to find lcm of 2 numbers
    const gcd = (a: number, b: number): number => {
        return !b ? a : gcd(b, a % b);
    }
    const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);   
    }
    return nodeSteps.reduce((a, b) => lcm(a, b));
}



const countStepsToNodes = () => {
    const currentNodes = startingNodes;
    const nodesSteps: number[] = [];
    for (let i = 0; i < currentNodes.length; i++) {
        let currentNode = currentNodes[i]
        let currentInst = 0;
        let steps = 0;
        let endWithZ = false;
        do{
            if(currentInst === instruction.length) currentInst = 0;
            const nextNodeIdx = instruction[currentInst] === "L" ? 0 : 1;
            const possibleNextNodes = nodes.get(currentNode)!;
            const nextNode = possibleNextNodes[nextNodeIdx]
            currentNode = nextNode;
            currentInst++;
            steps++;
            if (currentNode[2] === "Z") endWithZ = true
        }while(!endWithZ);
        nodesSteps.push(steps)
    }
    console.log(nodesSteps);
    return findLCMSteps(nodesSteps);
}

initNodes()
getStartNodes()
console.log(countStepsToNodes());
console.timeEnd()