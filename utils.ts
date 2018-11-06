
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
