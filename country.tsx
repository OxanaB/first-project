interface PersonEditorProps {
    personForEditing: PersonEditorState;
    whenNewPersonCreated: (person: Person) => void;
}

interface PersonEditorState {
    firstName: string;
    lastName: string;
    isFemale: boolean;
    year: string;
    month: string;
    day: string;
    isMarried: boolean;
    weight: string;
    height: string;
    children: string;
}

const defaultPersonForEditor: PersonEditorState = {
    firstName: '',
    lastName: '',
    isFemale: false,
    year: '',
    month: '',
    day: '',
    isMarried: false,
    weight: '',
    height: '',
    children: '',
}

class PersonEditor extends React.Component<PersonEditorProps, PersonEditorState> {
    state = {
        ...this.props.personForEditing
    }
    render() {
        const firstNameCurrent = this.state.firstName;
        const lastNameCurrent = this.state.lastName;
        const isFemaleCurrent = this.state.isFemale;
        const yearCurrent = this.state.year;
        const monthCurrent = this.state.month;
        const dayCurrent = this.state.day;
        const isMarriedCurrent = this.state.isMarried;
        const weightCurrent = this.state.weight;
        const heightCurrent = this.state.height;
        const childrenCurrent = this.state.children;
        return <>
            <table>
                <tr>
                    <td>First name <input type="text"
                        value={firstNameCurrent}
                        onChange={event => {
                            this.setState({ firstName: event.currentTarget.value });
                        }} />
                    </td>
                    <td>Last name <input type="text"
                        value={lastNameCurrent}
                        onChange={event => {
                            this.setState({ lastName: event.currentTarget.value });
                        }} />
                    </td>
                    <td></td>
                </tr>
                <tr><td>Are you female? <input type="checkbox"
                    checked={isFemaleCurrent}
                    onChange={() => {
                        this.setState({ isFemale: !isFemaleCurrent });
                    }} />
                </td>
                    <td>Are you married? <input type="checkbox"
                        checked={isMarriedCurrent}
                        onChange={() => {
                            this.setState({ isMarried: !isMarriedCurrent });
                        }} /></td>
                        <td></td>
                </tr>
                <tr><td>Date of birth:
                    Year <input type="text"
                        value={yearCurrent}
                        onChange={event => {
                            this.setState({ year: event.currentTarget.value });
                        }} />
                </td>
                    <td>Month <input type="text"
                        value={monthCurrent}
                        onChange={event => {
                            this.setState({ month: event.currentTarget.value })
                        }} />
                    </td>
                    <td>Day <input type="text"
                        value={dayCurrent}
                        onChange={event => {
                            this.setState({ day: event.currentTarget.value })
                        }} />
                    </td>
                </tr>
                <tr>
                    <td>Your weight is <input type="text"
                        value={weightCurrent}
                        onChange={event => {
                            this.setState({ weight: event.currentTarget.value })
                        }} />
                    </td>
                    <td>Your height is <input type="text"
                        value={heightCurrent}
                        onChange={event => {
                            this.setState({ height: event.currentTarget.value })
                        }} />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>How many children you have? <input type="text"
                        value={childrenCurrent}
                        onChange={event => {
                            this.setState({ children: event.currentTarget.value })
                        }} />
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div><button onClick={() => {
                const xxx = this.state;
                const firstName = xxx.firstName;
                const lastName = xxx.lastName;
                const isFemale = xxx.isFemale;
                const isMarried = xxx.isMarried;
                const weight = parseInt(xxx.weight);
                const height = parseInt(xxx.height);
                const children = parseInt(xxx.children);
                const year = parseInt(xxx.year);
                const month = parseInt(xxx.month);
                const day = parseInt(xxx.day);
                const errors = [];
                if (firstName == "") {
                    errors.push("Fill up the FIRST NAME");
                }

                if (lastName == "") {
                    errors.push("Fill up the LAST NAME");
                }
                const today = new Date();

                today.setFullYear(today.getFullYear() + 1000);

                const birthDay = new Date(year, month - 1, day);
                const birthDayCopy = new Date(birthDay.getTime());

                birthDayCopy.setFullYear(birthDayCopy.getFullYear() + 1000);

                const totalMs = today.getTime() - birthDayCopy.getTime();
                const age = Math.floor(totalMs / 1000 / 60 / 60 / 24 / 365);

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
                    this.props.whenNewPersonCreated(person);
                    console.log(person);
                } 
                console.log(all);
            }}>Add</button></div>
        </>;
    }
}

interface PersonDetailsProps { isChecked: boolean; myself: Person }
interface PersonDetailsState { isChecked: boolean; }

class PersonDetails extends React.Component<PersonDetailsProps, PersonDetailsState> {
    state = {
        isChecked: this.props.isChecked
    }

    render() {
        const isCheckedCurrent = this.state.isChecked;
        return <tr>
            <td><input type="checkbox"
                checked={isCheckedCurrent}
                onChange={() => {
                    this.setState({ isChecked: !isCheckedCurrent });
                }}
            /></td>
            <td> {isCheckedCurrent ? '!!!' : '???'} {this.props.myself.firstName} {this.props.myself.lastName}</td>
            <td> {this.props.myself.age}</td>
            <td> {this.props.myself.children} </td>
        </tr>
    }
}

interface NeighbourhoodProps { peopleOfNeighbourhood: Person[] }
class Neighbourhood extends React.Component<NeighbourhoodProps> {
    render() {
        return <>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Children</th>
            </tr>
            {this.props.peopleOfNeighbourhood.map(person => <PersonDetails isChecked={false} myself={person} />)}
        </>;
    }

}
function sum(numbers: [], i:number): number {
    if (i < numbers.length) {
        return numbers[i] + sum(numbers, i+1);
    } else {
        return 0;
    }
}

function countPersonCharacteristics(people: Person[]) {
    let countFemale = 0;
    let maxAge = 0;
    let minAge = 99;
    let countMarried = 0;
    for (
        const person of people
    ) {
        if (person.isFemale) { ++countFemale; }
        if (person.age > maxAge) { maxAge = person.age; }
        if (person.age < minAge) { minAge = person.age; }
        if (person.isMarried) { ++countMarried; }
    }
    return { maxAge, minAge, countFemale, countMarried };
}

interface StatisticProps { peopleForStatistics: Person[] }
class Statistic extends React.Component<StatisticProps> {
    render() {
        const stats = countPersonCharacteristics(this.props.peopleForStatistics);
        return <div>
            <p>Oldest person is {stats.maxAge} years old.</p>
            <p>Youngest person is {stats.minAge} years old.</p>
            <p>There are {stats.countMarried} married citizen.</p>
            <p>There are {stats.countFemale} female citizen.</p>
        </div>;
    }
}

interface CityProps { peopleOfCity: Person[] }
interface CityState { dynamicPeople: Person[] }
class City extends React.Component<CityProps, CityState> {
    state = { dynamicPeople: this.props.peopleOfCity }
    render() {
        return <div>
            <h1>Enter your personal details <div><PersonEditor whenNewPersonCreated={person => {
                this.setState({ dynamicPeople: this.state.dynamicPeople.concat(person) })
            }} personForEditing={defaultPersonForEditor} /></div></h1>
            <h1>Neighbourhood: <div> <Neighbourhood peopleOfNeighbourhood={this.state.dynamicPeople} /></div></h1>
            <h1>Statistic: <div><Statistic peopleForStatistics={this.state.dynamicPeople} /></div></h1>
        </div>
    }
}

function showCity() {
    const rootElement = document.getElementById('root');
    ReactDOM.render(<City peopleOfCity={all} />, rootElement);
}
window.onload = showCity;