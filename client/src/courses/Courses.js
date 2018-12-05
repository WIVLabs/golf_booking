import React from "react";
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {DateUtility} from "../components/Utility";
import {Api} from "../components/Api";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        console.log('Courses Props', this.props);

        let {searchParams} = this.props.match.params;
        let paramsObj = JSON.parse(searchParams);
        console.log(paramsObj);
        this.state = {
            bookings: [],
            searchParams: paramsObj
        }

        this.getBookings = this.getBookings.bind(this);
        this.getBookings(paramsObj);

    }

    componentDidMount() {

    }

    getBookings(paramsObj) {
        console.log('여기는 Course getBookings! 전달된 검색 파라미터:', paramsObj);
        Api.getBookings(paramsObj)
            .then(data => {
                let dates = [];

                this.setState({
                    courses: data.data.courses,
                    kickoff_dates: data.data.kickoff_dates
                });
            });
    }

    render() {

        let lastedRefreshDateTime = DateUtility.now(); // TODO : 필요 없으면 제거
        return (
            <div>
                <CourseSearch searchparams={this.state.searchParams} onClick={this.getBookings}/>
                <hr/>

                <div className="container-fluid">
                    <div className="table-responsive">
                        <div className="float-right">마지막 조회 시간 {lastedRefreshDateTime}</div>
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th></th>
                                {this.state.kickoff_dates ?
                                    this.state.kickoff_dates.map(kickoff_date => {
                                        return (
                                            <th key={`booking-${kickoff_date.date}`}>{DateUtility.convert(kickoff_date.date, 'YYYYMMDD', 'YYYY-MM-DD(ddd)')}</th>)
                                    }) : <th>Loading...</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.courses ?
                                this.state.courses.map(course => {
                                    return <BookingRow key={`course-${course.id}`} course={course}/>
                                }) : <tr>
                                    <td>Loading...</td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    };
}

export default Courses;