import React, { Component } from 'react';
import Search from './Search';
import logo from './topify-w.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className="App-image" src={ logo } alt="" />
        <Search />
      </div>
    );
  }
}

export default App;
