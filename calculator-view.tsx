import * as React from "react";
import { TimeLine } from "./timeline";
import { Interval } from "./et-arrays";

export interface CalculatorViewProps {
    intervals: Interval[];
    time: Date;
    departureOrArrivalTime: Date;
    what: string;
    whenSwitchMode: (isInEditMode: boolean) => void;
}
export class CalculatorView extends React.Component<CalculatorViewProps> {
    render() {
        return <>
            <div className="view-page">
                <div className="time-line">
                    <TimeLine
                        what={this.props.what}
                        departureOrArrivalTime={this.props.departureOrArrivalTime}
                        time={this.props.time}
                        intervals={this.props.intervals}
                    />
                </div>
                    <div className="link-to-edit-mode">
                        <a href="" onClick={e => {
                            e.preventDefault();
                            this.props.whenSwitchMode(true);
                        }}>back to edit</a>
                    </div>
            </div>
        </>
    }
}

