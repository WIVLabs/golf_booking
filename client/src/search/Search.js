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
                                        <MultiDateForm bookingdates={this.props.booking_dates}
                                                       onChange={(_bookingDates) => this.state.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                                        <TimeRangeForm timerange={this.props.time_range}
                                                       onChange={(_timeRange) => this.state.time_range = _timeRange}/>
                                        <RegionForm region={this.props.region}
                                                    onChange={(_region) => this.setState({region: _region})}/>
                                        <GreenFeeRangeForm
                                            greenfeerange={this.props.greenfee_range}
                                            onChange={(_range) => this.state.greenfee_range = _range}/>
                                        <CourseForm course={this.props.course}
                                                    region={this.state.region}
                                                    onChange={(_course) => this.state.course = _course}/>
                                        <button type="button" className="btn btn-primary" onClick={this.clickSearch}><i
                                            className="fa fa-golf-ball"></i> 검색
                                        </button>
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