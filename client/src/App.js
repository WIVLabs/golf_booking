import React, {Component} from 'react';
import {Route, HashRouter as Router} from 'react-router-dom'
import Moment from "moment";
import {extendMoment} from 'moment-range';

import Search from "./search/Search";
import Courses from "./courses/Courses";

import './App.scss';

const moment = extendMoment(Moment);

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Search}/>
                    <Route path="/courses/:searchParams" component={Courses}/>
                </div>
            </Router>
        );
    }
}
const range = moment.range(moment().add(1, 'days'), moment().add(7, 'days'));
const twoWeeks = Array.from(range.by('day'));
const SearchDefaultValues = {
    booking_dates: twoWeeks.map(m => m.format('YYYY-MM-DD')),
    time_range: {
        from: '6',
        to: '11'
    },
    region: '',
    course: '',
    greenfee_range: {
        from: '20000',
        to: '110000'
    }
}
export {
    SearchDefaultValues
}

export default App;