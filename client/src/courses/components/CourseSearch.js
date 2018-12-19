import React from "react";
import MultiDateForm from "../../components/MultiDateForm";
import GreenFeeRangeForm from "../../components/GreenFeeRangeForm";
import TimeRangeForm from "../../components/TimeRangeForm";
import RegionForm from "../../components/RegionForm";
import CourseForm from "../../components/CourseForm";
import './CourseSearch.scss';
import Moment from "moment";
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);

class CourseSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booking_dates: this.props.booking_dates,
            time_range: this.props.time_range,
            region: this.props.region,
            course: this.props.region,
            greenfee_range: this.props.greenfee_range
        };
    }

    render() {
        return (
            <header className="search-head text-light">
                <div className="wrap-head">
                    위브랩 골프
                </div>
                <div className="info-route open-detail">
                    <form className="ml-auto mr-auto mt-5 search-form">
                        <div className="form-row">
                            <div className="col p-3">
                                <MultiDateForm bookingdates={this.props.booking_dates}
                                               onChange={(_bookingDates) => this.state.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                            </div>
                            <div className="col p-3">
                                <TimeRangeForm timerange={this.props.time_range}
                                               onChange={(_timeRange) => this.state.time_range = _timeRange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col p-3">
                                <RegionForm region={this.props.region}
                                            onChange={(_region) => this.setState({region: _region})}/>
                            </div>
                            <div className="col p-3">
                                <CourseForm course={this.props.course}
                                            region={this.state.region}
                                            onChange={(_course) => this.state.course = _course}/>
                            </div>
                            <div className="col p-3">
                                <GreenFeeRangeForm greenfeerange={this.props.greenfee_range}
                                                   onChange={(_range) => this.state.greenfee_range = _range}/>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <a className="btn btn-primary ml-auto search-btn"
                               onClick={() => this.props.onClick(this.state)}>
                                <i className="fa fa-golf-ball"></i> 검색
                            </a>
                        </div>
                    </form>
                </div>
                <div></div>
            </header>
        )
    }
}

const range = moment.range(moment().add(1, 'days'), moment().add(7, 'days'));
const twoWeeks = Array.from(range.by('day'));
CourseSearch.defaultProps = {
    booking_dates: twoWeeks.map(m => m.format('YYYY-MM-DD')),
    time_range: {
        from: '6',
        to: '11'
    },
    region: '',
    course: '',
    greenfee_range: {
        from: '20000',
        to: '110000'
    }
};

export default CourseSearch;