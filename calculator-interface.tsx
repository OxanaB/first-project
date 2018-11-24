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
