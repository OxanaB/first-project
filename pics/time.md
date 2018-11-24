
interface TimeDetailsProps { timeToEnter: TimeDetailsState }
interface TimeDetailsState {
        timeToBeOnPlaceHours: string;
    timeToBeOnPlaceMinutes: string;
    timeToGetToPlaceHours: string;
    timeToGetToPlaceMinutes: string;
}
class TimeDetails extends React.Component<TimeDetailsProps, TimeDetailsState> {
        state = {
            ...this.props.timeToEnter
    };
    render() {
            const timeToBeOnPlaceHoursEntered = this.state.timeToBeOnPlaceHours;
        const timeToBeOnPlaceMinutesEntered = this.state.timeToBeOnPlaceMinutes;
        const timeToGetToPlaceHoursEntered = this.state.timeToGetToPlaceHours;
        const timeToGetToPlaceMinutesEntered = this.state.timeToGetToPlaceMinutes;
        return <table>
            <tr>Enter time you need to be on place
                <input type="text"
                    value={timeToBeOnPlaceHoursEntered}
                    onChange={event => {
                            this.setState({ timeToBeOnPlaceHours: event.currentTarget.value })
                    }} /> hours
                <input type="text"
                    value={timeToBeOnPlaceMinutesEntered}
                    onChange={event => {
                            this.setState({ timeToBeOnPlaceMinutes: event.currentTarget.value })
                    }} /> minutes</tr>
            <tr>Enter time you need to get to the place
                <input type="text"
                    value={timeToGetToPlaceHoursEntered}
                    onChange={event => {
                            this.setState({ timeToGetToPlaceHours: event.currentTarget.value })
                    }} /> hours
                <input type="text"
                    value={timeToGetToPlaceMinutesEntered}
                    onChange={event => {
                            this.setState({ timeToGetToPlaceMinutes: event.currentTarget.value })
                    }} /> minutes </tr>
            <tr><button onClick={() => {
                    const timeToCount = this.state;
                const timeToBeOnPlaceHours = parseInt(timeToCount.timeToBeOnPlaceHours);
                const timeToBeOnPlaceMinutes = parseInt(timeToCount.timeToBeOnPlaceMinutes);
                const timeToGetToPlaceHours = parseInt(timeToCount.timeToGetToPlaceHours);
              const timeToGetToPlaceMinutes = parseInt(timeToCount.timeToGetToPlaceMinutes);
              const timeToBeOnPlace = new Date();
              timeToBeOnPlace.setMinutes(timeToBeOnPlaceMinutes);
              timeToBeOnPlace.setHours(timeToBeOnPlaceHours);
             const deltaMs = timeToGetToPlaceHours * 60 * 60 * 1000 + timeToGetToPlaceMinutes * 60 * 1000;
             const result = new Date(timeToBeOnPlace.getTime() - deltaMs)
             console.log(result);
         }} >Enter details</button></tr>
     </table
 }
}
 
<TimeDetails timeToEnter={{ timeToBeOnPlaceHours: '1', timeToBeOnPlaceMinutes: '10', timeToGetToPlaceHours: '0', timeToGetToPlaceMinutes: '20' }} />,