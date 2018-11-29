import React from 'react';
import './Search.scss';
import IonSlider from '../plugin/IonSlider';
import Calendar from 'react-calendar-multiday';

const timeRangeData = "04:00,05:00,06:00,07:00,08:00,09:00,10:00,11:00,12:00,13:00,14:00,15:00," +
    "16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showCalendar: false};
        this.toggleCalendar = this.toggleCalendar.bind(this);

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

    changeCourse(ob) {
        console.log(ob.target.value);
    }

    toggleCalendar() {
        const {showCalendar} = this.state;
        this.setState({showCalendar: !showCalendar})
    }

    clickSearch(obj) {
        this.props.history.push('./courses');
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
                                        <div className="form-group">
                                            <label>일자</label><a className="btn btn-light text-primary ml-2" role="button" data-toggle="collapse" href="#date-calendar"><i
                                            className="fa fa-calendar-check"></i></a>
                                            <div id="date-calendar" className="collapse">
                                                <Calendar
                                                    isMultiple={true}
                                                    onChange={this.changeCalendar}/></div>
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
                                                       data-max="400000" data-from="10000" data-to="100000"
                                                       data-type="double" data-step="10000"
                                                       data-prettify="false" data-hasgrid="true"
                                                       onChange={this.changeGreenFeeRange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>골프장</label>
                                            <select className="form-control" onChange={this.changeCourse}>
                                                <option value="A골프장">A골프장</option>
                                                <option value="B골프장">B골프장</option>
                                                <option value="C골프장">C골프장</option>
                                                <option value="D골프장">D골프장</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={this.clickSearch}><i className="fa fa-golf-ball"></i> 검색</button>
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