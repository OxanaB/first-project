function TimeCalculator() {
    const rootElement = document.getElementById('root');

    let oldProps: CalculatorInterfaceProps = {
        intName: 'for driving to work',
        intTime: '15',
        intervals: intervals,
        time: new Date(),
        what: 'Departure time',
        departureOrArrivalTime: new Date(),
        whenTimeIsEntered: (newTime, what) => {

            const intervalTimes = oldProps.intervals.map(interval => { return interval.intTime });
            const totalMinutes = sum(intervalTimes, 0);

            const departureOrArrivalTime = toCountTime(what, newTime, totalMinutes);

            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                time: newTime,
                what: what,
                departureOrArrivalTime: departureOrArrivalTime,
            };
            rerender(newProps);
        },
        whenNameChanged: (newName) => {
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intName: newName,
            };
            rerender(newProps);
        },
        whenTimeChanged: (newTime) => {
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intTime: newTime,
            };
            rerender(newProps);
        },
        whenNewIntervalAdded: (newInterval) => {
            const extendedIntervals = oldProps.intervals.concat(newInterval);
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: extendedIntervals,
            };
            rerender(newProps);
        },
        whenOldIntervalToDelete: (oldIntervalKey) => {
            const filteredIntervals = oldProps.intervals.filter(
                otherInterval => otherInterval.key !== oldIntervalKey
            );
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: filteredIntervals,
            }
            rerender(newProps);
        },
        whenIntervalEditingStarted: (intervalKey) => {
            const editedIntervals = oldProps.intervals.map(
                otherInterval => {
                    if (otherInterval.key === intervalKey) {
                        return { ...otherInterval, isOnEditing: true };
                    } else {
                        return otherInterval;
                    }
                }
            );
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: editedIntervals,
            }
            rerender(newProps);
        },
        whenIntervalEditingFinished: (newInterval) => {
            const editedIntervals = oldProps.intervals.map(
                oldInterval => {
                    if (oldInterval.key === newInterval.key) {
                        return newInterval;
                    } else {
                        return oldInterval;
                    }
                }
            );
            const newProps: CalculatorInterfaceProps = {
                ...oldProps,
                intervals: editedIntervals,
            };
            rerender(newProps);
        },
        whenButtonDownIsPushed: (intervalKey) => {
            const index = oldProps.intervals.findIndex(interval => interval.key === intervalKey);
            if (index < intervals.length - 1) {
                const editedIntervals = swapInArray(oldProps.intervals, index, index + 1);
                const newProps: CalculatorInterfaceProps = {
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
                const newProps: CalculatorInterfaceProps = {
                    ...oldProps,
                    intervals: editedIntervals,
                };
                rerender(newProps);
            }
            else {
                null;
            }
        }
    };

    rerender(oldProps);

    function rerender(newProps: CalculatorInterfaceProps): void {
        console.log(newProps);
        oldProps = newProps;
        ReactDOM.render(
            <CalculatorInterface {...newProps} />,
            rootElement
        );
    }
}
window.onload = TimeCalculator;



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