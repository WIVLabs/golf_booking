import React, { Component } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom'
import './App.scss';

import Search from "./search/Search";
import Courses from "./courses/Courses";


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                  <Route exact path="/" component={Search} />
                  <Route path="/courses" component={Courses} />
                </div>
            </Router>
        );
    }
}

export default App;