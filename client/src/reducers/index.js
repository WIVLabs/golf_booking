import {
    NEXT_DAYS,
    PREV_DAYS,
    RECEIVED_GET_BOOKINGS,
    REQUEST_GET_BOOKINGS,
    SET_TABLE_HEADER_WIDTH
} from "../actions";
import {combineReducers} from "redux";
import {CollectionUtility} from "../components/Utility";

// 리듀스에서 하지 말아야 할 것들.
// 인수들을 변경(mutate)하기;
// API 호출이나 라우팅 전환같은 사이드이펙트를 일으키기;
// Date.now()나 Math.random() 같이 순수하지 않은 함수를 호출하기.

const initialBookingsState = {
    searchParams: {},
    viewDateCount: 3,
    loadBookings : false,
    courses: [],
    cursor: {},
    kickoff_dates: [],

    prevDates: [],
    currentDates: [],
    nextDates: []
};

function bookings(state = initialBookingsState, action) {
    const {viewDateCount} = state;
    const {nextDates, prevDates, currentDates} = state;
    let current = state.currentDates;
    let next = state.nextDates;
    let prev = state.prevDates;
    switch (action.type) {
        case REQUEST_GET_BOOKINGS:
            return Object.assign({}, state, {
                loadBookings: true
            });
        case RECEIVED_GET_BOOKINGS:
            const responseData = action.data;
            // 화면에 보여줄 일자 설정
            if (state.currentDates.length < 1) {
                if (responseData.kickoff_dates.length > state.viewDateCount) {
                    current = responseData.kickoff_dates.slice(0, state.viewDateCount);
                    next = responseData.kickoff_dates.slice(state.viewDateCount, responseData.kickoff_dates.length);
                }
                else {
                    current = responseData.kickoff_dates;
                }
            }

            return Object.assign({}, state, {
                searchParams: action.searchParams,
                loadBookings: false,
                courses: [...state.courses, ...action.data.courses],
                kickoff_dates: responseData.kickoff_dates,
                cursor: action.data.cursor,

                prevDates: prev,
                currentDates: current,
                nextDates: next
            });
            // 이전 일자 설정
        case PREV_DAYS:
            const beforeDatesLength = CollectionUtility.length(prevDates);
            if (beforeDatesLength > viewDateCount) {
                const startIndex = beforeDatesLength - viewDateCount;
                next = [...currentDates, ...nextDates];
                current = prevDates.slice(startIndex, beforeDatesLength);
                prev = prevDates.slice(0, startIndex);
            }
            else if (beforeDatesLength === viewDateCount) {
                next = [...currentDates, ...nextDates];
                current = prevDates.slice(0, viewDateCount);
                prev = [];
            }
            else if (beforeDatesLength < viewDateCount) {
                let enableKickoffDates = [...prevDates.slice(0, beforeDatesLength), ...currentDates];
                const enableLength = enableKickoffDates.length;
                next = [...enableKickoffDates.slice(viewDateCount, enableLength), ...nextDates];
                current = enableKickoffDates.slice(0, viewDateCount);
                prev = [];
            }
            return Object.assign({}, state, {
                prevDates: prev,
                currentDates: current,
                nextDates: next
            });
            // 다음 일자 설정
        case NEXT_DAYS:
            const nextDatesLength = CollectionUtility.length(nextDates);
            if (nextDatesLength > viewDateCount) {
                prev = [...prevDates, ...currentDates];
                current = nextDates.slice(0, viewDateCount);
                next = nextDates.slice(viewDateCount, nextDatesLength);
            }
            else if (nextDatesLength === viewDateCount) {
                prev = [...prevDates, ...currentDates];
                current = nextDates.slice(0, viewDateCount);
                next = [];
            }
            else if (nextDatesLength < viewDateCount) {
                let enableKickoffDates = [...currentDates, ...nextDates.slice(0, nextDatesLength)];
                const enableLength = enableKickoffDates.length;
                prev = [...prevDates, ...enableKickoffDates.slice(0, enableLength - viewDateCount)];
                current = [...currentDates.slice(enableLength - viewDateCount, enableLength + 1), ...nextDates];
                next = [];
            }
            return Object.assign({}, state, {
                prevDates: prev,
                currentDates: current,
                nextDates: next
            });
        default:
            return state;
    }
}

const initialTableState = {
    golfCourseNameWidth:150,
    dateWidth: 150
}
function table(state = initialTableState, action) {
    switch (action.type) {
        case SET_TABLE_HEADER_WIDTH:
            return Object.assign({}, state, {
                golfCourseNameWidth : action.golfCourseNameWidth,
                dateWidth : action.dateWidth
            });
        default:
            return state;
    }
}

const golfBookingApp = combineReducers({
    bookings,
    table
});

export default golfBookingApp;