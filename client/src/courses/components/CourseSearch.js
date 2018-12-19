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
            greenfee_range: this.props.greenfee_range,
            collapse: true
        };
    }

    render() {
        return (
            <header className="search-head text-light mb-3">
                <div className="wrap-head">
                    {this.state.collapse ? '간략정보를 넣어야함' : '위브랩 골프 샤샤샤샤샤샷!'}
                </div>
                {this.state.collapse ? '' :
                    <div className="info-route open-detail">
                        <form className="ml-auto mr-auto mt-5 search-form">
                            <div className="form-row">
                                <div className="col p-2">
                                    <MultiDateForm bookingdates={this.props.booking_dates} hastitle="false"
                                                   onChange={(_bookingDates) => this.state.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col p-2">
                                    <TimeRangeForm timerange={this.props.time_range} hastitle="false"
                                                   onChange={(_timeRange) => this.state.time_range = _timeRange}/>
                                </div>
                                <div className="col p-2">
                                    <GreenFeeRangeForm greenfeerange={this.props.greenfee_range} hastitle="false"
                                                       onChange={(_range) => this.state.greenfee_range = _range}/>
                                </div>
                            </div>
                            <div className="form-row mb-2">
                                <div className="col p-2">
                                    <RegionForm region={this.props.region} hastitle="false"
                                                onChange={(_region) => this.setState({region: _region})}/>
                                </div>
                                <div className="col p-2">
                                    <CourseForm course={this.props.course}
                                                region={this.state.region} hastitle="false"
                                                onChange={(_course) => this.state.course = _course}/>
                                </div>
                                <div className="col-sm-2 p-2">
                                    <a className="btn btn-danger btn-block search-btn"
                                       onClick={() => this.props.onClick(this.state)}>
                                        <i className="fa fa-golf-ball"></i> 검색
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>}
                <div className="text-center btn-wrapper">
                    <div className="btn btn-outline-light btn-collapse" onClick={() => {
                        this.setState({collapse: !this.state.collapse})
                    }}>
                        {this.state.collapse ?
                            <i className="fa fa-angle-down"></i> :
                            <i className="fa fa-angle-up"></i>}
                    </div>
                </div>
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