import React from "react";
import Booking from "./Booking";
import axios from 'axios';

class BookingList extends React.Component {

    constructor(props) {
        super(props);

        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings';
        // fetch(url, {
        //   method: "GET",
        //   headers: new Headers({
        //     "content-type": "application/json",
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Credentials':true,
        //     'Access-Control-Allow-Methods':'GET'
        //   })
        // }).then(response => response.json()).then(data => console.log(data));
        let config = {
            headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers' : '*'}
        };
        axios.get(url, config)
                .then(response => {console.log(response)});
    }

    render() {
        let lastedRefreshDateTime = "2018/11/28 15:00:01";
        return (
            <div className="container-fluid">
                <div className="table-responsive">
                    <div className="float-right">마지막 조회 시간 {lastedRefreshDateTime}</div>
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>골프장</th>
                            <th>2018.12.01(토)</th>
                            <th>2018.12.02(일)</th>
                            <th>2018.12.03(월)</th>
                            <th>2018.12.04(화)</th></tr></thead>
                        <tbody>
                        <Booking />
                        <Booking />
                        <Booking />
                        <Booking />
                        </tbody>
                    </table>
                </div>
            </div>)
    };
}

export default BookingList;