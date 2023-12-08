export const a = "";

const input = await Deno.readTextFile("input.txt");
const hands = input.split("\r\n").map(hand => hand.split(" "));

const cardStrength = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const handTypes = ["highCard", "OnePair","twoPair","threeKind","fullHouse","fourKind", "fiveKind"]
let totalWinnings = 0;

const findType = (hand: string): string => {
    const labelCopies: number[] = []
    for (const i = 0; i < hand.length;) {
        const remainingHand = hand.replaceAll(hand[i], "");
        labelCopies.push(hand.length - remainingHand.length);
        hand = remainingHand;
    }
    labelCopies.sort((a, b) => b - a);
    if(labelCopies.length === 1){
        return handTypes[6];
    }else if(labelCopies[0] === 4){
        return handTypes[5];
    }else if(labelCopies[0] === 3 && labelCopies[1] === 2){
        return handTypes[4];
    }else if(labelCopies[0] === 3 && labelCopies[1] === 1){
        return handTypes[3];
    }else if(labelCopies[0] === 2 && labelCopies[1] === 2){
        return handTypes[2];
    }else if(labelCopies[0] === 2 && labelCopies[1] === 1){
        return handTypes[1];
    }else{return handTypes[0];}
}

const compareStrength = (hand1: string, hand2: string): number => {
    for (let i = 0; i < hand1.length; i++) {
        if(hand1[i] !== hand2[i]){
            return cardStrength.indexOf(hand1[i]) - cardStrength.indexOf(hand2[i])
        }
    }
    return 0
}

hands.sort((a, b) => {
    const aType = findType(a[0]);
    const bType = findType(b[0]);
    if(aType !== bType){
        return handTypes.indexOf(aType) - handTypes.indexOf(bType)
    }else{
        return compareStrength(a[0], b[0]);
    }
})

for (let i = 0; i < hands.length; i++) {
    totalWinnings += Number(hands[i][1]) * (i + 1)
}

console.log(totalWinnings);