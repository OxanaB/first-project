import * as React from "react";
import { Interval } from "./et-arrays";

export interface IntervalEditInterfaceProps {
    interval: Interval;
    whenEditingFinished: (changedInterval: Interval) => void;
    whenIntervalToGoUp: (intervalToUpKey: string) => void;
    whenIntervalToGoDown: (intervalToDownKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
}
export interface IntervalEditInterfaceState {
    intNameChanged: string;
    intTimeChanged: string;
}
export class IntervalEditInterface extends React.Component<IntervalEditInterfaceProps, IntervalEditInterfaceState> {
    state = {
        intNameChanged: this.props.interval.intName,
        intTimeChanged: this.props.interval.intTime.toString(),
    }
    render() {
        const interval = this.props.interval;
        return <div className="editing-container">
            <div>
                <input className="intup-style-text" type="text"
                    value={this.state.intNameChanged}
                    onChange={e => {
                        this.setState({ intNameChanged: e.currentTarget.value });
                    }}
                    onKeyDown={({ keyCode }) => {
                        if (keyCode === 13) {const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);

                            const interval: Interval = {
                                intName: this.state.intNameChanged,
                                intTime: intTimeNumber,
                                isOnEditing: false,
                                key: this.props.interval.key
                            };
                            this.props.whenEditingFinished(interval);
                    } else null
                }}
                />
                <input className="intup-style-number" type="text"
                    value={this.state.intTimeChanged}
                    onChange={e => {
                        this.setState({ intTimeChanged: e.currentTarget.value });
                    }}
                    onKeyDown={({ keyCode }) => {
                        if (keyCode === 13) {const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);

                            const interval: Interval = {
                                intName: this.state.intNameChanged,
                                intTime: intTimeNumber,
                                isOnEditing: false,
                                key: this.props.interval.key
                            };
                            this.props.whenEditingFinished(interval);
                    } else null
                }}
                /></div>
            <div className="icon-buttons-container">
                <div className="arrows">
                    <button className="icon-button arrow-up" onClick={() => {
                        this.props.whenIntervalToGoUp(interval.key);
                    }}></button>
                    <button className="icon-button arrow-down" onClick={() => {
                        this.props.whenIntervalToGoDown(interval.key);
                    }}></button></div>
                <div className="actions">
                    <button className="icon-button done"
                        onClick={() => {
                            const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);

                            const interval: Interval = {
                                intName: this.state.intNameChanged,
                                intTime: intTimeNumber,
                                isOnEditing: false,
                                key: this.props.interval.key
                            };
                            this.props.whenEditingFinished(interval);
                        }}
                        ></button>
                    <button className="icon-button delete" onClick={() => {
                        this.props.whenOldIntervalToDelete(interval.key);
                    }}></button></div>

            </div>
        </div>
    }
}
export interface ButtonEditProps {
    interval: Interval;
    whenOldIntervalToEdit: (intervalToEditKey: string) => void;
}
export class ButtonEdit extends React.Component<ButtonEditProps> {
    render() {
        const interval = this.props.interval;
        return <>
            <button className="button-edit" onClick={() => {
                this.props.whenOldIntervalToEdit(interval.key);
            }}></button></>
    }
}