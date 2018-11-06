interface Time {
    timeToGetToPlace: Date;
    timeToBeOnPlace: Date;
}

const calculator: Time [] = [];

interface Interval {
    key: string;
    intName: string;
    intTime: number;
}
const intervals: Interval[] = [
    {
        key: "abc",
        intName: "To get to work",
        intTime: 60,
    },
    {
        key: "bac",
        intName: "To get to school",
        intTime: 15,
    },
    {
        key: "cab",
        intName: "Time to spend in school",
        intTime: 5,
    },
    {
        key: "bca",
        intName: "To get to school",
        intTime: 15,
    },
    {
        key: "acb",
        intName: "To get to swimming pool",
        intTime: 30,
    },
    {
        key: "cba",
        intName: "Time to spend in swimming pool",
        intTime: 40,
    },
    {
        key: "abd",
        intName: "To get to moms",
        intTime: 15,
    },
    {
        key: "adc",
        intName: "To get to karate from school",
        intTime: 15,
    },
    {
        key: "dbc",
        intName: "Time to spend on karate class",
        intTime: 45,
    },
    {
        key: "dab",
        intName: "Time to get ready after karate class",
        intTime: 10,
    },
] 