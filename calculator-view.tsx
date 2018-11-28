import * as React from "react";
import { TimeLine } from "./timeline";
import { Interval } from "./et-arrays";

export interface CalculatorViewProps {
    intervals: Interval[];
    time: Date;
    whenSwitchMode: (isInEditMode: boolean) => void;
}
export class CalculatorView extends React.Component<CalculatorViewProps> {
    render() {
        return <>
            <div className="page">
                
                    <div className="link-to-previous-page">
                        <a href="" onClick={e => {
                            e.preventDefault();
                            this.props.whenSwitchMode(true);
                        }}>Edit mode</a>
                    </div>
                
                <div className="time-line">
                    <TimeLine time={this.props.time}
                        intervals={this.props.intervals}
                    />
                </div>
            </div>
        </>
    }
}

