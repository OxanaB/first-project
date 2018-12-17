import * as React from "react";
import { map, sum, getTodayDate, formatDateTime } from "./utils";
import { IntervalNewAddProps, IntervalNewAdd } from "./interval-new-add";
import { IntervalEditInterface, ButtonEdit, IntervalToGoUp, IntervalToGoDown, OldIntervalToDelete, EditingFinished, ToCancelIntervalEdit } from "./interval-edit";
import { Interval } from "./et-arrays";
import { Time } from "./time";
import { SignInOutButtons, SignInOutButtonsProps } from "./sing-in-out";
import { SwitchMode } from "./calculator-view";


export interface CalculatorEditProps {
    intervals: Interval[];
    isInEditMode: boolean;
    isToFeedBackPage: boolean;
    isNewIntervalToAdd: boolean;
    intervalNewAdd: IntervalNewAddProps;
    isSignedInStatus: SignInOutButtonsProps;
    time: Date;
    what: string;
    departureOrArrivalTime: Date;
    whenTimeIsEntered: (enteredTime: Date, what: string) => void;
    whenShowNewIntervalInterface: (isNewIntervalToAdd: boolean) => void;
    
    whenIntervalEditingStarted: (intervalKey: string) => void;
    
    whenToSaveDataToGoogleDrive: () => void;
    saveToDrive: () => void;
    when: (concern: IntervalToGoUp |
        IntervalToGoDown |
        OldIntervalToDelete |
        EditingFinished |
        ToCancelIntervalEdit |
        ToFeedBack | 
        SwitchMode) => void;
}

export class CalculatorEdit extends React.Component<CalculatorEditProps> {
    render() {
        const intervalTimes = map(this.props.intervals, interval => { return interval.intTime });
        const totalMinutes = sum(intervalTimes);
        const restMinutes = totalMinutes % 60;
        const spentHours = (totalMinutes - restMinutes) / 60;
        const totalSpend = spentHours + " hours " + restMinutes + " minutes";

        return <div className="page">
            <div className='top-buttons'>
                <div className='authentication'>
                    <SignInOutButtons isSignedIn={this.props.isSignedInStatus.isSignedIn}
                        whenToSignIn={() => {
                            this.props.isSignedInStatus.whenToSignIn();
                        }}
                        whenToSignOut={() => {
                            this.props.isSignedInStatus.whenToSignOut();
                        }}
                    />
                </div>
                <div className="link-to-next-page">
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.props.when({about: 'switch-mode', isInEditMode: false});
                    }}>View mode</a>
                </div></div>

            <header><h1>Time duration calculator</h1></header>
            <div className="time">
                <Time time={getTodayDate()} whenTimeIsEntered={(time, what) => {
                    this.props.whenTimeIsEntered(time, what);
                }} />
            </div>
            <div className="menu-edit-interval">
                <h2>My task list in time intervals:</h2>
                {
                    this.props.isNewIntervalToAdd
                        ? <IntervalNewAdd {...this.props.intervalNewAdd} />
                        : null
                }
                {
                    this.props.isNewIntervalToAdd
                        ? <button onClick={() => {
                            this.props.whenShowNewIntervalInterface(false);
                        }}>Hide</button>
                        : <button onClick={() => {
                            this.props.whenShowNewIntervalInterface(true);
                        }}>Add new</button>
                }
                {map(this.props.intervals, interval => {
                    if (interval.isOnEditing) {
                        return <IntervalEditInterface
                            interval={interval}
                            when={(concern) => {
                                
                                this.props.when(concern);
                            
                            }}
                        />;
                    } else { 
                        return <div className="interval-container">
                            <div className='interval-string'>{interval.intTime + ' min ' + interval.intName}</div>
                            <ButtonEdit
                                interval={interval}
                                whenOldIntervalToEdit={(intervalKey) => {
                                    this.props.whenIntervalEditingStarted(intervalKey);
                                }}
                            />
                        </div>
                    }
                })}
                <div className='save-my-data'>
                    <button onClick={() => {
                        this.props.whenToSaveDataToGoogleDrive();
                        this.props.saveToDrive();
                    }}>Save my interval settings to GOOGLE Drive</button>
                </div></div>
            <div className="footer">
                {this.props.what === 'Departure time' ? 'I will finish / arrive at' : 'I need to get start at'}
                <strong>{formatDateTime(this.props.departureOrArrivalTime)}</strong>
                <p>and will spend {totalSpend}</p>
            </div>
            <div><a href="" onClick={(e) => {
                e.preventDefault();
                this.props.when({about: 'to-feedback', isToFeedback: true});
            }}>Send us a feedback</a>
            </div>
        </div>
    }
}

export interface FeedbackProps {
    isToFeedBackPage: boolean;
    when: (concern: ToFeedBack) => void;
}
export interface ToFeedBack {
    about: 'to-feedback'; 
    isToFeedback: boolean;
}
export class Feedback extends React.Component<FeedbackProps> {
    render() {
        return <div>
            <a className="back-to-edit-mode"
            href="" onClick={e => {
                e.preventDefault();
                this.props.when({about: 'to-feedback', isToFeedback: false});
            }}>Back to app</a>
            <iframe height='100%' width='100%'
            src="https://docs.google.com/forms/d/e/1FAIpQLSeXLB-dvqcWS7ERVnIJkV277Mnoekjc3w5wZAm4fwrSYulGdQ/viewform"/>
        </div>
    } 
}