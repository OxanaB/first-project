interface IntervalNewAddProps {
    intName: string;
    intTime: string;
    whenNameChanged: (newName: string) => void;
    whenTimeChanged: (newTime: string) => void;
    whenNewIntervalAdded: (newInterval: Interval) => void;
}
class IntervalNewAdd extends React.Component<IntervalNewAddProps> {
    render() {
        const intNameEntered = this.props.intName;
        const intTimeEntered = this.props.intTime;

        return <div className="interval-add">
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
                onKeyDown={({keyCode}) => {
                    if (keyCode === 13) {
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
                    }
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
    }
}