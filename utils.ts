
export function getFirstElement<T>(array: T[]): T {
    const element1 = array[0];
    return element1;
}

export function getLastElement<T>(array: T[]): T {
    const lastElement = array[array.length - 1];
    return lastElement;
}

export function getRandomElement<T>(array: T[]): T {
    const n = Math.random() * array.length;
    const r = Math.floor(n);
    const randomElement = array[r];
    return randomElement;
}
export const colors = [
        "#66B032",
        "#B2D732"
    ]
export function getRandomX11Color() {
    const colorRandom = getRandomElement(colors);
    return colorRandom;
}
export const symbolForHexColor = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function getRandomHexColor() {
    const a = getRandomElement(symbolForHexColor);
    const b = getRandomElement(symbolForHexColor);
    const c = getRandomElement(symbolForHexColor);
    const d = getRandomElement(symbolForHexColor);
    const e = getRandomElement(symbolForHexColor);
    const f = getRandomElement(symbolForHexColor);
    const randomHexColor = "#" + a + b + c + d + e + f;
    return randomHexColor;
}

export const lettersToPickUp = [
    "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "u", "w", "x", "y", "z"
];
export function getKeyRandom() {
    const letter1 = getRandomElement(lettersToPickUp);
    const letter2 = getRandomElement(lettersToPickUp);
    const letter3 = getRandomElement(lettersToPickUp);
    const key = letter1 + letter2 + letter3;
    return key;
}


export function getTodayDate() {
    return new Date();
}

export function copyDate(date: Date): Date {
    return new Date(date.getTime());
}

export function copyArray<T>(array: T[]): T[] {
    return array.slice(0);
}

export function swapInArray<T>(array: T[], oneIndex: number, anotherIndex: number): T[] {
    const copied = copyArray(array);
    const oneValue = copied[oneIndex];
    const anotherValue = copied[anotherIndex];
    copied[oneIndex] = anotherValue;
    copied[anotherIndex] = oneValue;
    return copied;
}

export function formatDateTime(datetime: Date): string {
    return datetime.getHours().toString().padStart(2, '0') + ':' + datetime.getMinutes().toString().padStart(2, '0');
}

export function map<In, Out>(value: In[], instead: (value:In) => Out) {
    const resulut:  Out[] = [];
    for (let index = 0; index < value.length; index++) {
        const inValue = value[index];
        const outValue = instead(inValue);
        resulut.push(outValue);
    }
    return resulut;
}

export function filter<T>(all: T[], shouldKeep: (val:T) => boolean): T[] {
    const result: T[] = [];
    for (let index=0; index < all.length; index++) {
        const val = all[index]
        if (shouldKeep(val) ) {
            result.push(val)
        };         
    } return result;
}

export function fold<T,R>(vals: T[], result:R, take:(result:R, val:T) => R):R {
    for (let index=0; index< vals.length; index++) {
        const val = vals[index];
        result = take(result, val);
    } return result;
}

export function sum(numbers: number[]): number{
    const sum = fold(numbers, 0, (sum, number) => sum + number);
    return sum;
}