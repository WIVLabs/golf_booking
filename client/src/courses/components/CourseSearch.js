import React from "react";
import MultiDateForm from "../../components/MultiDateForm";
import GreenFeeRangeForm from "../../components/GreenFeeRangeForm";
import TimeRangeForm from "../../components/TimeRangeForm";
import RegionForm from "../../components/RegionForm";
import CourseForm from "../../components/CourseForm";
import moment from "moment";

class CourseSearch extends React.Component {

    constructor(props) {
        super(props);
        this.clickSearch = this.clickSearch.bind(this);
        this.state = {
            searchParams: this.props.searchparams
        };
    }

    clickSearch() {
        console.log('Search Params', this.state.searchParams);
        this.props.onClick(this.state.searchParams);
    }

    render() {
        return (
            <div className="border rounded border-info m-5 bg-light">
                <form style={{width: 800 + 'px'}} className="m-auto">
                    <div className="form-row">
                        <div className="col p-3"><MultiDateForm bookingdates={this.state.searchParams.booking_dates}
                                                                onChange={(_bookingDates) => this.state.searchParams.booking_dates = _bookingDates.map(_d => moment(_d).format('YYYY-MM-DD'))}/>
                        </div>
                        <div className="col p-3"><TimeRangeForm timerange={this.state.searchParams.time_range}
                                                                onChange={(_timeRange) => this.state.searchParams.time_range = _timeRange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col p-3"><RegionForm region={this.state.searchParams.region}
                                                             onChange={(_region) => this.state.searchParams.region = _region}/>
                        </div>
                        <div className="col p-3"><CourseForm course={this.state.searchParams.course}
                                                             onChange={(_course) => this.state.searchParams.course = _course}/>
                        </div>
                        <div className="col p-3"><GreenFeeRangeForm
                            greenfeerange={this.state.searchParams.greenfee_range}
                            onChange={(_range) => this.state.searchParams.greenfee_range = _range}/>
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <a className="btn btn-primary ml-auto" onClick={this.clickSearch}>
                            <i className="fa fa-golf-ball"></i> 검색
                        </a>
                    </div>
                </form>
            </div>
        )
    }
}

export default CourseSearch;