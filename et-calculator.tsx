import { CalculatorEditProps, CalculatorEdit } from "./calculator-edit";
import { map, sum, filter, swapInArray } from "./utils";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { CalculatorView } from "./calculator-view";
import { Interval } from "./et-arrays";
import { downloadFile } from "./google-drive-utils";
import { gapi } from "./gapi";

var API_KEY = 'AIzaSyDNWPh_5wk5eCgH5O3CQ01RdNEDkT8D5gQ';
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
                gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
                    whenSignedIntoGoogleForSure();
                });
                gapi.auth2.getAuthInstance().signIn();
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
                const newProps: CalculatorEditProps = {
                    ...oldProps,
                    intervals: extendedIntervals,
                };
                rerender(newProps);
            },
        },
        intervals: intervals,
        isInEditMode: true,
        time: new Date(),
        what: 'Departure time',
        departureOrArrivalTime: new Date(),
        whenTimeIsEntered: (newTime, what) => {

            const intervalTimes = map(oldProps.intervals, interval => { return interval.intTime });
            const totalMinutes = sum(intervalTimes);

            const departureOrArrivalTime = toCountTime(what, newTime, totalMinutes);

            const newProps: CalculatorEditProps = {
                ...oldProps,
                time: newTime,
                what: what,
                departureOrArrivalTime: departureOrArrivalTime,
            };
            rerender(newProps);
        },
        whenShowNewIntervalInterface: (isNewIntervalToAdd: boolean) => {
            const newProps: CalculatorEditProps = {
                ...oldProps,
                isNewIntervalToAdd: isNewIntervalToAdd,
            };
            rerender(newProps);
        },
        whenOldIntervalToDelete: (oldIntervalKey) => {
            const filteredIntervals = filter(oldProps.intervals,
                otherInterval => otherInterval.key !== oldIntervalKey
            );
            const newProps: CalculatorEditProps = {
                ...oldProps,
                intervals: filteredIntervals,
            }
            rerender(newProps);
        },
        whenIntervalEditingStarted: (intervalKey) => {
            const editedIntervals = map(oldProps.intervals,
                otherInterval => {
                    if (otherInterval.key === intervalKey) {
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
        },
        whenIntervalEditingFinished: (newInterval) => {
            const editedIntervals = map(oldProps.intervals,
                oldInterval => {
                    if (oldInterval.key === newInterval.key) {
                        return newInterval;
                    } else {
                        return oldInterval;
                    }
                }
            );
            const newProps: CalculatorEditProps = {
                ...oldProps,
                intervals: editedIntervals,
            };
            rerender(newProps);
        },
        whenButtonDownIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
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
        },
        whenButtonUpIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
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
        },
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
        whenSwitchMode: (isInEditMode: boolean) => {
            const newProps: CalculatorEditProps = {
                ...oldProps,
                isInEditMode: isInEditMode,
            };
            rerender(newProps);
        }
    };

    rerender(oldProps);

    function rerender(newProps: CalculatorEditProps): void {
        const rootElement = document.getElementById('root');
        oldProps = newProps;
        ReactDOM.render(
            oldProps.isInEditMode
                ? <CalculatorEdit {...newProps} />
                : <CalculatorView
                    departureOrArrivalTime={oldProps.departureOrArrivalTime}
                    intervals={oldProps.intervals}
                    time={oldProps.time}
                    whenSwitchMode={oldProps.whenSwitchMode}
                />,
            rootElement
        );
    }
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