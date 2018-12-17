import { CalculatorEditProps, CalculatorEdit, Feedback } from "./calculator-edit";
import { map, sum, filter, swapInArray } from "./utils";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { CalculatorView } from "./calculator-view";
import { Interval, intervalsExample } from "./et-arrays";
import { downloadFile } from "./google-drive-utils";
import { gapi } from "./gapi";

var API_KEY = 'AIzaSyBQvyb_TAkXJi2K80gb60xlC5JvdAKurpg';
var CLIENT_ID = '52025529863-17d1jb3g1geb75umat6ecfkcq0c4383n.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
// 'https://www.googleapis.com/auth/drive.metadata.readonly',
// 'https://www.googleapis.com/auth/drive.appdata',

gapi.load('client:auth2', () => {

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
        .then(function () {
            // Listen for sign-in state changes.
            // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
            if (isSignedIn) {
                whenSignedIntoGoogleForSure();
            } else {
                whenIsNotSingedIn();
            }


        });
});

async function whenSignedIntoGoogleForSure() {
    const downloadUrl = 'https://drive.google.com/uc?id=1MJnWntyfL7oLcZGvusHanm2i7UuFnIag&export=download';
    // downloadFile(downloadUrl).then(response => {
    //     const intervals = JSON.parse(response);
    //     TimeCalculator(true, intervals);
    // });

    const response = await downloadFile(downloadUrl);
    const intervals = JSON.parse(response);
    TimeCalculator(true, intervals);


    // gapi.client.drive.files.export({
    //     'fileId': '1MJnWntyfL7oLcZGvusHanm2i7UuFnIag'
    // }).then(function (response: any) {
    //     var result = response.result;
    //     console.log(result);
    //     
    // });
}

function whenIsNotSingedIn() {
    const intervals = intervalsExample;
    TimeCalculator(false, intervals)
}

