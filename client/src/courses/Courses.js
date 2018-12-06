import React from "react";
import './Courses.scss';
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {ObjectUtility, DateUtility} from "../components/Utility";
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
                    hasData: ObjectUtility.isNotEmpty(data.data),
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
                this.setState({
                    hasData: ObjectUtility.isNotEmpty(data.data),
                    courses: data.data.courses,
                    kickoff_dates: data.data.kickoff_dates
                });

                console.log('dddd');
            });
    }

    getThClassName(kickoffDate) {
        let backgroundClass = '';
        const weekdayCode = DateUtility.getWeekdayCode(kickoffDate, DateUtility.DF_DATE);
        if (DateUtility.isSunday(weekdayCode)) {
            backgroundClass = 'booking-th-sunday-bg';
        }
        else if(DateUtility.isSaturday(weekdayCode)) {
            backgroundClass = 'booking-th-saturday-bg';
        }

        return `booking-table-date text-center ${backgroundClass}`;
    }

    getNextWeek() {
        alert('TODO:다음일주일 구현?');
    }

    render() {
        return (
            <div>
                <CourseSearch onClick={this.clickSearch}/>
                {this.state.hasData ?
                    <div className="container-fluid">
                        <div className={'float-right align-right mb-2'}>
                            <button type="button" className="btn btn-primary" onClick={this.getNextWeek}>
                                <i className="fa fa-golf-ball"></i> 다음일주일
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th className={'booking-table-date text-center'}>골프장</th>
                                    {this.state.kickoff_dates ?
                                        this.state.kickoff_dates.map(kickoff_date => {
                                            const thClassName = this.getThClassName(kickoff_date.date);
                                            return (<th className={thClassName} key={`booking-${kickoff_date.date}`}>
                                                        {DateUtility.convert(kickoff_date.date, 'YYYYMMDD', 'YYYY-MM-DD(ddd)')}
                                                        </th>)
                                        }) : <th>날짜를 읽어오는 중입니다...</th>}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courses ?
                                    this.state.courses.map(course => {
                                        return <BookingRow key={`course-${course.id}`} course={course}/>
                                    }) : <tr>
                                        <td className="text-center">부킹 정보를 읽어오는 중입니다...</td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                : "정보를 조회중입니다."}
            </div>
        )
    };
}

export default Courses;