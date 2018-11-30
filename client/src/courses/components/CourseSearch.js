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
        this.state = {searchParams: {}};
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
                        <div className="col p-3"><MultiDateForm searchParams={this.state.searchParams}/></div>
                        <div className="col p-3"><TimeRangeForm searchParams={this.state.searchParams}/></div>
                    </div>
                    <div className="form-row">
                        <div className="col p-3"><RegionForm searchParams={this.state.searchParams}/></div>
                        <div className="col p-3"><CourseForm searchParams={this.state.searchParams}/></div>
                        <div className="col p-3"><GreenFeeRangeForm searchParams={this.state.searchParams}/>
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