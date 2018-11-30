import React from "react";
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {DateUtility} from "../components/Utility";
import {Api} from "../components/Api";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        console.log('Courses Props', this.props);

        this.state = {
            bookings: []
        }

        this.clickSearch = this.clickSearch.bind(this);
    }

    componentDidMount() {
        const {searchParams} = this.props.match.params;
        const params = new URLSearchParams(searchParams);
        Api.getBookings(params)
            .then(data => {
                let dates = [];

                this.setState({
                    courses: data.data.courses,
                    kickoff_dates: data.data.kickoff_dates
                });
            });
    }

    clickSearch(ob) {
        console.log('여기는 Course! 전달된 검색 파라미터:', ob);
        const params = new URLSearchParams();
        params.set('booking_dates', ob.booking_dates);
        params.set('time_range_from', ob.time_range.from);
        params.set('time_range_to', ob.time_range.to);
        params.set('region', ob.region);
        params.set('course', ob.course);
        params.set('greenfee_range_from', ob.greenfee_range.from);
        params.set('greenfee_range_to', ob.greenfee_range.to);

        Api.getBookings(params)
            .then(data => {
                let dates = [];

                this.setState({
                    courses: data.data.courses,
                    kickoff_dates: data.data.kickoff_dates
                });
            });

    }

    render() {
        // let params = new URLSearchParams(window.location.search);
        // console.log(params);

        let lastedRefreshDateTime = DateUtility.now(); // TODO : 필요 없으면 제거
        return (
            <div>
                <CourseSearch onClick={this.clickSearch}/>
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