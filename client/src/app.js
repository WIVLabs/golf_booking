import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import main_page from './assets/image/main_page.jpg';
// import registerServiceWorker from './registerServiceWorker';


class App extends Component {
  render() {
      console.log(STATIC_URL);
    return (
      <div className="App">
        <header className="App-header">
          <img src={STATIC_URL+'/image/main_page.jpg'} className="App-logo" alt="logo" />
            <img src={main_page} className="App-logo" alt="logo" />
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