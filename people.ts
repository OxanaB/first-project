interface Person {
    isFemale: boolean;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    age: number;
    isMarried: boolean;
    weight: number;
    height: number;
    children: number;
}


const all: Person[] = [
    {
        isFemale: false,
        firstName: "Peter",
        lastName: "Kravets",
        dateOfBirth: new Date(1974, 3 - 1, 14),
        age: 44,
        isMarried: false,
        weight: 93,
        height: 178,
        children: 0
    },
    {
        isFemale: false,
        firstName: "Alex",
        lastName: "Bykov",
        dateOfBirth: new Date(1980, 1 - 1, 24),
        age: 38,
        isMarried: false,
        weight: 90,
        height: 180,
        children: 2
    },
    {
        isFemale: true,
        firstName: "Helen",
        lastName: "Wreck",
        dateOfBirth: new Date(1963, 10 - 1, 1),
        age: 55,
        isMarried: true,
        weight: 55,
        height: 150,
        children: 3
    },
    {
        isFemale: true,
        firstName: "Suzane",
        lastName: "Rocks",
        dateOfBirth: new Date(1954, 12 - 1, 27),
        age: 64,
        isMarried: true,
        weight: 110,
        height: 160,
        children: 2
    }
];
// @ts-ignore
window.all = all;