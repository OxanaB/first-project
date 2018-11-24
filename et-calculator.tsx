interface TimeProps {
    time: Date;
    whenTimeIsEntered: (enteredTime: Date, what: string) => void;
}
interface TimeState {
    timeText: string;
    what: string;

}
class Time extends React.Component<TimeProps, TimeState> {
    state = {
        timeText: this.props.time.getHours() + ":" + this.props.time.getMinutes(),
        what: 'Arrival time',
    }
    render() {
        return <>
            I need to <select id="time" onChange={e => {
                this.setState({ what: e.currentTarget.value });
            }}>
                <option selected value="Departure time">start</option>
                <option value="Arrival time">finish</option>
            </select> at <input type="text" className="intup-style-number"
                value={this.state.timeText}
                onChange={e => {
                    this.setState({ timeText: e.currentTarget.value });
                    const time = e.currentTarget.value.toString();

                    if (time.length === 3) {
                        const matchedOption = /(\d{1}):?(\d{1,2})/.exec(time);
                        if (matchedOption !== null) {
                            const [, hoursText, minutesText] = matchedOption;
                            const hours = parseInt(hoursText);
                            const minutes = parseInt(minutesText);
                            const now = new Date();
                            now.setHours(hours);
                            now.setMinutes(minutes);
                            return this.props.whenTimeIsEntered(now, this.state.what);
                        }
                    } else {
                        const matched = /(\d{1,2}):?(\d{1,2})/.exec(time);
                        if (matched !== null) {
                            const [, hoursText, minutesText] = matched;
                            const hours = parseInt(hoursText);
                            const minutes = parseInt(minutesText);
                            const now = new Date();
                            now.setHours(hours);
                            now.setMinutes(minutes);
                            return this.props.whenTimeIsEntered(now, this.state.what);
                        }
                    }
                }} />
            <button className="icon-button done" id="top"
                onClick={() => {
                    const time = this.state.timeText.toString();
                    if (time.length == 3) {
                        const matched = /(\d{1}):?(\d{1,2})/.exec(time);
                        if (matched !== null) {
                            const [, hoursText, minutesText] = matched;
                            const hours = parseInt(hoursText);
                            const minutes = parseInt(minutesText);
                            const now = new Date();
                            now.setHours(hours);
                            now.setMinutes(minutes);
                            return this.props.whenTimeIsEntered(now, this.state.what);
                        } else { return null }
                    }
                    else {
                        const matched = /(\d{1,2}):?(\d{1,2})/.exec(time);
                        if (matched !== null) {
                            const [, hoursText, minutesText] = matched;
                            const hours = parseInt(hoursText);
                            const minutes = parseInt(minutesText);
                            const now = new Date();
                            now.setHours(hours);
                            now.setMinutes(minutes);
                            return this.props.whenTimeIsEntered(now, this.state.what);
                        };
                    }
                }}></button>
        </>
    }
}

interface TimeLineProps {
    intervals: Interval[];
    time: Date;
}
interface TimeLineState {

}
class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
    render() {
        let lastY = 0;
        let lastTime = this.props.time.getTime();
        let totalIndex = 0;
        return <>
            <svg xmlns="http://www.w3.org/2000/svg" width="350" height="150" >
                {this.props.intervals.map((intervals) => {
                    const y = lastY;
                    const min = intervals.intTime;
                    lastY = lastY + min;

                    totalIndex = totalIndex + 1;
                    const index = totalIndex % colors.length;

                    const intLengthMs = intervals.intTime * 60 * 1000;
                    const totalMs = lastTime;
                    lastTime = lastTime + intLengthMs;
                    const intBeginingTime = new Date(totalMs);
                    const intBeginingTimeFormated = formatDateTime(intBeginingTime);
                    return <>
                        <rect x={0} y={y} width="100" height={min} style={{ fill: colors[index] }} />
                        <text x={0} y={y + 10} style={{ fontSize: '12px' }}>Time: {intBeginingTimeFormated}</text>
                    </>;
                })}
            </svg>
        </>
    }
}

