import React from 'react';
import './Search.scss';
import IonSlider from '../components/IonSlider';
import MultiDatePicker from '../components/MultiDatePicker';

class Search extends React.Component {
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
                                            <label htmlFor="exampleFormControlInput1">일자</label>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">시간대</label>
                                            <IonSlider type="text" data-min="5"
                                                       data-max="8" data-from="0" data-to="10"
                                                       data-type="double" data-step="1"
                                                       data-prettify="false" data-hasgrid="true"
                                                       data-values="
                                                            08:00, 08:15, 08:30, 08:45,
                                                            09:00, 09:15, 09:30, 09:45,
                                                            10:00, 10:15, 10:30, 10:45,
                                                            11:00, 11:15, 11:30, 11:45,
                                                            12:00, 12:15, 12:30, 12:45,
                                                            13:00, 13:15, 13:30, 13:45,
                                                            14:00, 14:15, 14:30, 14:45,
                                                            15:00, 15:15, 15:30, 15:45,
                                                            16:00, 16:15, 16:30, 16:45,
                                                            17:00, 17:15, 17:30, 17:45,
                                                            18:00, 18:15, 18:30, 18:45,
                                                            19:00"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect2">지역</label>
                                            <select className="form-control" id="exampleFormControlSelect2">
                                                <option>경기</option>
                                                <option>제주</option>
                                                <option>강원도</option>
                                                <option>충청도</option>
                                                <option>우도</option>
                                            </select>
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