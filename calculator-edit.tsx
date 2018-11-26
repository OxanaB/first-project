interface CalculatorEditProps {
    intervals: Interval[];
    isInEditMode: boolean;
    isNewIntervalToAdd: boolean;
    intervalNewAdd: IntervalNewAddProps;
    time: Date;
    what: string;
    departureOrArrivalTime: Date;
    whenTimeIsEntered: (enteredTime: Date, what: string) => void;
    whenNewIntervalToAdd: (isNewIntervalToAdd: boolean) => void;
    whenIntervalEditingFinished: (newEditedInterval: Interval) => void;
    whenIntervalEditingStarted: (intervalKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
    whenButtonUpIsPushed: (intervalStringKey: string) => void;
    whenButtonDownIsPushed: (intervalStringKey: string) => void;
    whenSwitchMode: (isInEditMode: boolean) => void;
}
class CalculatorEdit extends React.Component<CalculatorEditProps> {
    render() {
        const intervalTimes = this.props.intervals.map(interval => { return interval.intTime });
        const totalMinutes = sum(intervalTimes, 0);
        const restMinutes = totalMinutes % 60;
        const spentHours = (totalMinutes - restMinutes) / 60;
        const totalSpend = spentHours + " hours " + restMinutes + " minutes";

        return <div className="page">
            <div className="horisontal-nav">
                <div className="link-to-next-page">
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.props.whenSwitchMode(false);
                    }}>View mode</a>
                </div>
            </div>
            <header><h1>Duration calculator</h1></header>
            <div className="time">
                <Time time={getTodayDate()} whenTimeIsEntered={(time, what) => {
                    this.props.whenTimeIsEntered(time, what)
                }} />
            </div>
            <div className="menu-edit-interval">
                <h2>My task list in time intervals:</h2>
                {
                    this.props.isNewIntervalToAdd
                        ? <IntervalNewAdd {...this.props.intervalNewAdd} />
                        : null
                }
                <button onClick={() => {
                    this.props.whenNewIntervalToAdd(true);
                }}>Add new</button>
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
            <div className="footer">
                {this.props.what === 'Departure time' ? 'I will finish / arrive at' : 'I need to get start at'} <strong>{formatDateTime(this.props.departureOrArrivalTime)}</strong>
                <p>and will spend {totalSpend}</p>
            </div>
        </div>
    }
}
