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