
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

interface IntervalEditInterfaceProps {
    interval: Interval;
    whenEditingFinished: (changedInterval: Interval) => void;
}
interface IntervalEditInterfaceState {
    intNameChanged: string;
    intTimeChanged: string;
}

class IntervalEditInterface extends React.Component<IntervalEditInterfaceProps, IntervalEditInterfaceState> {
    state = {
        intNameChanged: this.props.interval.intName,
        intTimeChanged: this.props.interval.intTime.toString(),
    }
    render() {
        const xxx = this.props.interval;
        return <div>
            Enter new name <input type="text"
                value={this.state.intNameChanged}
                onChange={e => {
                    this.setState({ intNameChanged: e.currentTarget.value });
                }}
            />
            new time<input type="text"
                value={this.state.intTimeChanged}
                onChange={e => {
                    this.setState({ intTimeChanged: e.currentTarget.value });
                }}
            />
            <button onClick={() => {
                const intTimeNew = this.state.intTimeChanged;
                const intTimeNumber = parseInt(intTimeNew);

                const interval: Interval = {
                    intName: this.state.intNameChanged,
                    intTime: intTimeNumber,
                    isOnEditing: false,
                    key: this.props.interval.key
                };
                this.props.whenEditingFinished(interval);
            }}>OK</button>
        </div>;
    }
}

interface ButtonsDeleteAndEditProps {
    interval: Interval;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
    whenOldIntervalToEdit: (intervalToEditKey: string) => void;
}

class ButtonsDeleteAndEdit extends React.Component<ButtonsDeleteAndEditProps> {
    render() {
        const interval = this.props.interval;
        return <><div>
            {interval.intName + ': ' + interval.intTime}
            <button onClick={() => {
                this.props.whenOldIntervalToDelete(interval.key);

            }}>Delete</button>
            <button onClick={() => {
                this.props.whenOldIntervalToEdit(interval.key);
            }}>Edit</button>
        </div ></>
    }
}

interface ButtonsUpAndDownProps {
    interval: Interval;
    whenIntervalToGoUp: (intervalToUpKey: string) => void;
    whenIntervalToGoDown: (intervalToDownKey: string) => void;
}
class ButtonsUpAndDown extends React.Component<ButtonsUpAndDownProps> {
    render() {
        const interval = this.props.interval;
        return <>
            <button onClick={() => {
                this.props.whenIntervalToGoUp(interval.key);
            }}>Up</button>
            <button onClick={() => {
                this.props.whenIntervalToGoDown(interval.key);
            }}>Down</button>
        </>
    }
}

