
// interface TimeDetailsProps { timeToEnter: TimeDetailsState }
// interface TimeDetailsState {
//     timeToBeOnPlaceHours: string;
//     timeToBeOnPlaceMinutes: string;
//     timeToGetToPlaceHours: string;
//     timeToGetToPlaceMinutes: string;
// }
// class TimeDetails extends React.Component<TimeDetailsProps, TimeDetailsState> {
//     state = {
//         ...this.props.timeToEnter
//     };
//     render() {
//         const timeToBeOnPlaceHoursEntered = this.state.timeToBeOnPlaceHours;
//         const timeToBeOnPlaceMinutesEntered = this.state.timeToBeOnPlaceMinutes;
//         const timeToGetToPlaceHoursEntered = this.state.timeToGetToPlaceHours;
//         const timeToGetToPlaceMinutesEntered = this.state.timeToGetToPlaceMinutes;
//         return <table>
//             <tr>Enter time you need to be on place
//                 <input type="text"
//                     value={timeToBeOnPlaceHoursEntered}
//                     onChange={event => {
//                         this.setState({ timeToBeOnPlaceHours: event.currentTarget.value })
//                     }} /> hours
//                 <input type="text"
//                     value={timeToBeOnPlaceMinutesEntered}
//                     onChange={event => {
//                         this.setState({ timeToBeOnPlaceMinutes: event.currentTarget.value })
//                     }} /> minutes</tr>
//             <tr>Enter time you need to get to the place
//                 <input type="text"
//                     value={timeToGetToPlaceHoursEntered}
//                     onChange={event => {
//                         this.setState({ timeToGetToPlaceHours: event.currentTarget.value })
//                     }} /> hours
//                 <input type="text"
//                     value={timeToGetToPlaceMinutesEntered}
//                     onChange={event => {
//                         this.setState({ timeToGetToPlaceMinutes: event.currentTarget.value })
//                     }} /> minutes </tr>
//             <tr><button onClick={() => {
//                 const timeToCount = this.state;
//                 const timeToBeOnPlaceHours = parseInt(timeToCount.timeToBeOnPlaceHours);
//                 const timeToBeOnPlaceMinutes = parseInt(timeToCount.timeToBeOnPlaceMinutes);
//                 const timeToGetToPlaceHours = parseInt(timeToCount.timeToGetToPlaceHours);
//                 const timeToGetToPlaceMinutes = parseInt(timeToCount.timeToGetToPlaceMinutes);

//                 const timeToBeOnPlace = new Date();
//                 timeToBeOnPlace.setMinutes(timeToBeOnPlaceMinutes);
//                 timeToBeOnPlace.setHours(timeToBeOnPlaceHours);

//                 const deltaMs = timeToGetToPlaceHours * 60 * 60 * 1000 + timeToGetToPlaceMinutes * 60 * 1000;
//                 const result = new Date(timeToBeOnPlace.getTime() - deltaMs);

//                 console.log(result);
//             }} >Enter details</button></tr>
//         </table>

//     }
// }
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
interface ExistingAndNewIntervalsProps {
    intName: string;
    intTime: number;
    staticIntervals: Interval[];
}
interface ExistingAndNewIntervalsState {
    intName: string;
    intTime: string;
    dynamicIntervals: Interval[];
}
class ExistingAndNewIntervals extends React.Component<ExistingAndNewIntervalsProps, ExistingAndNewIntervalsState> {
    state = {
        intName: this.props.intName,
        intTime: this.props.intTime.toString(),
        dynamicIntervals: this.props.staticIntervals,
    };
    render() {
        const intNameEntered = this.state.intName;
        const intTimeEntered = this.state.intTime;
        return <>
            <div>
                Enter your interval name<input type="text"
                    value={intNameEntered}
                    onChange={event =>
                        this.setState({ intName: event.currentTarget.value })} />
                and time <input type="text"
                    value={intTimeEntered}
                    onChange={event =>
                        this.setState({ intTime: event.currentTarget.value })} />
            </div>
            <div>
                <button onClick={() => {
                    const intervalKey = getKeyRandom();
                    const intervalName = this.state.intName;
                    const intervalEntered = this.state.intTime;
                    const intervalTimeNumber = parseInt(intervalEntered);
                    const interval = {
                        key: intervalKey,
                        intName: intervalName,
                        intTime: intervalTimeNumber,
                    };
                    this.setState({ dynamicIntervals: this.state.dynamicIntervals.concat(interval) })
                }}>Enter</button>
            </div>
            <div>
                {this.state.dynamicIntervals.map(interval => <div>
                    {interval.intName + ': ' + interval.intTime}
                    <button onClick={() => {
                        const dynamicIntervalsWithoutCurrrentOne = this.state.dynamicIntervals.filter(
                            otherInterval => otherInterval.key !== interval.key
                        );
                        this.setState({ dynamicIntervals: dynamicIntervalsWithoutCurrrentOne });

                    }}>Delete</button>
                </div>)}
                <div>
                    <button onClick={() => {
                        const intervalTimes = this.state.dynamicIntervals.map(interval => interval.intTime);
                        const totalTime = sum(intervalTimes, 0);
                        alert(totalTime);
                    }}>Count time</button>
                </div>
            </div>
        </>
    }
}


interface TimeToCountProps { eachInterval: Interval[] }
class TimeToCount extends React.Component<TimeToCountProps> {
    render() {
        return <></>
    }
}

function showTaskImplemetation() {
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <>
            <ExistingAndNewIntervals
                intName="xxx"
                intTime={111}
                staticIntervals={intervals}
            />
            <TimeToCount eachInterval={intervals} />
        </>,
        rootElement);

    // <TimeDetails timeToEnter={{ timeToBeOnPlaceHours: '1', timeToBeOnPlaceMinutes: '10', timeToGetToPlaceHours: '0', timeToGetToPlaceMinutes: '20' }} />,
}
window.onload = showTaskImplemetation;
