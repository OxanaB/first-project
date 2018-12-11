import * as React from "react";
import { map, sum, getTodayDate, formatDateTime } from "./utils";
import { IntervalNewAddProps, IntervalNewAdd } from "./interval-new-add";
import { IntervalEditInterface, ButtonEdit } from "./interval-edit";
import { Interval } from "./et-arrays";
import { Time } from "./time";
import { SignInOutButtons, SignInOutButtonsProps } from "./sing-in-out";

export interface CalculatorEditProps {
    intervals: Interval[];
    isInEditMode: boolean;
    isNewIntervalToAdd: boolean;
    intervalNewAdd: IntervalNewAddProps;
    isSignedInStatus: SignInOutButtonsProps;
    time: Date;
    what: string;
    departureOrArrivalTime: Date;
    whenTimeIsEntered: (enteredTime: Date, what: string) => void;
    whenShowNewIntervalInterface: (isNewIntervalToAdd: boolean) => void;
    whenIntervalEditingFinished: (newEditedInterval: Interval) => void;
    whenIntervalEditingStarted: (intervalKey: string) => void;
    whenOldIntervalToDelete: (oldIntervalKey: string) => void;
    whenButtonUpIsPushed: (intervalStringKey: string) => void;
    whenButtonDownIsPushed: (intervalStringKey: string) => void;
    whenSwitchMode: (isInEditMode: boolean) => void;
    whenToSaveDataToGoogleDrive: () => void;
    saveToDrive: () => void;
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
                    this.props.whenSwitchMode(false);
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
                            whenEditingFinished={(interval) => {
                                this.props.whenIntervalEditingFinished(interval);
                            }}
                            whenOldIntervalToDelete={(interval) => {
                                this.props.whenOldIntervalToDelete(interval);
                            }}
                            whenIntervalToGoDown={(intervalStringKey) => {
                                this.props.whenButtonDownIsPushed(intervalStringKey);
                            }}
                            whenIntervalToGoUp={(intervalStringKey) => {
                                this.props.whenButtonUpIsPushed(intervalStringKey);
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
        </div>
    }
}
