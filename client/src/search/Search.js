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

        this.state = {
            searchParams: {
                booking_dates: [],
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
        this.props.history.push('./courses/search_params=' + params);
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
                                        <MultiDateForm bookingdates={this.state.searchParams.booking_dates}/>
                                        <TimeRangeForm timerange={this.state.searchParams.time_range}/>
                                        <RegionForm region={this.state.searchParams.region}/>
                                        <GreenFeeRangeForm greenfeerange={this.state.searchParams.greenfee_range}/>
                                        <CourseForm course={this.state.searchParams.course}/>
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