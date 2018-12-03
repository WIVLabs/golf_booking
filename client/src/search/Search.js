import React from 'react';
import './Search.scss';
import MultiDateForm from "../components/MultiDateForm";
import TimeRangeForm from "../components/TimeRangeForm";
import RegionForm from "../components/RegionForm";
import GreenFeeRangeForm from "../components/GreenFeeRangeForm";
import CourseForm from "../components/CourseForm";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.clickSearch = this.clickSearch.bind(this);

        //TODO 각 디폴트 값을 설정해줘야 함.
        this.state = {
            searchParams: {
                booking_dates: [],
                time_range: {
                    from: {},
                    to: {}
                },
                region: '',
                course: '',
                greenfee_range: {
                    from: {},
                    to: {}
                }
            }
        };
    }

    clickSearch() {
        console.log('Search Params', this.state.searchParams);
        const params = new URLSearchParams();
        params.set('booking_dates', this.state.searchParams.booking_dates);
        params.set('time_range_from', this.state.searchParams.time_range.from);
        params.set('time_range_to', this.state.searchParams.time_range.to);
        params.set('region', this.state.searchParams.region);
        params.set('course', this.state.searchParams.course);
        params.set('greenfee_range_from', this.state.searchParams.greenfee_range.from);
        params.set('greenfee_range_to', this.state.searchParams.greenfee_range.to);
        this.props.history.push('./courses/' + params.toString());
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
                                        <MultiDateForm searchParams={this.state.searchParams}/>
                                        <TimeRangeForm searchParams={this.state.searchParams}/>
                                        <RegionForm searchParams={this.state.searchParams}/>
                                        <GreenFeeRangeForm searchParams={this.state.searchParams}/>
                                        <CourseForm searchParams={this.state.searchParams}/>
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