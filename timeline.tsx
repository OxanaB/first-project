import { map, getTodayDate, formatDateTime, colors, increment } from "./utils";
import * as React from "react";
import { Interval } from "./et-arrays";

export interface TimeLineProps {
    intervals: Interval[];
    time: Date;
}

export class TimeLine extends React.Component<TimeLineProps> {
    render() {
        const hours = this.props.time.getHours();
        const minutes = this.props.time.getMinutes();
        let lastY = hours*60 + minutes;
        let lastTime = this.props.time.getTime();
        let totalIndex = 0;
        
        const currentTime = getTodayDate();
        // const ms = currentTime.getTime();
        // const now = (ms - this.props.time.getTime()) / 60000;
        const now = currentTime.getHours()*60 + currentTime.getMinutes();

        const fullDay = 1440;
        return <div className='time-line'>
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="1440" >
                {map(this.props.intervals, (intervals) => {
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
                    const translate = "translate(50, " + y + ")";
                    return <g transform={translate}>
                        <rect x={0} y={0} width="300" height={min} style={{ fill: colors[index] }} />
                        <text x={0} y={0} dy={11} dx={2} style={{ fontSize: '12px' }}>Time: {intBeginingTimeFormated}</text>
                    </g>;
                })}
                <line x1={35} y1={0} x2={35} y2={fullDay} stroke={'grey'} strokeWidth={1} />
                {increment(60, 0, 25, (at, i) => {
                    return <>
                        <line x1={0} y1={at} x2={350} y2={at} stroke={'grey'} strokeWidth={1} />
                        <text x={30} y={at} dy={11} textAnchor="end" style={{ fill: 'grey', fontSize: '12px' }}>{i + ':00'}</text>
                    </>
                })}
                <>
                    <line x1={0} y1={now} x2={350} y2={now} stroke={'red'} strokeWidth={3} />
                    <text x={250} y={now} dy={11} textAnchor="end" style={{ fill: 'red', fontSize: '12px' }}>Current time: {formatDateTime(currentTime)}</text>
                </>
            </svg>
        </div>
    }
}