interface ButtonEditProps {
    interval: Interval;
    whenOldIntervalToEdit: (intervalToEditKey: string) => void;
}
class ButtonEdit extends React.Component<ButtonEditProps> {
    render() {
        const interval = this.props.interval;
        return <>
            <button className="button-edit" onClick={() => {
                this.props.whenOldIntervalToEdit(interval.key);
            }}></button></>
    }
}

interface IntervalEditInterfaceProps {
    interval: Interval;
    whenEditingFinished: (changedInterval: Interval) => void;
    whenIntervalToGoUp: (intervalToUpKey: string) => void;
    whenIntervalToGoDown: (intervalToDownKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
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
        const interval = this.props.interval;
        return <div className="editing-container">
            <div>
                <input className="intup-style-text" type="text"
                    value={this.state.intNameChanged}
                    onChange={e => {
                        this.setState({ intNameChanged: e.currentTarget.value });
                    }}
                />
                <input className="intup-style-number" type="text"
                    value={this.state.intTimeChanged}
                    onChange={e => {
                        this.setState({ intTimeChanged: e.currentTarget.value });
                    }}
                /></div>
            <div className="icon-buttons-container">
                <div className="arrows"><button className="icon-button arrow-up" onClick={() => {
                    this.props.whenIntervalToGoUp(interval.key);
                }}></button>
                    <button className="icon-button arrow-down" onClick={() => {
                        this.props.whenIntervalToGoDown(interval.key);
                    }}></button></div>
                <div className="actions"><button className="icon-button done" onClick={() => {
                    const intTimeNew = this.state.intTimeChanged;
                    const intTimeNumber = parseInt(intTimeNew);

                    const interval: Interval = {
                        intName: this.state.intNameChanged,
                        intTime: intTimeNumber,
                        isOnEditing: false,
                        key: this.props.interval.key
                    };
                    this.props.whenEditingFinished(interval);
                }}></button>
                    <button className="icon-button delete" onClick={() => {
                        this.props.whenOldIntervalToDelete(interval.key);
                    }}></button></div>

            </div>
        </div>
    }
}

