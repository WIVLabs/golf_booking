import React from "react";
import './Courses.scss';
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {ObjectUtility, DateUtility} from "../components/Utility";
import {Api} from "../components/Api";
import Spinner from "../components/Spinner";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        let {searchParams} = this.props.match.params;
        console.log(searchParams);
        let paramsObj = JSON.parse(searchParams);
        console.log(paramsObj);
        this.state = {
            hasData : false,
            bookings: [],
            searchParams: paramsObj
        }

        this.getBookings = this.getBookings.bind(this);
    }

    componentDidMount() {
        this.getBookings();
    }

    getBookings() {
        this.setState({hasData : false});
        setTimeout(() => {
            Api.getBookings(this.state.searchParams)
                .then(data => {
                    this.setState({
                        hasData: ObjectUtility.isNotEmpty(data.data),
                        courses: data.data.courses,
                        kickoff_dates: data.data.kickoff_dates
                    });
                });
        }, 2000);

        return false;
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
        alert('TODO:다음일주일검색 구현');
    }

    render() {
        return (
            <div>
                <CourseSearch searchparams={this.state.searchParams} onClick={this.getBookings}/>
                {this.state.hasData ?
                    <div className="container-fluid">
                        <div className={'float-right align-right mb-2'}>
                            <button type="button" className="btn btn-primary" onClick={this.getNextWeek}>
                                <i className="fa fa-golf-ball"></i> 다음일주일검색
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th className={'booking-table-date text-center'}>골프장</th>
                                    {this.state.kickoff_dates.map(kickoff_date => {
                                            const thClassName = this.getThClassName(kickoff_date.date);
                                            return (<th className={thClassName} key={`booking-${kickoff_date.date}`}>
                                                        {DateUtility.convert(kickoff_date.date, DateUtility.DF_DATE, 'YYYY-MM-DD(ddd)')}
                                                        </th>)
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courses.map(course => {
                                        return <BookingRow key={`course-${course.id}`} course={course}/>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <div className={'text-center'}> <Spinner /></div>}
            </div>
        )
    };
}

export default Courses;