const Api = {
    // 예약 목록 조회
    getBookings : (params) => {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings2';

        return fetch(url).then(response => response.json());
    }
};

export  {
    Api
};