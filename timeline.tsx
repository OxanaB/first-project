import { map, getTodayDate, formatDateTime, colors } from "./utils";
import * as React from "react";
import { Interval } from "./et-arrays";

export interface TimeLineProps {
    intervals: Interval[];
    time: Date;
}

export class TimeLine extends React.Component<TimeLineProps> {
    render() {
        let lastY = 0;
        let lastTime = this.props.time.getTime();
        let totalIndex = 0;

        const currentTime = getTodayDate();
        const ms = currentTime.getTime();
        const now = (ms - this.props.time.getTime()) / 60000;
        return <>
            <svg xmlns="http://www.w3.org/2000/svg" width="350" height="150" >
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
                    const translate = "translate(0, " + y + ")";
                    return <g transform={translate}>
                        <rect x={0} y={0} width="100" height={min} style={{ fill: colors[index] }} />
                        <text x={0} y={0} dy={11} dx={2} style={{ fontSize: '12px' }}>Time: {intBeginingTimeFormated}</text>
                    </g>;
                })}
                <g>
                <line x1={0} y1={now} x2={100} y2={now} stroke={'red'} strokeWidth={3} />
                <text x={100} y={now} dy={11} textAnchor="end" style={{ fill: 'red', fontSize: '12px' }}> {formatDateTime(currentTime)}</text>
                </g>
            </svg>
        </>
    }
}