function TimeCalculator(isSignedIn: boolean, intervals: Interval[]) {

    let oldProps: CalculatorEditProps = {
        isNewIntervalToAdd: false,
        isSignedInStatus: {
            isSignedIn: isSignedIn,
            whenToSignIn: () => {

            },
            whenToSignOut: () => {
                gapi.auth2.getAuthInstance().signOut();
            },
        },
        intervalNewAdd: {
            intName: 'for driving to work',
            intTime: '15',
            whenNameChanged: (newName) => {
                const newProps: CalculatorEditProps = {
                    ...oldProps,
                    intervalNewAdd: {
                        ...oldProps.intervalNewAdd,
                        intName: newName,
                    }
                };
                rerender(newProps);
            },
            whenTimeChanged: (newTime) => {
                const newProps: CalculatorEditProps = {
                    ...oldProps,
                    intervalNewAdd: {
                        ...oldProps.intervalNewAdd,
                        intTime: newTime,
                    },
                };
                rerender(newProps);
            },
            whenNewIntervalAdded: (newInterval) => {
                const extendedIntervals = oldProps.intervals.concat(newInterval);
                const departureOrArrivalTime = calculateDepartureOrArrivalTime(
                    extendedIntervals, oldProps.what, oldProps.time
                );
                const newProps: CalculatorEditProps = {
                    ...oldProps,
                    intervals: extendedIntervals,
                    departureOrArrivalTime: departureOrArrivalTime,
                };
                rerender(newProps);
            },
        },
        intervals: intervals,
        isInEditMode: true,
        isToFeedBackPage: false,
        time: new Date(),
        what: 'Departure time',
        departureOrArrivalTime: new Date(),
        
        whenToSaveDataToGoogleDrive: () => {
            const text = JSON.stringify(oldProps.intervals);
            console.log(text);
        },
        saveToDrive: () => {
            const fileMetadata = {
                'name': 'config.json',
                'parents': ['appDataFolder']
            };
            const media = {
                mimeType: 'application/json',
                body: null
            };
            gapi.client.drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, function (err: any, file: any) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Folder Id:', file.id);
                }
            });
        },
        when: (concern) => {
            switch (concern.about) {
                case 'time-is-entered': {
                    const departureOrArrivalTime = calculateDepartureOrArrivalTime(
                        oldProps.intervals, concern.what, concern.enteredTime
                    );
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        time: concern.enteredTime,
                        what: concern.what,
                        departureOrArrivalTime: departureOrArrivalTime,
                    };
                    rerender(newProps);
                    break;
                };
                case 'switch-mode': {
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        isInEditMode: concern.isInEditMode,
                    };
                    rerender(newProps);
                    break
                };
                case 'show-new-interval-interface': {
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        isNewIntervalToAdd: concern.isNewIntervalToAdd,
                    };
                    rerender(newProps);
                    break;
                };
                case 'interval-editing-started': {
                    const editedIntervals = map(oldProps.intervals,
                        otherInterval => {
                            if (otherInterval.key === concern.intervalKey) {
                                return { ...otherInterval, isOnEditing: true };
                            } else {
                                return otherInterval;
                            }
                        }
                    );
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        intervals: editedIntervals,
                    }
                    rerender(newProps);
                    break
                };
                case 'interval-to-go-up': {
                    const index = oldProps.intervals.findIndex(interval => interval.key === concern.intervalKey);
                    if (index !== 0) {
                        const editedIntervals = swapInArray(oldProps.intervals, index, index - 1);
                        const newProps: CalculatorEditProps = {
                            ...oldProps,
                            intervals: editedIntervals,
                        };
                        rerender(newProps);
                    }
                    else {
                        null;
                    }
                    break;
                }
                case 'interval-to-go-down': {
                    const index = oldProps.intervals.findIndex(interval => interval.key === concern.intervalKey);
                    if (index < intervals.length - 1) {
                        const editedIntervals = swapInArray(oldProps.intervals, index, index + 1);
                        const newProps: CalculatorEditProps = {
                            ...oldProps,
                            intervals: editedIntervals,
                        };
                        rerender(newProps);
                    } else {
                        null;
                    }
                    break;

                }
                case 'editing-finished': {
                    const editedIntervals = map(oldProps.intervals,
                        oldInterval => {
                            if (oldInterval.key === concern.changedInterval.key) {
                                return concern.changedInterval;
                            } else {
                                return oldInterval;
                            }
                        }
                    );
                    const departureOrArrivalTime = calculateDepartureOrArrivalTime(
                        editedIntervals, oldProps.what, oldProps.time
                    );
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        intervals: editedIntervals,
                        departureOrArrivalTime: departureOrArrivalTime,
                    };
                    rerender(newProps);
                    break;
                }
                case 'old-interval-to-delete': {
                    const filteredIntervals = filter(oldProps.intervals,
                        otherInterval => otherInterval.key !== concern.oldIntervalKey
                    );
                    const departureOrArrivalTime = calculateDepartureOrArrivalTime(
                        filteredIntervals, oldProps.what, oldProps.time
                    );
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        intervals: filteredIntervals,
                        departureOrArrivalTime: departureOrArrivalTime,
                    }
                    rerender(newProps);
                    break;
                }
                case 'to-cancel-interval-edit': {
                    const editedIntervals = map(oldProps.intervals,
                        otherInterval => {
                            if (otherInterval.key === concern.intervalKeyToCancelEdit) {
                                return { ...otherInterval, isOnEditing: false };
                            } else {
                                return otherInterval;
                            }
                        }
                    );
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        intervals: editedIntervals,
                    }
                    rerender(newProps);
                    break;
                }
                case 'to-feedback': {
                    const newProps: CalculatorEditProps = {
                        ...oldProps,
                        isToFeedBackPage: concern.isToFeedback,
                    };
                    rerender(newProps);
                    break;
                }
            }

        },
    };

    rerender(oldProps);

    function rerender(newProps: CalculatorEditProps): void {
        const rootElement = document.getElementById('root');
        oldProps = newProps;
        ReactDOM.render(
            oldProps.isToFeedBackPage ?
                <Feedback isToFeedBackPage={oldProps.isToFeedBackPage}
                    when={newProps.when} />
                : oldProps.isInEditMode ?
                    <CalculatorEdit {...newProps} />
                    : <CalculatorView
                        {...newProps}
                    />,
            rootElement
        );
    }
}

function calculateDepartureOrArrivalTime(intervals: Interval[], what: string, newTime: Date) {
    const intervalTimes = map(intervals, interval => { return interval.intTime });
    const totalMinutes = sum(intervalTimes);

    const departureOrArrivalTime = toCountTime(what, newTime, totalMinutes);
    return departureOrArrivalTime;
}

function toCountTime(what: string, time: Date, totalMinutes: number): Date {
    if (what == "Arrival time") {
        const arrivalTimeInMs = time.getTime();
        const intervalTimeInMs = totalMinutes * 60 * 1000;
        const departureTimeInMs = arrivalTimeInMs - intervalTimeInMs;
        const departureTime = new Date(departureTimeInMs);
        return departureTime;
    } else {
        const departureTimeInMs = time.getTime();
        const intervalTimeInMs = totalMinutes * 60 * 1000;
        const arrivalTimeInMs = departureTimeInMs + intervalTimeInMs;
        const arrivalTime = new Date(arrivalTimeInMs);
        return arrivalTime;
    }
}