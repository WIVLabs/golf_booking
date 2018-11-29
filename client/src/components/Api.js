import React from "react";

// TODO 이동규 이 클래스를 사용하고 싶으나, 함수를 외부에서 호출하는 방법을 아직 모름.
class Api extends React.Component {
    constructor(props) {
        super(props);
    }

    // 예약목록 조회
    getBookings() {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings';

        return fetch(url).then(response => response.json());
    }
}

export default Api;