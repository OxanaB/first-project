/// <amd-dependency path="async!https://apis.google.com/js/api.js!onload" />

import { CalculatorEditProps, CalculatorEdit } from "./calculator-edit";
import { map, sum, filter, swapInArray } from "./utils";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { CalculatorView } from "./calculator-view";
import { intervals } from "./et-arrays";

var API_KEY = 'AIzaSyDNWPh_5wk5eCgH5O3CQ01RdNEDkT8D5gQ';
var CLIENT_ID = '52025529863-17d1jb3g1geb75umat6ecfkcq0c4383n.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

declare const gapi: any;
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
            gapi.client.drive.files.list({
                'pageSize': 10,
                'fields': "nextPageToken, files(id, name)"
              }).then(function(response: any) {
                  
                var files = response.result.files;
                console.log(files);
                TimeCalculator(isSignedIn);
              });
        } else {
            alert('Need to sign in to Google.');
        }
        
        
    });
});

function TimeCalculator(isSignedIn: boolean) {

    let oldProps: CalculatorEditProps = {
        isNewIntervalToAdd: false,
        isSignedInStatus: {
            isSignedIn: isSignedIn,
            whenToSignIn: () => {

            },
            whenToSignOut: () => {

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
                : <CalculatorView intervals={oldProps.intervals} time={oldProps.time} whenSwitchMode={oldProps.whenSwitchMode} />,
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