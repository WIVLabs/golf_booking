import React from "react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import './Courses.scss';
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {DateUtility, CollectionUtility, ObjectUtility} from "../components/Utility";
import Spinner from "../components/Spinner";
import {fetchGetBookings, nextDays, prevDays, setTableHeaderWidth} from "../actions";
import {connect} from "react-redux";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        let {searchParams} = this.props.match.params;
        let paramsObj = JSON.parse(searchParams);
        paramsObj.page = 1;
        this.state = {
            searchParams: paramsObj,
        };

        this.tableElement = React.createRef();
        this.tablePlaceName = React.createRef();
        this.tableDate = React.createRef();
        this.tableHeader = React.createRef();
        this.tableContainer = React.createRef();
        this.tableButtons = React.createRef();

        this.changeSearchValues = this.changeSearchValues.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.measureTable = this.measureTable.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.isTableBottomScroll = this.isTableBottomScroll.bind(this);
        this.getMoreCourses = this.getMoreCourses.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
        document.addEventListener('scroll', this.isTableBottomScroll);

        const {searchParams} = this.props.match.params;
        this.props.getBookings(JSON.parse(searchParams));
    }

    handleScroll() {
        if (ObjectUtility.isEmpty(this.tableContainer.current)) return;

        const buttonsWidth = this.tableButtons.current.offsetWidth;
        let hidePosition = this.tableContainer.current.offsetTop;
        if (event.srcElement.body.scrollTop > hidePosition) {
            if (!this.tableHeader.current.classList.contains('fixed-head')) {
                this.tableHeader.current.classList.add("fixed-head");
                this.tableButtons.current.classList.add("fixed-button");
                this.tableButtons.current.style.width = buttonsWidth;
                this.measureTable();
            }
        }
        else if (this.tableHeader.current.offsetTop < hidePosition) {
            if (this.tableHeader.current.classList.contains('fixed-head')) {
                this.tableHeader.current.classList.remove("fixed-head");
                this.tableButtons.current.classList.remove("fixed-button");
                this.measureTable();
            }
        }
    }

    isTableBottomScroll() {
        if (this.isBottom(this.tableElement.current) && this.props.hasMoreCourses & !this.props.loadBookings) {
            this.getMoreCourses();
        }
    }

    isBottom(el) {
        if (ObjectUtility.isEmpty(el)) return false;

        return el.getBoundingClientRect().bottom - 150 <= window.innerHeight;
    }

    getMoreCourses() {
        let params = Object.assign(this.state.searchParams);
        params.page += 1;
        this.props.getBookings(params);
    }

    changeSearchValues(_params){
        const params = JSON.stringify(_params);
        this.props.history.push('./' + params);
        window.location.reload();
        return false;
    }

    goPrevPage() {
        this.props.history.push('/');
        return false;
    }

    // 테이블의 헤더를 재 계산하여 정렬한다.
    measureTable() {
        if (ObjectUtility.isEmpty(this.tableElement.current)) return;

        let thsLength = this.tableElement.current.offsetWidth - this.tablePlaceName.current.offsetWidth;
        const thLength = thsLength / (this.props.currentDates.length < this.props.viewDateCount ? this.props.currentDates.length : this.props.viewDateCount);

        this.props.setTableHeaderWidth(this.tablePlaceName.current.offsetWidth, thLength);
    }

    getThClassName(kickoffDate) {
        let backgroundClass = '';
        if (DateUtility.isSundayByDate(kickoffDate)) {
            backgroundClass = 'booking-th-sunday-bg';
        }
        else if (DateUtility.isSaturdayByDate(kickoffDate)) {
            backgroundClass = 'booking-th-saturday-bg';
        }
        return `booking-table-date text-center ${backgroundClass}`;
    };

    getButtonTitle(buttonDates) {
        let title, startDate, endDate = '';
        switch (CollectionUtility.length(buttonDates)) {
            case 0:
                title = '';
                break;
            case 1:
                title = DateUtility.convert(buttonDates[0], DateUtility.DF_DATE, 'MM/DD(ddd)');
                break;
            case 2:
                startDate = DateUtility.convert(buttonDates[0], DateUtility.DF_DATE, 'MM/DD(ddd)');
                endDate = DateUtility.convert(buttonDates[buttonDates.length - 1], DateUtility.DF_DATE, 'MM/DD(ddd)');
                title = `${startDate}, ${endDate}`;
                break;
            default:
                startDate = DateUtility.convert(buttonDates[0], DateUtility.DF_DATE, 'MM/DD(ddd)');
                endDate = DateUtility.convert(buttonDates[buttonDates.length - 1], DateUtility.DF_DATE, 'MM/DD(ddd)');
                title = `${startDate}..${endDate}`;
                break;
        }

        return title;
    };

    render() {
        const {currentDates, prevDates, nextDates, courses, golfCourseNameWidth, dateWidth, kickoff_dates} = this.props;
        let {searchParams} = this.state;

        return (
            <div>
                <CourseSearch booking_dates={searchParams.booking_dates}
                              time_range={searchParams.time_range}
                              region={searchParams.region}
                              course={searchParams.course}
                              greenfee_range={searchParams.greenfee_range}
                              onClick={this.changeSearchValues}/>
                <div>
                    {currentDates.length > 0 ?
                    <div className="container-fluid" ref={this.tableContainer} style={{minWidth: 1024 + 'px'}}>
                        <div ref={this.tableButtons}>
                        {prevDates.length > 0 ?
                            <div className={'float-left mb-2'} >
                                <button type='button' className="btn btn-secondary" onClick={this.props.onPrevClick}>
                                    <i className="fa fa-arrow-left"></i>&nbsp;{this.getButtonTitle(prevDates)}
                                </button>
                            </div>
                            : '' }
                        {nextDates.length > 0 ?
                            <div className={'float-right align-right mb-2'}>
                                <button type='button' className="btn btn-secondary" onClick={this.props.onNextClick}>
                                    {this.getButtonTitle(nextDates)}&nbsp;<i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                            : ''}
                        </div>
                        <div className="table-responsive">
                            <table ref={this.tableElement} className="table table-striped table-bordered table-hover">
                                <thead>
                                <tr ref={this.tableHeader}>
                                    <th className={'booking-table-name text-center'} ref={this.tablePlaceName} style={{minWidth: this.props.golfCourseNameWidth + 'px'}}>골프장</th>
                                    {this.props.currentDates.map(_kickoff_date => {
                                            return <th className={this.getThClassName(_kickoff_date)} key={`booking-${_kickoff_date}`} style={{minWidth: this.props.dateWidth + 'px'}}>
                                                        {DateUtility.convert(_kickoff_date, DateUtility.DF_DATE, 'YYYY-MM-DD(ddd)')}
                                                   </th>
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {courses.length != 0 && this.props.currentDates.length !=0 ?
                                    courses.map(course => {
                                        return <BookingRow key={`course-${course.id}`} golfCourseNameWidth={golfCourseNameWidth} dateWidth={dateWidth} course={course} visibleKickoffDates={currentDates} />
                                    })
                                 : <tr><td className={'text-center'} colSpan={kickoff_dates.length + 1}>검색결과가 없습니다.</td></tr>}
                                </tbody>
                            </table>
                            <ScrollUpButton EasingType="linear" />
                        </div>
                    </div>
                    : ''}
                </div>
                <Spinner loading={this.props.loadBookings} />
            </div>
        )
    };
}

Courses.defaultProps = {
    searchParams: {}
};


const mapStateToProps = (state) => {
    return {
        searchParams: state.bookings.searchParams,

        viewDateCount: state.bookings.viewDateCount,
        loadBookings: state.bookings.loadBookings,
        courses: state.bookings.courses,
        kickoff_dates: state.bookings.kickoff_dates,
        hasMoreCourses: state.bookings.cursor.has_next,
        currentDates: state.bookings.currentDates,
        nextDates: state.bookings.nextDates,
        prevDates: state.bookings.prevDates,

        golfCourseNameWidth: state.table.golfCourseNameWidth,
        dateWidth: state.table.dateWidth
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBookings: (searchParams) => {
            dispatch(fetchGetBookings(searchParams));
        },
        onNextClick: () => {
            dispatch(nextDays())
        },
        onPrevClick: () => {
            dispatch(prevDays())
        },
        setTableHeaderWidth:(golfCourseNameWidth, dateWidth) => {
            dispatch(setTableHeaderWidth(golfCourseNameWidth, dateWidth));
        }
    }
};

Courses = connect(mapStateToProps, mapDispatchToProps)(Courses);

export default Courses;