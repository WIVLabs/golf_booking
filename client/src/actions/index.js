import Api from "../components/Api";

export const REQUEST_GET_BOOKINGS = 'REQUEST_GET_BOOKINGS';
export function requestGetBookings() {
    return {
        type: REQUEST_GET_BOOKINGS
    }
}

// 미들웨어.
export const fetchGetBookings = (params) => dispatch => {
    // 요청 상태로 변경함
    dispatch(requestGetBookings());

    // 서버 호출 후 응답 함수를 호출함
    return Api.getBookings(params)
        .then(response => dispatch(receivedGetBookings(params, response)));
}

export const RECEIVED_GET_BOOKINGS = 'RESPONSE_GET_BOOKINGS';
export function receivedGetBookings(searchParams, data) {
    return {
        type: RECEIVED_GET_BOOKINGS,
        data,
        searchParams
    }
}

export const NEXT_DAYS = 'NEXT_DAYS';
export function nextDays() {
    return {
        type: NEXT_DAYS
    }
}

export const PREV_DAYS = 'PREV_DAYS';
export function prevDays() {
    return {
        type: PREV_DAYS
    }
}

export const SET_TABLE_HEADER_WIDTH = 'SET_TABLE_HEADER_WIDTH';
export function setTableHeaderWidth(golfCourseNameWidth, dateWidth) {
    return {
        type: SET_TABLE_HEADER_WIDTH,
        golfCourseNameWidth,
        dateWidth
    }
}