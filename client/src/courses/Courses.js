import React from "react";
import './Courses.scss';
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {ObjectUtility, DateUtility, StringUtility, CollectionUtility} from "../components/Utility";
import {Api} from "../components/Api";
import Spinner from "../components/Spinner";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        let {searchParams} = this.props.match.params;
        let paramsObj = JSON.parse(searchParams);
        console.log(paramsObj);
        this.state = {
            courses: [],
            searchParams: paramsObj,

            viewDateCount: 3,
            visibleKickoffDates: [],
            nextKickoffDates: [],
            beforeKickoffDates: []
        }

        this.getBookings = this.getBookings.bind(this);
        this.changeSearchValues = this.changeSearchValues.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.getNextBookings = this.getNextBookings.bind(this);
        this.getBeforeBookings = this.getBeforeBookings.bind(this);
        this.setVisibleDate = this.setVisibleDate.bind(this);
    }

    componentDidMount() {
        this.getBookings();
    }

    changeSearchValues(_params){
        const params = JSON.stringify(_params);
        console.log('Search Params', JSON.stringify(_params));
        this.props.history.push('./' + params);
        window.location.reload();
        return false;
    }

    getBookings() {
        this.setState({hasData : false});
        Api.getBookings(this.state.searchParams)
                .then(data => {
                    this.setState({
                        courses: data.courses,
                        kickoff_dates: data.kickoff_dates
                    });

                    this.setVisibleDate();
                });

        return false;
    }

    setVisibleDate() {
        if (this.state.kickoff_dates.length > this.state.viewDateCount) {
            let {visibleKickoffDates} = this.state;

            let visibleDates = [];
            let nextKickoffDates = [];
            if (CollectionUtility.isEmpty(visibleKickoffDates)) {
                visibleDates = this.state.kickoff_dates.slice(0, this.state.viewDateCount).map(kickoff => kickoff.date);
                nextKickoffDates = this.state.kickoff_dates.slice(this.state.viewDateCount, this.state.kickoff_dates.length).map(kickoff => kickoff.date);
            }
            this.setState({
                visibleKickoffDates : visibleDates,
                nextKickoffDates : nextKickoffDates
            });
        }
        else {
            this.setState({
                visibleKickoffDates : this.state.kickoff_dates.map(kickoff => kickoff.date)
            });
        }
    }


    goPrevPage() {
        this.props.history.push('/');
        return false;
    }

    getBeforeBookings() {

    }

    getNextBookings() {
        alert('다음 보기');
    }

    render() {
        let getThClassName = (kickoffDate) => {
            let backgroundClass = '';
            const weekdayCode = DateUtility.getWeekdayCode(kickoffDate, DateUtility.DF_DATE);
            if (DateUtility.isSunday(weekdayCode)) {
                backgroundClass = 'booking-th-sunday-bg';
            }
            else if(DateUtility.isSaturday(weekdayCode)) {
                backgroundClass = 'booking-th-saturday-bg';
            }

            return `booking-table-date text-center ${backgroundClass}`;
        };

        return (
            <div>
                <div className='ml-3'>
                    <button type='button' className="btn btn-outline-dark" onClick={this.goPrevPage}>
                        <i className="fa fa-arrow-left"></i> 첫페이지로
                    </button>
                </div>
                <CourseSearch searchparams={this.state.searchParams} onClick={this.changeSearchValues}/>


                {this.state.visibleKickoffDates.length > 0 ?
                    <div className="container-fluid">
                        {this.state.beforeKickoffDates.length > 0 ?
                            <div className={'float-left mb-2'}>
                                <button type='button' className="btn btn-secondary" onClick={this.getBeforeBookings}>
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                            </div>
                            : '' }
                        {this.state.nextKickoffDates.length > 0 ?
                            <div className={'float-right align-right mb-2'}>
                                <button type='button' className="btn btn-secondary" onClick={this.getNextBookings}>
                                    {this.state.nextKickoffDates.length < 2 ?
                                        DateUtility.convert(this.state.nextKickoffDates[0], DateUtility.DF_DATE, 'MM/DD(ddd)')
                                        : DateUtility.convert(this.state.nextKickoffDates[0], DateUtility.DF_DATE, 'MM/DD(ddd)') + ' ~ ' + DateUtility.convert(this.state.nextKickoffDates[this.state.nextKickoffDates.length - 1], DateUtility.DF_DATE, 'MM/DD(ddd)')
                                    }
                                    &nbsp;<i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                            : ''}
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th className={'booking-table-name text-center'}>골프장</th>
                                    {this.state.visibleKickoffDates.map(_kickoff_date => {
                                            const thClassName = getThClassName(_kickoff_date);
                                            return (<th className={thClassName} key={`booking-${_kickoff_date}`}>
                                                        {DateUtility.convert(_kickoff_date, DateUtility.DF_DATE, 'YYYY-MM-DD(ddd)')}
                                                        </th>)
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courses.length != 0 ?
                                    this.state.courses.map(course => {
                                        return <BookingRow key={`course-${course.id}`} course={course} visibleKickoffDates={this.state.visibleKickoffDates} />
                                    })
                                 : <tr><td className={'text-center'} colSpan={this.state.kickoff_dates.length + 1}>검색결과가 없습니다.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <div className={'text-center'}> <Spinner loading={true}/></div>}
            </div>
        )
    };
}

export default Courses;