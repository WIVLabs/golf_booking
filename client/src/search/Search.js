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
        const start = moment().format('YYYY-MM-DD');
        const end = moment().add(2, 'weeks').format('YYYY-MM-DD');
        const range = moment.range(start, end);
        const twoweeks = Array.from(range.by('day'))

        this.state = {
            searchParams: {
                booking_dates: twoweeks.map(m => m.format('YYYY-MM-DD')),
                time_range: {
                    from: '6',
                    to: '11'
                },
                region: 'R02',
                course: '',
                greenfee_range: {
                    from: '20000',
                    to: '110000'
                }
            }
        };
    }

    clickSearch() {
        const params = JSON.stringify(this.state.searchParams);
        console.log('Search Params', JSON.stringify(this.state.searchParams));
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
                                        <MultiDateForm bookingdates={this.state.searchParams.booking_dates}
                                                       onChange={(_bookingDates) => this.state.searchParams.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                                        <TimeRangeForm timerange={this.state.searchParams.time_range}
                                                       onChange={(_timeRange) => this.state.searchParams.time_range = _timeRange}/>
                                        <RegionForm region={this.state.searchParams.region}
                                                    onChange={(_region) => this.state.searchParams.region = _region}/>
                                        <GreenFeeRangeForm
                                            greenfeerange={this.state.searchParams.greenfee_range}
                                            onChange={(_range) => this.state.searchParams.greenfee_range = _range}/>
                                        <CourseForm course={this.state.searchParams.course}
                                                    onChange={(_course) => this.state.searchParams.course = _course}/>
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

export default Search;