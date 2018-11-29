import React from "react";
import MultiDateForm from "../../components/MultiDateForm";
import GreenFeeRangeForm from "../../components/GreenFeeRangeForm";
import TimeRangeForm from "../../components/TimeRangeForm";
import RegionForm from "../../components/RegionForm";
import CourseForm from "../../components/CourseForm";

class CourseSearch extends React.Component {

    changeCalendar(ob) {
        console.log(ob)
    }

    changeTimeRange(ob) {
        console.log(ob.from_value + ' ~ ' + ob.to_value);
    }

    changeGreenFeeRange(ob) {
        console.log(ob.from + ' ~ ' + ob.to);
    }

    changeRegion(ob) {
        console.log(ob.target.value);
    }

    changeCourse(ob) {
        console.log(ob.target.value);
    }

    render() {
        return (
            <div className="border rounded border-info m-5">
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
                    <div className="form-row">
                        <button type="button" className="btn btn-primary" onClick={this.clickSearch}>
                            <i className="fa fa-golf-ball"></i> 검색
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CourseSearch;