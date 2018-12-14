import * as React from "react";
import { Interval } from "./et-arrays";

export interface IntervalEditInterfaceProps {
    interval: Interval;
    when: (concern: IntervalToGoUp |
        IntervalToGoDown |
        OldIntervalToDelete |
        EditingFinished |
        ToCancelIntervalEdit) => void;
}

export interface IntervalToGoUp {
    about: 'interval-to-go-up';
    intervalKey: string;
}

export interface IntervalToGoDown {
    about: 'interval-to-go-down';
    intervalKey: string;
}

export interface OldIntervalToDelete {
    about: 'old-interval-to-delete';
    oldIntervalKey: string;
    
}

export interface EditingFinished {
    about: 'editing-finished';
    changedInterval: Interval;
}

export interface ToCancelIntervalEdit {
    about: 'to-cancel-interval-edit';
    intervalKeyToCancelEdit: string;
}

export interface IntervalEditInterfaceState {
    intNameChanged: string;
    intTimeChanged: string;
    isTimeValid: boolean;
}
export class IntervalEditInterface extends React.Component<IntervalEditInterfaceProps, IntervalEditInterfaceState> {
    state = {
        intNameChanged: this.props.interval.intName,
        intTimeChanged: this.props.interval.intTime.toString(),
        isTimeValid: true,
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
                        if (keyCode === 13) {
                            const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);

                            const interval: Interval = {
                                intName: this.state.intNameChanged,
                                intTime: intTimeNumber,
                                isOnEditing: false,
                                key: this.props.interval.key
                            };
                            this.props.when({ about: 'editing-finished', changedInterval: interval });
                        } else null
                    }}
                />
                <input className="intup-style-number" type="text"
                    value={this.state.intTimeChanged}
                    onChange={e => {
                        this.setState({ intTimeChanged: e.currentTarget.value });
                    }}
                    onKeyDown={({ keyCode }) => {
                        if (keyCode === 13) {
                            const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);
                            const isTimeValid = !isNaN(intTimeNumber);
                            this.setState({ isTimeValid });
                            if (isTimeValid) {
                                const interval: Interval = {
                                    intName: this.state.intNameChanged,
                                    intTime: intTimeNumber,
                                    isOnEditing: false,
                                    key: this.props.interval.key
                                };
                                this.props.when({ about: 'editing-finished', changedInterval: interval });
                            }
                        } else null
                    }}
                />
                {this.state.isTimeValid ? null : <div><i>Enter number in munites</i></div>}
            </div>
            <div className="icon-buttons-container">
                <div className="arrows">
                    <button className="icon-button arrow-up" onClick={() => {
                        this.props.when({ about: 'interval-to-go-up', intervalKey: interval.key });
                    }}></button>
                    <button className="icon-button arrow-down" onClick={() => {
                        this.props.when({ about: "interval-to-go-down", intervalKey: interval.key });
                    }}></button></div>
                <div className="actions">
                    <button className="icon-button done"
                        onClick={() => {
                            const intTimeNew = this.state.intTimeChanged;
                            const intTimeNumber = parseInt(intTimeNew);
                            const isTimeValid = !isNaN(intTimeNumber)
                            this.setState({ isTimeValid });
                            if (isTimeValid) {
                                const interval: Interval = {
                                    intName: this.state.intNameChanged,
                                    intTime: intTimeNumber,
                                    isOnEditing: false,
                                    key: this.props.interval.key
                                };
                                this.props.when({ about: 'editing-finished', changedInterval: interval });
                            } null
                        }}
                    ></button>
                    <button className="icon-button delete" onClick={() => {
                        this.props.when({ about: 'old-interval-to-delete', oldIntervalKey: interval.key });
                    }}></button>
                    <button className='cancel-button'
                        onClick={() => {
                            this.props.when({ about: 'to-cancel-interval-edit', intervalKeyToCancelEdit: interval.key });
                        }} onKeyDown={({ keyCode }) => {
                            if (keyCode === 27) {
                                this.props.when({ about: 'to-cancel-interval-edit', intervalKeyToCancelEdit: interval.key });
                            } null;
                        }}
                    >Cancel</button>
                </div>
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