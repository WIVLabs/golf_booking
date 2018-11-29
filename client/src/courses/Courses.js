import React from "react";
import CourseSearch from "./components/CourseSearch";
import Booking from "./components/Booking";


class Courses extends React.Component {

    constructor() {
        super();

        this.state = {
            bookings: []
        }
    }

    componentDidMount() {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/bookings';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({bookings: data.data});
            });
    }

    clickSearch(ob){
        console.log('여기는 Course! 전달된 검색 파라미터:',ob);
    }

    render() {
        let params = new URLSearchParams(window.location.search);
        let lastedRefreshDateTime = "2018/11/28 15:00:01"; // TODO : 필요 없으면 제거
        return (
            <div>
                <CourseSearch onClick={this.clickSearch}/>
                <hr />

                <div className="container-fluid">
                    <div className="table-responsive">
                        <div className="float-right">마지막 조회 시간 {lastedRefreshDateTime}</div>
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th></th>
                                {this.state.bookings.map(booking => {
                                    return <th key={`booking-${booking.kickoff_date}`}>{booking.kickoff_date}({booking.kickoff_weekday})</th>
                                })}
                            </tr></thead>
                            <tbody>
                                {this.state.bookings.map(booking => {
                                    return <Booking key={`booking-${booking.kickoff_date}`} booking={booking} />
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )};
}


export default Courses;