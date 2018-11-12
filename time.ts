interface Time {
    timeToGetToPlace: Date;
    timeToBeOnPlace: Date;
}

const calculator: Time [] = [];

interface Interval {
    key: string;
    intName: string;
    intTime: number;
    isOnEditing: boolean;
}
const intervals: Interval[] = [
    {
        key: "abc",
        intName: "To get to work",
        intTime: 60,
        isOnEditing: false,
    },
    {
        key: "bac",
        intName: "To get to school",
        intTime: 15,
        isOnEditing: false,
    },
    {
        key: "cab",
        intName: "Time to spend in school",
        intTime: 5,
        isOnEditing: true,
    },
    {
        key: "acb",
        intName: "To get to swimming pool",
        intTime: 30,
        isOnEditing: false,
    },
    {
        key: "cba",
        intName: "Time to spend in swimming pool",
        intTime: 40,
        isOnEditing: false,
    },
    {
        key: "abd",
        intName: "To get to moms",
        intTime: 15,
        isOnEditing: false,
    },
    {
        key: "adc",
        intName: "To get to karate from school",
        intTime: 15,
        isOnEditing: false,
    },
    {
        key: "dbc",
        intName: "Time to spend on karate class",
        intTime: 45,
        isOnEditing: false,
    },
    {
        key: "dab",
        intName: "Time to get ready after karate class",
        intTime: 10,
        isOnEditing: false,
    },
] 