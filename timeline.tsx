import { map, getTodayDate, formatDateTime, colors, increment, sum } from "./utils";
import * as React from "react";
import { Interval } from "./et-arrays";
import { number } from "prop-types";

export interface TimeLineProps {
    intervals: Interval[];
    time: Date;
    departureOrArrivalTime: Date;
    what: string;
}
export interface TimeLineState {
    width: number;
    height: number;
}
export class TimeLine extends React.Component<TimeLineProps, TimeLineState> {

    private svgElement: SVGSVGElement | null = null;

    state = {
        width: 400,
        height: 800,
    };

    render() {
        const k = 1; // zoom-coefficient 

        const initialHoursDeparture = this.props.time.getHours();
        const initialHoursArrival = this.props.departureOrArrivalTime.getHours();
        const minutes = this.props.time.getMinutes();
        let lastY = minutes;
        let lastTime = this.props.time.getTime();
        let lastTimeArriaval = this.props.departureOrArrivalTime.getTime();
        let lastYArrival = this.props.departureOrArrivalTime.getMinutes();
        let totalIndex = 0;

        const currentTime = getTodayDate();
        const ms = currentTime.getTime();
        const now = (ms - this.props.time.getTime()) / 60000 * k;
        const nowArrival = (ms - this.props.departureOrArrivalTime.getTime()) / 60000 * k;
        // const now = currentTime.getHours() + currentTime.getMinutes();

        const intervalTimes = map(this.props.intervals, interval => { return interval.intTime });
        const totalMinutes = sum(intervalTimes);
        const end = totalMinutes * k + lastY;
        const start = lastYArrival;

        const fullDay = this.state.height;
        const width = this.state.width;
        // width="400" height="1440"
        return <div className='time-line'>
            {this.props.what === 'Departure time' ?
                <svg xmlns="http://www.w3.org/2000/svg" className="viewport" ref={(svgElement) => {
                    this.svgElement = svgElement;
                }}>
                    {map(this.props.intervals, (intervals) => {
                        const y = lastY;
                        const min = intervals.intTime * k;
                        lastY = lastY + min;

                        totalIndex = totalIndex + 1;
                        const index = totalIndex % colors.length;

                        const name = intervals.intName;
                        const intLengthMs = intervals.intTime * 60 * 1000;
                        const totalMs = lastTime;
                        lastTime = lastTime + intLengthMs;
                        const intBeginingTime = new Date(totalMs);
                        const intBeginingTimeFormated = formatDateTime(intBeginingTime);
                        
                        const translate = "translate(50, " + y + ")";
                        return <g transform={translate}>
                            <rect x={0} y={0} width={width} height={min} style={{ fill: colors[index] }} />
                            <text x={0} y={0} dy={11} dx={2} style={{ fontSize: '12px' }}>{name}: {intBeginingTimeFormated}</text>
                        </g>;
                    })}
                    <line x1={35} y1={0} x2={35} y2={fullDay} stroke={'grey'} strokeWidth={1} />
                    {increment(60 * k, 0, 25, (at, i) => {
                        const hours = i + initialHoursDeparture;
                        const scaleHours = hours % 24;
                        return <>
                            <line x1={0} y1={at} x2={width} y2={at} stroke={'grey'} strokeWidth={1} />
                            <text x={30} y={at} dy={11} textAnchor="end" style={{ fill: 'grey', fontSize: '12px' }}>{scaleHours + ':00'}</text>
                        </>
                    })}
                    <>
                        <line x1={0} y1={now} x2={width} y2={now} stroke={'blue'} strokeWidth={1} />
                        <text x={width} y={now} dy={11} textAnchor="end" style={{ fill: 'blue', fontSize: '12px' }}>Current time: {formatDateTime(currentTime)}</text>
                        <line x1={0} y1={end} x2={width} y2={end} stroke={'black'} strokeWidth={1} />
                        <text x={width} y={end} dy={11} textAnchor="end" style={{ fill: 'black', fontSize: '12px' }}>Arrival time: {formatDateTime(this.props.departureOrArrivalTime)}</text>
                    </>
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="viewport" ref={(svgElement) => { 
                    this.svgElement = svgElement;
                }}>
                    {map(this.props.intervals, (intervals) => {
                        const y = lastYArrival;
                        const min = intervals.intTime * k;
                        lastYArrival = lastYArrival + min;

                        totalIndex = totalIndex + 1;
                        const index = totalIndex % colors.length;

                        const name = intervals.intName;
                        const intLengthMs = intervals.intTime * 60 * 1000;
                        const totalMs = lastTimeArriaval;
                        lastTimeArriaval = lastTimeArriaval + intLengthMs;
                        const intBeginingTime = new Date(totalMs);
                        const intBeginingTimeFormated = formatDateTime(intBeginingTime);
                        const translate = "translate(50, " + y + ")";
                        return <g transform={translate}>
                            <rect x={0} y={0} width={width} height={min} style={{ fill: colors[index] }} />
                            <text x={0} y={0} dy={11} dx={2} style={{ fontSize: '12px' }}>{name}: {intBeginingTimeFormated}</text>
                        </g>;
                    })}
                    <line x1={35} y1={0} x2={35} y2={fullDay} stroke={'grey'} strokeWidth={1} />
                    {increment(60 * k, 0, 25, (at, i) => {
                        const hours = i + initialHoursArrival;
                        const scaleHours = hours % 24;
                        return <>
                            <line x1={0} y1={at} x2={width} y2={at} stroke={'grey'} strokeWidth={1} />
                            <text x={30} y={at} dy={11} textAnchor="end" style={{ fill: 'grey', fontSize: '12px' }}>{scaleHours + ':00'}</text>
                        </>
                    })}
                    <>
                        <line x1={0} y1={nowArrival} x2={width} y2={nowArrival} stroke={'blue'} strokeWidth={1} />
                        <text x={width} y={nowArrival} dy={11} textAnchor="end" style={{ fill: 'blue', fontSize: '12px' }}>Current time: {formatDateTime(currentTime)}</text>
                        <line x1={0} y1={start} x2={width} y2={start} stroke={'black'} strokeWidth={1} />
                        <text x={width} y={start} dy={11} textAnchor="end" style={{ fill: 'black', fontSize: '12px' }}>Need to start: {formatDateTime(this.props.departureOrArrivalTime)}</text>
                    </>
                </svg>
            }
        </div>
    }
    componentDidMount() {
        const rect = this.svgElement!.getBoundingClientRect();
        console.log(rect);
        this.setState({ width: rect.width, height: rect.height });
    }
}