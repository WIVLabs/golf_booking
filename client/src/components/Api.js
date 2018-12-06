const Api = {
    // 예약 목록 조회
    /**
     * @param paramsObj : {
                booking_dates: ['2018-01-01','2018-01-07'],
                time_range: {
                    from: 6,
                    to: 11
                },
                region: 'R02',
                course: '1',
                greenfee_range: {
                    from: 20000,
                    to: 110000
                }
            }
     * @returns {Promise<any | never>}
     */
    getBookings: (paramsObj) => {

        console.log('Api.getBookings', paramsObj);


        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings2';

        return fetch(url).then(response => response.json());
    }
};

export {
    Api
};