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
        what: 'Departure time',
    }
    render() {
        return <>
            Time of <select id="time" onChange={e => {
                this.setState({ what: e.currentTarget.value });
            }}>
                <option selected value="Departure time">departure</option>
                <option value="Arrival time">arrival</option>
            </select> is <input type="text" className="intup-style-number"
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
                }}

            />
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