interface ExistingAndNewIntervalsProps {
    intName: string;
    intTime: string;
    intervals: Interval[];
    whenNameChanged: (newName: string) => void;
    whenTimeChanged: (newTime: string) => void;
    whenNewIntervalAdded: (newInterval: Interval) => void;
    whenIntervalEditingFinished: (newEditedInterval: Interval) => void;
    whenIntervalEditingStarted: (intervalKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
    whenButtonUpIsPushed: (intervalStringKey: string) => void;
    whenButtonDownIsPushed: (intervalStringKey: string) => void;
}
class ExistingAndNewIntervals extends React.Component<ExistingAndNewIntervalsProps> {
    render() {
        const intNameEntered = this.props.intName;
        const intTimeEntered = this.props.intTime;

        const intervalTimes = this.props.intervals.map(interval => interval.intTime);
        const totalTime = sum(intervalTimes, 0);

        return <>
            <div>
                Enter your interval name<input type="text"
                    value={intNameEntered}
                    onChange={event => {
                        this.props.whenNameChanged(event.currentTarget.value)
                    }}
                />
                and time <input type="text"
                    value={intTimeEntered}
                    onChange={event => {
                        this.props.whenTimeChanged(event.currentTarget.value)
                    }}
                />
            </div>
            <div>
                <button onClick={() => {
                    const intervalKey = getKeyRandom();
                    const intervalName = this.props.intName;
                    const intervalEntered = this.props.intTime;
                    const intervalTimeNumber = parseInt(intervalEntered);
                    const interval: Interval = {
                        key: intervalKey,
                        intName: intervalName,
                        intTime: intervalTimeNumber,
                        isOnEditing: false,
                    };
                    this.props.whenNewIntervalAdded(interval)
                }}>Enter</button>
            </div>
            <div>
                {this.props.intervals.map(interval => {
                    if (interval.isOnEditing) {
                        return <IntervalEditInterface
                            interval={interval}
                            whenEditingFinished={(interval) => {
                                this.props.whenIntervalEditingFinished(interval);
                            }}
                        />;
                    } else {
                        return <><ButtonsDeleteAndEdit
                            interval={interval}
                            whenOldIntervalToDelete={(interval) => {
                                this.props.whenOldIntervalToDelete(interval);
                            }}
                            whenOldIntervalToEdit={(intervalKey) => {
                                this.props.whenIntervalEditingStarted(intervalKey);
                            }}
                        />
                            <ButtonsUpAndDown
                                interval={interval}
                                whenIntervalToGoDown={(intervalStringKey) => {
                                    this.props.whenButtonDownIsPushed(intervalStringKey);
                                }}
                                whenIntervalToGoUp={(intervalStringKey) => {
                                    this.props.whenButtonUpIsPushed(intervalStringKey);
                                }}
                            /></>;
                    }
                })}
                <div>
                    Your total time is {totalTime} minutes
                </div>
            </div>
        </>
    }
}

function showTaskImplemetation() {
    const rootElement = document.getElementById('root');

    let oldProps: ExistingAndNewIntervalsProps = {
        intName: 'new',
        intTime: '15',
        intervals: intervals,
        whenNameChanged: (newName) => {
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intName: newName,
            };
            rerender(newProps);
        },
        whenTimeChanged: (newTime) => {
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intTime: newTime,
            };
            rerender(newProps);
        },
        whenNewIntervalAdded: (newInterval) => {
            const extendedIntervals = oldProps.intervals.concat(newInterval);
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intervals: extendedIntervals,
            };
            rerender(newProps);
        },
        whenOldIntervalToDelete: (oldIntervalKey) => {
            const filteredIntervals = oldProps.intervals.filter(
                otherInterval => otherInterval.key !== oldIntervalKey
            );
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intervals: filteredIntervals,
            }
            rerender(newProps);
        },
        whenIntervalEditingStarted: (intervalKey) => {
            const editedIntervals = oldProps.intervals.map(
                otherInterval => {
                    if (otherInterval.key === intervalKey) {
                        return { ...otherInterval, isOnEditing: true };
                    } else {
                        return otherInterval;
                    }
                }
            );
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intervals: editedIntervals,
            }
            rerender(newProps);
        },
        whenIntervalEditingFinished: (newInterval) => {
            const editedIntervals = oldProps.intervals.map(
                oldInterval => {
                    if (oldInterval.key === newInterval.key) {
                        return newInterval;
                    } else {
                        return oldInterval;
                    }
                }
            );
            const newProps: ExistingAndNewIntervalsProps = {
                ...oldProps,
                intervals: editedIntervals,
            };
            rerender(newProps);
        },
        whenButtonDownIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
            if (index < intervals.length - 1) {
                const editedIntervals = swapInArray(oldProps.intervals, index, index + 1);
                const newProps: ExistingAndNewIntervalsProps = {
                    ...oldProps,
                    intervals: editedIntervals,
                };
                rerender(newProps);
            } else {
                null;
            }
        },
        whenButtonUpIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
            if (index !== 0) {
                const editedIntervals = swapInArray(oldProps.intervals, index, index - 1);
                const newProps: ExistingAndNewIntervalsProps = {
                    ...oldProps,
                    intervals: editedIntervals,
                };
                rerender(newProps);
            }
            else {
                null;
            }
        }
    };

    rerender(oldProps);

    function rerender(newProps: ExistingAndNewIntervalsProps): void {
        console.log(newProps);
        oldProps = newProps;
        ReactDOM.render(
            <ExistingAndNewIntervals {...newProps} />,
            rootElement
        );
    }

    // <TimeDetails timeToEnter={{ timeToBeOnPlaceHours: '1', timeToBeOnPlaceMinutes: '10', timeToGetToPlaceHours: '0', timeToGetToPlaceMinutes: '20' }} />,
}
window.onload = showTaskImplemetation;
