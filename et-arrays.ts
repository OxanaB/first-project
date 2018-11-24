
interface Interval {
    key: string;
    intName: string;
    intTime: number;
    isOnEditing: boolean;
}
const intervals: Interval[] = [
    {
        key: "abc",
        intName: "to get to work",
        intTime: 60,
        isOnEditing: false,
    },
    {
        key: "bac",
        intName: "to get to school",
        intTime: 15,
        isOnEditing: false,
    },
    {
        key: "cab",
        intName: "to spend in school",
        intTime: 5,
        isOnEditing: false,
    },
       {
        key: "adc",
        intName: "to get to karate from school",
        intTime: 15,
        isOnEditing: false,
    },
    {
        key: "dbc",
        intName: "to spend on karate class",
        intTime: 45,
        isOnEditing: false,
    },
    {
        key: "dab",
        intName: "to get ready after karate class",
        intTime: 10,
        isOnEditing: false,
    },
] 

const colors = [
    "#66B032",
    "#B2D732"
]