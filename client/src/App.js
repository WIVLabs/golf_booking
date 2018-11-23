import React, { Component } from 'react';
import './App.scss';

import Search from "./search/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
      </div>
    );
  }
}

export default App;