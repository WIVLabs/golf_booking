import React from "react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import './Courses.scss';
import CourseSearch from "./components/CourseSearch";
import BookingRow from "./components/BookingRow";
import {DateUtility, CollectionUtility, ObjectUtility} from "../components/Utility";
import Spinner from "../components/Spinner";
import Api from "../components/Api";

class Courses extends React.Component {

    constructor(props) {
        super(props);

        let {searchParams} = this.props.match.params;
        let paramsObj = JSON.parse(searchParams);
        console.log(paramsObj);
        this.state = {
            loadBookings: false,
            courses: [],
            searchParams: paramsObj,

            pageCursor: {},

            viewDateCount: 3,
            visibleKickoffDates: [],
            nextKickoffDates: [],
            beforeKickoffDates: [],

            golfCourseNameWidth:0,
            dateWidth:0
        }

        this.tableElement = React.createRef();
        this.tablePlaceName = React.createRef();
        this.tableDate = React.createRef();
        this.tableHeader = React.createRef();
        this.tableContainer = React.createRef();
        this.tableButtons = React.createRef();

        this.getBookings = this.getBookings.bind(this);
        this.changeSearchValues = this.changeSearchValues.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.drawNextBookings = this.drawNextBookings.bind(this);
        this.drawBeforeBookings = this.drawBeforeBookings.bind(this);
        this.initVisibleDate = this.initVisibleDate.bind(this);
        this.measureTableWidthAndRedrew = this.measureTableWidthAndRedrew.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.isTableBottomScroll = this.isTableBottomScroll.bind(this);
        this.getMoreCourses = this.getMoreCourses.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll);
        document.addEventListener('scroll', this.isTableBottomScroll);
        this.getBookings();
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
                this.measureTableWidthAndRedrew();
            }
        }
        else if (this.tableHeader.current.offsetTop < hidePosition) {
            if (this.tableHeader.current.classList.contains('fixed-head')) {
                this.tableHeader.current.classList.remove("fixed-head");
                this.tableButtons.current.classList.remove("fixed-button");
                this.measureTableWidthAndRedrew();
            }
        }
    }

    isTableBottomScroll() {
        if (this.isBottom(this.tableElement.current)) {
            document.removeEventListener('scroll', this.isTableBottomScroll);
            this.getMoreCourses(() => {
                document.addEventListener('scroll', this.isTableBottomScroll);
            });
        }
    }

    getMoreCourses(callback) {
        let {searchParams} = this.state;
        let params = Object.assign(searchParams);
        if (ObjectUtility.isEmpty(params.page)) {
            params.page = 2;
        }
        else {
            params.page += 1;
        }

        this.setState({searchParams : params, loadBookings: true});
        Api.getBookings(this.state.searchParams)
                .then(data => {
                    this.setState({
                        loadBookings: false,
                        courses: this.state.courses.concat(data.courses),
                        pageCursor: data.cursor
                    });

                    if (data.cursor.has_next) {
                        callback();
                    }
                });
    }

    isBottom(el) {
        if (ObjectUtility.isEmpty(el)) return false;

        return el.getBoundingClientRect().bottom - 100 <= window.innerHeight;
    }

    changeSearchValues(_params){
        const params = JSON.stringify(_params);
        console.log(params);
        this.props.history.push('./' + params);
        window.location.reload();
        return false;
    }

    goPrevPage() {
        this.props.history.push('/');
        return false;
    }

    getBookings() {
        this.setState({loadBookings : true});
        Api.getBookings(this.state.searchParams)
                .then(data => {
                    this.setState({
                        loadBookings: false,
                        pageCursor: data.cursor
                    });
                    this.initVisibleDate(data.courses, data.kickoff_dates);
                });

        return false;
    }

    initVisibleDate(totalCourses, totalKickoffDates) {
        let visibleDates = [];
        let nextKickoffDates = [];
        if (totalKickoffDates.length > this.state.viewDateCount) {
            visibleDates = totalKickoffDates.slice(0, this.state.viewDateCount);
            nextKickoffDates = totalKickoffDates.slice(this.state.viewDateCount, totalKickoffDates.length);
        }
        else {
            visibleDates = totalKickoffDates;
        }

        this.setState({
            courses: totalCourses,
            kickoff_dates: totalKickoffDates,
            visibleKickoffDates : visibleDates,
            nextKickoffDates: nextKickoffDates
        }, this.measureTableWidthAndRedrew);
    }

    drawBeforeBookings(){
        const {viewDateCount} = this.state;
        let {nextKickoffDates, beforeKickoffDates, visibleKickoffDates} = this.state;

        const beforeDatesLength = CollectionUtility.length(beforeKickoffDates);
        if (beforeDatesLength > viewDateCount) {
            const startIndex = beforeDatesLength - viewDateCount;
            nextKickoffDates = [...this.state.visibleKickoffDates, ...nextKickoffDates];
            visibleKickoffDates = beforeKickoffDates.slice(startIndex, beforeDatesLength);
            beforeKickoffDates = beforeKickoffDates.slice(0, startIndex);
        }
        else if (beforeDatesLength === viewDateCount) {
            nextKickoffDates = [...this.state.visibleKickoffDates, ...nextKickoffDates];
            visibleKickoffDates = beforeKickoffDates.slice(0, this.state.viewDateCount);
            beforeKickoffDates = [];
        }
        else if (beforeDatesLength < viewDateCount) {
            let enableKickoffDates = [...beforeKickoffDates.slice(0, beforeDatesLength), ...visibleKickoffDates];
            const enableLength = enableKickoffDates.length;
            nextKickoffDates = [...enableKickoffDates.slice(viewDateCount, enableLength), ...nextKickoffDates];
            visibleKickoffDates = enableKickoffDates.slice(0, viewDateCount);
            beforeKickoffDates = [];
        }

        this.setState({
            beforeKickoffDates: beforeKickoffDates,
            visibleKickoffDates : visibleKickoffDates,
            nextKickoffDates : nextKickoffDates
        }, this.measureTableWidthAndRedrew);
    }

    drawNextBookings(){
        const {viewDateCount} = this.state;
        let {nextKickoffDates, beforeKickoffDates, visibleKickoffDates} = this.state;

        const nextDatesLength = CollectionUtility.length(nextKickoffDates);
        if (nextDatesLength > viewDateCount) {
            beforeKickoffDates = [...beforeKickoffDates, ...this.state.visibleKickoffDates];
            visibleKickoffDates = nextKickoffDates.slice(0, this.state.viewDateCount);
            nextKickoffDates = nextKickoffDates.slice(this.state.viewDateCount, nextDatesLength);
        }
        else if (nextDatesLength === viewDateCount) {
            beforeKickoffDates = [...beforeKickoffDates, ...this.state.visibleKickoffDates];
            visibleKickoffDates = nextKickoffDates.slice(0, this.state.viewDateCount);
            nextKickoffDates = [];
        }
        else if (nextDatesLength < viewDateCount) {
            let enableKickoffDates = [...visibleKickoffDates, ...nextKickoffDates.slice(0, nextDatesLength)];
            const enableLength = enableKickoffDates.length;
            beforeKickoffDates = [...beforeKickoffDates, ...enableKickoffDates.slice(0, enableLength - viewDateCount)];
            visibleKickoffDates = [...visibleKickoffDates.slice(enableLength - viewDateCount, enableLength + 1), ...nextKickoffDates];
            nextKickoffDates = [];
        }

        this.setState({
            beforeKickoffDates: beforeKickoffDates,
            visibleKickoffDates : visibleKickoffDates,
            nextKickoffDates : nextKickoffDates
        }, this.measureTableWidthAndRedrew);
    };

    // 테이블의 날짜를 재 계산하여 정렬한다.
    measureTableWidthAndRedrew() {
        let thsLength = this.tableElement.current.offsetWidth - this.tablePlaceName.current.offsetWidth;
        const thLength = thsLength / (this.state.visibleKickoffDates.length < this.state.viewDateCount ? this.state.visibleKickoffDates.length : this.state.viewDateCount);

        let nextThElement = this.tablePlaceName.current.nextSibling;
        while(nextThElement) {
            nextThElement.style.minWidth = thLength;

            nextThElement = nextThElement.nextSibling;
        }

        this.setState({golfCourseNameWidth : this.tablePlaceName.current.offsetWidth, dateWidth:thLength});
    }

    getThClassName(kickoffDate) {
        let backgroundClass = '';
        const weekdayCode = DateUtility.getWeekdayCode(kickoffDate, DateUtility.DF_DATE);
        if (DateUtility.isSunday(weekdayCode)) {
            backgroundClass = 'booking-th-sunday-bg';
        } else if (DateUtility.isSaturday(weekdayCode)) {
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
        return (
            <div>
                <CourseSearch booking_dates={this.state.searchParams.booking_dates}
                              time_range={this.state.searchParams.time_range}
                              region={this.state.searchParams.region}
                              course={this.state.searchParams.course}
                              greenfee_range={this.state.searchParams.greenfee_range}
                              onClick={this.changeSearchValues}/>
                <div>
                    {this.state.visibleKickoffDates.length > 0 ?
                    <div className="container-fluid" ref={this.tableContainer} style={{minWidth: 1024 + 'px'}}>
                        <div ref={this.tableButtons}>
                        {this.state.beforeKickoffDates.length > 0 ?
                            <div className={'float-left mb-2'} >
                                <button type='button' className="btn btn-secondary" onClick={this.drawBeforeBookings}>
                                    <i className="fa fa-arrow-left"></i>&nbsp;{this.getButtonTitle(this.state.beforeKickoffDates)}
                                </button>
                            </div>
                            : '' }
                        {this.state.nextKickoffDates.length > 0 ?
                            <div className={'float-right align-right mb-2'}>
                                <button type='button' className="btn btn-secondary" onClick={this.drawNextBookings}>
                                    {this.getButtonTitle(this.state.nextKickoffDates)}&nbsp;<i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                            : ''}
                        </div>
                        <div className="table-responsive">
                            <table ref={this.tableElement} className="table table-striped table-bordered table-hover">
                                <thead>
                                <tr ref={this.tableHeader}>
                                    <th className={'booking-table-name text-center'} ref={this.tablePlaceName}>골프장</th>
                                    {this.state.visibleKickoffDates.map(_kickoff_date => {
                                            return <th className={this.getThClassName(_kickoff_date)} key={`booking-${_kickoff_date}`}>
                                                        {DateUtility.convert(_kickoff_date, DateUtility.DF_DATE, 'YYYY-MM-DD(ddd)')}
                                                   </th>
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courses.length != 0 && this.state.visibleKickoffDates.length !=0 ?
                                    this.state.courses.map(course => {
                                        return <BookingRow key={`course-${course.id}`} golfCourseNameWidth={this.state.golfCourseNameWidth} dateWidth={this.state.dateWidth} course={course} visibleKickoffDates={this.state.visibleKickoffDates} />
                                    })
                                 : <tr><td className={'text-center'} colSpan={this.state.kickoff_dates.length + 1}>검색결과가 없습니다.</td></tr>}
                                </tbody>
                            </table>
                            <ScrollUpButton EasingType="linear" />
                        </div>
                    </div>
                    : ''}
                </div>
                <Spinner loading={this.state.loadBookings}/>
            </div>
        )
    };
}

Courses.defaultProps = {
    searchParams: {}
}

export default Courses;