interface CalculatorInterfaceProps {
    intName: string;
    intTime: string;
    intervals: Interval[];
    time: Date;
    what: string;
    departureOrArrivalTime: Date;
    whenTimeIsEntered: (enteredTime: Date, what: string) => void;
    whenNameChanged: (newName: string) => void;
    whenTimeChanged: (newTime: string) => void;
    whenNewIntervalAdded: (newInterval: Interval) => void;
    whenIntervalEditingFinished: (newEditedInterval: Interval) => void;
    whenIntervalEditingStarted: (intervalKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
    whenButtonUpIsPushed: (intervalStringKey: string) => void;
    whenButtonDownIsPushed: (intervalStringKey: string) => void;
}
class CalculatorInterface extends React.Component<CalculatorInterfaceProps> {
    render() {
        const intNameEntered = this.props.intName;
        const intTimeEntered = this.props.intTime;

        const intervalTimes = this.props.intervals.map(interval => { return interval.intTime });
        const totalMinutes = sum(intervalTimes, 0);
        const restMinutes = totalMinutes % 60;
        const spentHours = (totalMinutes - restMinutes) / 60;
        const totalSpend = spentHours + " hours " + restMinutes + " minutes";

        return <div className="page">
            <header><h1>Duration calculator</h1></header>
            <div className="time">
                <Time time={getTodayDate()} whenTimeIsEntered={(time, what) => {
                    this.props.whenTimeIsEntered(time, what)
                }} />
            </div>

            <div className="interval-add">
                I will spend <input type="text" className="intup-style-text"
                    value={intNameEntered}
                    onChange={event => {
                        this.props.whenNameChanged(event.currentTarget.value)
                    }}
                />
                <input type="text" className="intup-style-number"
                    value={intTimeEntered}
                    onChange={event => {
                        this.props.whenTimeChanged(event.currentTarget.value)
                    }}
                /> minutes
                <button className='icon-button enter'
                    onClick={() => {
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
                    }}></button>
            </div>
            <div className="menu-edit-interval">
                <h2>My task list in time intervals:</h2>
                {this.props.intervals.map(interval => {
                    if (interval.isOnEditing) {
                        return <IntervalEditInterface
                            interval={interval}
                            whenEditingFinished={(interval) => {
                                this.props.whenIntervalEditingFinished(interval);
                            }}
                            whenOldIntervalToDelete={(interval) => {
                                this.props.whenOldIntervalToDelete(interval);
                            }}
                            whenIntervalToGoDown={(intervalStringKey) => {
                                this.props.whenButtonDownIsPushed(intervalStringKey);
                            }}
                            whenIntervalToGoUp={(intervalStringKey) => {
                                this.props.whenButtonUpIsPushed(intervalStringKey);
                            }}
                        />;
                    } else {
                        return <div className="interval-container">
                            <div className='interval-string'>{interval.intTime + ' min ' + interval.intName}</div>
                            <ButtonEdit
                                interval={interval}
                                whenOldIntervalToEdit={(intervalKey) => {
                                    this.props.whenIntervalEditingStarted(intervalKey);
                                }}
                            />
                        </div>
                    }
                })}</div>
            <div className="time-line">
                <TimeLine time={this.props.time}
                    intervals={this.props.intervals}
                />
            </div>
            <div className="footer">
                {this.props.what === 'Departure time' ? 'I will finish / arrive at' : 'I need to get start at'} <strong>{formatDateTime(this.props.departureOrArrivalTime)}</strong>
                <p>and will spend {totalSpend}</p>
            </div>
        </div>
    }
}

function DayTimeCalculator() {
    const rootElement = document.getElementById('root');

    let oldProps: CalculatorInterfaceProps = {
        intName: 'for driving to work',
        intTime: '15',
        intervals: intervals,
        time: new Date(),
        what: 'Arrival time',
        departureOrArrivalTime: new Date(),
        whenTimeIsEntered: (newTime, what) => {

            const intervalTimes = oldProps.intervals.map(interval => { return interval.intTime });
            const totalMinutes = sum(intervalTimes, 0);

            const departureOrArrivalTime = toCountTime(what, newTime, totalMinutes);

            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                time: newTime,
                what: what,
                departureOrArrivalTime: departureOrArrivalTime,
            };
            rerender(newProps);
        },
        whenNameChanged: (newName) => {
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intName: newName,
            };
            rerender(newProps);
        },
        whenTimeChanged: (newTime) => {
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intTime: newTime,
            };
            rerender(newProps);
        },
        whenNewIntervalAdded: (newInterval) => {
            const extendedIntervals = oldProps.intervals.concat(newInterval);
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: extendedIntervals,
            };
            rerender(newProps);
        },
        whenOldIntervalToDelete: (oldIntervalKey) => {
            const filteredIntervals = oldProps.intervals.filter(
                otherInterval => otherInterval.key !== oldIntervalKey
            );
            const newProps: CalculatorInterfaceProps = {
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
            const newProps: CalculatorInterfaceProps = {
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
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: editedIntervals,
            };
            rerender(newProps);
        },
        whenButtonDownIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
            if (index < intervals.length - 1) {
                const editedIntervals = swapInArray(oldProps.intervals, index, index + 1);
                const newProps: CalculatorInterfaceProps = {
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
                const newProps: CalculatorInterfaceProps = {
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

    function rerender(newProps: CalculatorInterfaceProps): void {
        console.log(newProps);
        oldProps = newProps;
        ReactDOM.render(
            <CalculatorInterface {...newProps} />,
            rootElement
        );
    }
}
window.onload = DayTimeCalculator;



function toCountTime(what: string, time: Date, totalMinutes: number): Date {
    if (what == "Arrival time") {
        const arrivalTimeInMs = time.getTime();
        const intervalTimeInMs = totalMinutes * 60 * 1000;
        const departureTimeInMs = arrivalTimeInMs - intervalTimeInMs;
        const departureTime = new Date(departureTimeInMs);
        return departureTime;
    } else {
        const departureTimeInMs = time.getTime();
        const intervalTimeInMs = totalMinutes * 60 * 1000;
        const arrivalTimeInMs = departureTimeInMs + intervalTimeInMs;
        const arrivalTime = new Date(arrivalTimeInMs);
        return arrivalTime;
    }
}