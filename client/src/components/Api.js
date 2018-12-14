const Api = {
    // 전체 지역 조회
    getAllRegions: () => {
        const url = `/api/regions`;

        return fetch(url).then(response => response.json());
    },
    getGolfCourses: (region) => {
        const url = region ? `/api/golf-courses?region=${region}` : '/api/golf-courses';
        console.log('getGolfCourses', url, region);
        return fetch(url).then(response => response.json());
    },
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
        const queryStringParameters = encodeURIComponent(JSON.stringify(paramsObj));
        const url = `/api/bookings2?params=${queryStringParameters}`; //

        return fetch(url).then(response => response.json());
    }
};

export default Api;