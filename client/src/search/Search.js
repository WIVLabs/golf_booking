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
        this.toggleCalendar = this.toggleCalendar.bind(this);

        this.clickSearch = this.clickSearch.bind(this);
    }

    changeCalendar(ob) {
        console.log(ob.selectedDates);
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

    toggleCalendar() {
        const {showCalendar} = this.state;
        this.setState({showCalendar: !showCalendar})
    }

    clickSearch() {
        this.props.history.push('./courses?');
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
                                        <MultiDateForm changeCalendar={this.changeCalendar}/>
                                        <TimeRangeForm changeTimeRange={this.changeTimeRange}/>
                                        <RegionForm changeRegion={this.changeRegion}/>
                                        <GreenFeeRangeForm changeGreenFeeRange={this.changeGreenFeeRange}/>
                                        <CourseForm changeCourse={this.changeCourse}/>
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