
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