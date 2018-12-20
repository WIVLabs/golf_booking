import React, {Component} from 'react';
import {Route, HashRouter as Router} from 'react-router-dom'
import './App.scss';

import Search from "./search/Search";
import Courses from "./courses/Courses";
import Moment from "moment";
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);


class App extends Component {


    // componentWillUnmount() {
    //     console.log('App Unmount', sessionStorage);
    //     for (let index = 0; index < sessionStorage.length; index++) {
    //         const key = sessionStorage.key(index);
    //         if (key && (key.startsWith('region_') || key.startsWith('course_'))) {
    //             sessionStorage.removeItem(key);
    //         }
    //     }
    // }

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