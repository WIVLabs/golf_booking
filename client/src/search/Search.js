import React from 'react';
import './Search.scss';
import MultiDateForm from "../components/MultiDateForm";
import TimeRangeForm from "../components/TimeRangeForm";
import RegionForm from "../components/RegionForm";
import GreenFeeRangeForm from "../components/GreenFeeRangeForm";
import CourseForm from "../components/CourseForm";
import Moment from "moment";
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.clickSearch = this.clickSearch.bind(this);

        this.state = {
            booking_dates: this.props.booking_dates,
            time_range: this.props.time_range,
            region: this.props.region,
            course: this.props.region,
            greenfee_range: this.props.greenfee_range
        };
    }

    clickSearch() {
        const params = JSON.stringify(this.state);
        console.log('Search Params', JSON.stringify(params));
        this.props.history.push('./courses/' + params);
        return false;
    }

    render() {
        return (
            <div>
                <header className="masthead d-flex">
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-12 mx-auto">
                                <div className="border rounded border-light float-right bg-search-panel p-5">
                                    <form>
                                        <div className="mb-5">
                                            <MultiDateForm bookingdates={this.props.booking_dates} hastitle="false"
                                                           onChange={(_bookingDates) => this.state.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                                        </div>
                                        <div className="mb-5">
                                            <TimeRangeForm timerange={this.props.time_range} hastitle="false"
                                                           onChange={(_timeRange) => this.state.time_range = _timeRange}/>
                                        </div>
                                        <div className="mb-5">
                                            <GreenFeeRangeForm
                                                greenfeerange={this.props.greenfee_range} hastitle="false"
                                                onChange={(_range) => this.state.greenfee_range = _range}/>
                                        </div>
                                        <div className="mb-5">
                                            <RegionForm region={this.props.region} hastitle="false"
                                                        onChange={(_region) => this.setState({region: _region})}/>
                                        </div>
                                        <div className="mb-5">
                                            <CourseForm course={this.props.course}
                                                        region={this.state.region} hastitle="false"
                                                        onChange={(_course) => this.state.course = _course}/>
                                        </div>
                                        <div className="float-right">
                                            <button type="button" className="btn btn-danger" onClick={this.clickSearch}>
                                                <i className="fa fa-golf-ball"></i> 검색
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

const range = moment.range(moment().add(1, 'days'), moment().add(7, 'days'));
const twoWeeks = Array.from(range.by('day'));
Search.defaultProps = {
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

export default Search;