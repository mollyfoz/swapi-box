import React, { Component } from 'react';
import CleanData from '../../cleaner';
import mockData from ''
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.cleanData = new CleanData(mockData)
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
