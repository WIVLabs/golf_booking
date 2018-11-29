import React from "react";
import MultiDateForm from "../../components/MultiDateForm";
import GreenFeeRangeForm from "../../components/GreenFeeRangeForm";
import TimeRangeForm from "../../components/TimeRangeForm";
import RegionForm from "../../components/RegionForm";
import CourseForm from "../../components/CourseForm";

const params = {};

class CourseSearch extends React.Component {


    constructor(props) {
        super(props);
        this.clickSearch = this.clickSearch.bind(this);

        //TODO 각 디폴트 값을 설정해줘야 함.
    }

    changeCalendar(ob) {
        console.log(ob.selectedDates);
        params.booking_dates = ob.selectedDates;
    }

    changeTimeRange(ob) {
        console.log(ob.from_value + ' ~ ' + ob.to_value);
        params.time_range = {from: ob.from_value, to: ob.to_value};
    }

    changeGreenFeeRange(ob) {
        console.log(ob.from + ' ~ ' + ob.to);
        params.greenfee_range = {from: ob.from, to: ob.to};
    }

    changeRegion(ob) {
        console.log(ob.target.value);
        params.region = ob.target.value;
    }

    changeCourse(ob) {
        console.log(ob.target.value);
        params.course = ob.target.value;
    }

    clickSearch() {
        console.log(params);
        this.props.onClick(params);
    }

    render() {
        return (
            <div className="border rounded border-info m-5 bg-light">
                <form style={{width: 800 + 'px'}} className="m-auto">
                    <div className="form-row">
                        <div className="col p-3"><MultiDateForm changeCalendar={this.changeCalendar}/></div>
                        <div className="col p-3"><TimeRangeForm changeTimeRange={this.changeTimeRange}/></div>
                    </div>
                    <div className="form-row">
                        <div className="col p-3"><RegionForm changeRegion={this.changeRegion}/></div>
                        <div className="col p-3"><CourseForm changeCourse={this.changeCourse}/></div>
                        <div className="col p-3"><GreenFeeRangeForm changeGreenFeeRange={this.changeGreenFeeRange}/>
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