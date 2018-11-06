function getElementById<E extends HTMLElement>(id: string): E {
    return document.getElementById(id) as E;
}
function addPerson() {
    const isFemale = getElementById<HTMLInputElement>("isFemale").checked;
    const firstName = getElementById<HTMLInputElement>("firstName").value;
    const lastName = getElementById<HTMLInputElement>("lastName").value;
    const dateOfBirthText = getElementById<HTMLInputElement>("dateOfBirth").value;
    const isMarried = getElementById<HTMLInputElement>("isMarried").checked;
    const weightText = getElementById<HTMLInputElement>("weight").value;
    const weight = parseInt(weightText);
    const heightText = getElementById<HTMLInputElement>("height").value;
    const height = parseInt(heightText);
    const childrenText = getElementById<HTMLInputElement>("children").value;
    const children = parseInt(childrenText);
    const errors = [];
    if (firstName == "") {
        errors.push("Fill up the FIRST NAME");
    }

    if (lastName == "") {
        errors.push("Fill up the LAST NAME");
    }

    // const isDateCorrect = /\d{1,2}\.\d{1,2}\.\d{4}/.test(dateOfBirthText);
    // const isDateCorrectAlso = /\d{2}\s[A-Z][a-z]{2}\s\d{4}/.test(dateOfBirthText);
    // if (!isDateCorrect && !isDateCorrectAlso) {
    //     errors.push("Enter date of birth in 'dd.mm.yyyy'");
    //     errors.push("Enter date of birth in 'dd mon yyyy'");
    // }

    const matchedRussianDate = /(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(dateOfBirthText);
    if (matchedRussianDate == null) {
        errors.push("Enter date of birth in 'dd.mm.yyyy'");
        return;
    };
    const [, dayText, monthText, yearText] = matchedRussianDate;
    const day = parseInt(dayText);
    const month = parseInt(monthText);
    const year = parseInt(yearText);
    const today = new Date();

    today.setFullYear(today.getFullYear() + 1000);

    const birthDay = new Date(year, month - 1, day);
    const birthDayCopy = new Date(birthDay.getTime());

    birthDayCopy.setFullYear(birthDayCopy.getFullYear() + 1000);

    const totalMs = today.getTime() - birthDayCopy.getTime();
    const totalHr = Math.floor(totalMs / 1000 / 60 / 60);
    const totalDays = Math.floor(totalHr / 24);
    const age = Math.floor(totalMs / 1000 / 60 / 60 / 24 / 365);
    console.log(day, month, year, age + " years", totalDays + " days", totalHr + " hours");

    if (errors.length > 0) {
        alert(errors.join(', '));
    }
    else {
        const person: Person = {
            isFemale: isFemale,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: birthDay,
            age: age,
            isMarried: isMarried,
            weight: weight,
            height: height,
            children: children,
        };
        all.push(person);
    }
    console.log(all);
}


function checkPersonIsOk(person: Person): boolean {
    const isBachelor = !person.isMarried;
    const isOfNormalWeight = person.weight < 100;
    const isOfNormalHeight = person.height > 160;
    const isParent = person.children >= 1;
    const isOk = isBachelor && isOfNormalWeight && isOfNormalHeight && isParent;
    return isOk;
}

function findPersons(people: Person[]) {
    const searchResult: string[] = [];
    for (
        const person of people
    ) {
        const isOk = checkPersonIsOk(person);
        if (isOk) {
            searchResult.push(person.firstName + "\n" + person.lastName);
        }
    }
    console.log(searchResult.join(', '));
    return searchResult;
}
function findRightPerson(people: Person[]) {
    for (
        const person of people
    ) {
        const isOk = checkPersonIsOk(person);
        if (isOk) {
            return person;
        }
    }
    return null;
}
function makeSureThereIsRightPerson(people: Person[]) {
    const personOrNot = findRightPerson(people);
    if (personOrNot == null) {
        alert("Person not found!");
    } else {
        alert(personOrNot.firstName + "\n" + personOrNot.lastName);
    }
}
const names: (keyof Person)[] = ["isFemale", "firstName", "lastName", "dateOfBirth", "isMarried", "weight", "height", "children"];

function showAllPersons(people: Person[]) {
    let i = 1;
    for (i; i < people.length; i = i + 2) {
        const person = people[i];
        console.log(i, person);
        let j = names.length - 1;
        for (j; 0 <= j; j = j - 2) {
            const name = names[j];
            const value = person[name];
            console.log(name, j, value);
        }
    }
}

function showAllPersonsWithWhile(people: Person[]) {
    let i = 1;
    while (i < people.length) {
        const person = people[i];
        console.log(i, person);

        let j = names.length - 1;
        while (0 <= j) {
            const name = names[j];
            const value = person[name];
            console.log(name, j, value);
            j = j - 2;
        }

        i = i + 2;
    }
}

function showMathRandom(people: Person[]) {
    let i = 0;
    for (i; i < 1; i = i + 1) {
        const n = Math.random() * people.length;
        const f = Math.floor(n);
        const person = people[f];
        console.log(f, person.firstName);
    }
}

function showColor(people: Person[]) {
    const color = ["red", "orange", "yellow", "green", "light blue", "blue", "purple"];
    const colorRandom = getRandomElement(color);
    const person = getRandomElement(people);
    console.log(colorRandom, person.firstName);

    /** const personFirstElement = getFirstElement(people);
const colorFirst = getFirstElement(color);
console.log(personFirstElement, colorFirst);*/
}


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const firstDayOfTheMonth = new Date(year, month, 1);
const firstDayOfTheMonthNumber = firstDayOfTheMonth.getDay();
const leftTopDate = new Date(year, month, 1 - firstDayOfTheMonthNumber);

const lastDayOfTheMonth = new Date(year, month + 1, 0)
const lastDayOfTheMonthNumerDay = lastDayOfTheMonth.getDay();
const gottenDay =  6 - lastDayOfTheMonthNumerDay;
const rightBottomDate = new Date(year, month + 1, 0 + gottenDay);
console.log (lastDayOfTheMonth, lastDayOfTheMonthNumerDay, gottenDay, rightBottomDate); 

// let date = leftTopDate;
// function chunk<T>(values: T[], size: number): T[][] {

// }
// const chunked = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 4);
// console.log(chunked);

// function createWeeks() {
//     const weeks = [];
//     for () {
//         for () {
//         }
//     }
//     return weeks;
// }

//const weeks = createWeeks();
// const weeks = [
//     ["30", "1", "2", "3", "4", "5", "6"],
//     ["7", "8", "9", "10", "11", "12", "13"],
//     ["14", "15", "16", "17", "18", "19", "20"],
//     ["21", "22", "23", "24", "25", "26", "27"],
//     ["28", "29", "30", "31", "1", "2", "3"]
// ]

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
class Day extends React.Component<{}> {
    render() {
        const props = this.props;
        return <table className="datePicker">
            <tr>{dayOfWeek.map(day => <th>{day}</th>)}</tr>
            {weeks.map(week => <tr>{week.map(day => <td>{day}</td>)}</tr>)}
        </table>;
    }
}

class Root extends React.Component<{}> {
    renderForm() {
        return <div className="box">
            <div> Is female <input type="checkbox" id="isFemale" /></div>
            <div>First name <input type="text" id="firstName" defaultValue="Oxana" /></div>
            <div>Last name <input type="text" id="lastName" defaultValue="Bykova" /></div>
            <div>Date of birth <input type="text" id="dateOfBirth" defaultValue="04.05.1986" /></div>
            <div>Are you married? <input type="checkbox" id="isMarried" /></div>
            <div>Your weight is <input type="text" id="weight" defaultValue="65" /> kg</div>
            <div>Your height is <input type="text" id="height" defaultValue="168" /> cm</div>
            <div>How many children you have? <input type="text" id="children" defaultValue="0" /></div>
            <div><button onClick={() => addPerson()}>Add new person</button></div>
            <div><button onClick={() => findPersons(all)}>Find persons</button></div>
            <div><button onClick={() => makeSureThereIsRightPerson(all)}>Find right person</button></div>
            <div><button onClick={() => showAllPersons(all)}>Show all persons</button></div>
            <div><button onClick={() => showAllPersonsWithWhile(all)}>Show all persons with "While"</button></div>
            <div><button onClick={() => showMathRandom(all)}>Random person</button></div>
            <div><button onClick={() => showColor(all)}>Random color</button></div>
        </div>;
    }

    render() {
        return <Day />;
    }
}

function start() {
    const rootElement = document.getElementById('root');
    ReactDOM.render(<Root />, rootElement);
}

window.onload = start;