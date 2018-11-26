import React from 'react';
import './Search.scss';
import IonSlider from '../components/IonSlider';
import Calendar from 'react-calendar-multiday';


const timeRangeData = "08:00,08:30,09:00,09:30,10:00,10:30,11:00,11:30," +
    "12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30," +
    "16:00,16:30,17:00,17:30,18:00,18:30,19:00";

class Search extends React.Component {

    constructor() {
        super();

        this.clickSearch = this.clickSearch.bind(this);
    }

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

    changeCourse(ob){
        console.log(ob.target.value);
    }

    clickSearch(obj) {
        this.props.history.push('./courses?name=good');
        return false;
    }

    render() {
        return (
            <div>
                <header className="masthead text-center d-flex">
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="border float-right bg-light p-4" style={{width: 500 + 'px'}}>
                                    <form>
                                        <div className="form-group">
                                            <label>일자</label>
                                            <Calendar
                                                isMultiple={true}
                                                onChange={this.changeCalendar}/>
                                        </div>
                                        <div className="form-group">
                                            <label>시간대</label>
                                            <IonSlider type="text" data-min="5"
                                                       data-max="8" data-from="0" data-to="10"
                                                       data-type="double" data-step="1"
                                                       data-prettify="false" data-hasgrid="true"
                                                       data-values={timeRangeData}
                                                       onChange={this.changeTimeRange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>지역</label>
                                            <select className="form-control" onChange={this.changeRegion}>
                                                <option value="경기">경기</option>
                                                <option value="제주">제주</option>
                                                <option value="강원도">강원도</option>
                                                <option value="충청도">충청도</option>
                                                <option value="우도">우도</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>그린피</label>
                                            <IonSlider type="text" data-min="10000"
                                                       data-max="200000" data-from="50000" data-to="200000"
                                                       data-type="double" data-step="10000"
                                                       data-prettify="false" data-hasgrid="true"
                                                       onChange={this.changeGreenFeeRange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>골프장</label>
                                            <select className="form-control" onChange={this.changeCourse}>
                                                <option value="A골프장">A골프장</option>
                                                <option value="A골프장">B골프장</option>
                                                <option value="A골프장">C골프장</option>
                                                <option value="A골프장">D골프장</option>
                                            </select>
                                        </div>
                                        {/*조회버튼*/}
                                        <div className="form-group">
                                            <a href='javascript:;' className="form-control bg-primary" onClick={this.clickSearch}>조회하기</a>
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

export default Search;