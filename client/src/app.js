import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/assets/image/main_page.jpg" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('react-app'));
// registerServiceWorker();