function getFirstElement<T>(array: T[]): T {
    const element1 = array[0];
    return element1;
}

function getLastElement<T>(array: T[]): T {
    const lastElement = array[array.length - 1];
    return lastElement;
}

function getRandomElement<T>(array: T[]): T {
    const n = Math.random() * array.length;
    const r = Math.floor(n);
    const randomElement = array[r];
    return randomElement;
}

function getRandomX11Color() {
    const colorRandom = getRandomElement(colors);
    return colorRandom;
}
const symbolForHexColor = ['a', 'b', 'c', 'd', 'e', 'f', '0','1', '2', '3', '4', '5', '6', '7', '8', '9'];

function getRandomHexColor() {
    const a = getRandomElement(symbolForHexColor);
    const b = getRandomElement(symbolForHexColor);
    const c = getRandomElement(symbolForHexColor);
    const d = getRandomElement(symbolForHexColor);
    const e = getRandomElement(symbolForHexColor);
    const f = getRandomElement(symbolForHexColor);
    const randomHexColor = "#" + a + b + c + d + e + f;
    return randomHexColor;
}

const lettersToPickUp = [
    "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "u", "w", "x", "y", "z"
];
function getKeyRandom() {
    const letter1 = getRandomElement(lettersToPickUp);
    const letter2 = getRandomElement(lettersToPickUp);
    const letter3 = getRandomElement(lettersToPickUp);
    const key = letter1 + letter2 + letter3;
    return key;
}
function sum(numbers: number[], i: number): number {
    if (i < numbers.length) {
        return numbers[i] + sum(numbers, i + 1);
    } else {
        return 0;
    }
}

function getTodayDate() { 
    return new Date();
}

function copyDate(date: Date): Date {
    return new Date(date.getTime());
}

function copyArray<T>(array: T[]): T[] {
    return array.slice(0);
}

function swapInArray<T>(array: T[], oneIndex: number, anotherIndex: number): T[] {
    const copied = copyArray(array);
    const oneValue = copied[oneIndex];
    const anotherValue = copied[anotherIndex];
    copied[oneIndex] = anotherValue;
    copied[anotherIndex] = oneValue;
    return copied;
}


function formatDateTime(datetime: Date): string {
    return datetime.getHours().toString().padStart(2, '0') + ':' + datetime.getMinutes().toString().padStart(2, '0');
}



