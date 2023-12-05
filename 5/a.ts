export const a = "";

const input = await Deno.readTextFile("input.txt")
const almanac = input.replaceAll("\r\n", "|").split("||");
let seeds: number[];
const steps: number[][][] = [];

const initMaps = (): void => {
    seeds = almanac[0].split(":")[1].trim().split(" ").map(seed => Number(seed));
    for (let i = 1; i < almanac.length; i++) {
        const maps = almanac[i].split(":|")[1].split("|")
        steps.push(maps.map(range => {
            const rangeValues = range.split(" ");
            const destinationS = Number(rangeValues[0])
            const sourceS = Number(rangeValues[1])
            const addedRange = Number(rangeValues[2])
            return [destinationS, destinationS + addedRange, sourceS, sourceS + addedRange]
        }));
    }  
}

const findLocation = (seedId: number): number => {
    let currentId = seedId;
    steps.forEach(step => {
        const range = step.filter(rangeV => currentId >= rangeV[2] && rangeV[3] > currentId);
        if(range.length !== 0){
            const rangeV = range[0];
            const diff = rangeV[0] - rangeV[2];
            currentId += diff;
        }
    })
    return currentId
}

const findLowestLocation = (): number => {
    const locations: number[] = []
    seeds.forEach(seed => {
        const location: number = findLocation(seed);
        locations.push(location)
    })
    locations.sort((a,b) => a - b);
    return locations[0]
}

initMaps()
const lowestLocation = findLowestLocation();
console.log(lowestLocation);