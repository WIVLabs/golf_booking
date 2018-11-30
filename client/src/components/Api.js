const Api = {
    // 예약 목록 조회
    getBookings: (params) => {

        console.log(params.get('booking_dates'));
        console.log(params.get('time_range_from'));
        console.log(params.get('time_range_to'));
        console.log(params.get('region'));
        console.log(params.get('course'));
        console.log(params.get('greenfee_range_from'));
        console.log(params.get('greenfee_range_to'));

        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings2';

        return fetch(url).then(response => response.json());
    }
};

export {
    Api
};