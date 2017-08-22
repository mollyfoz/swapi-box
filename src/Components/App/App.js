import React, { Component } from 'react';
import CleanData from '../../cleaner';
import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.cleanData = new CleanData()
    this.state = {
      newData: []
    }

  }

  fetchData(subject) {
    fetch(`https://swapi.co/api/${subject}/`)
          .then(response => response.json())
          .then(parsedResponse => {
          const parsedInfo = this.cleanData.cleanFilms(parsedResponse)
          this.setState({ newData: parsedInfo })
        })
        .catch(error => console.log('error'))
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <Header />
          <CardContainer />
        </div>
      </div>
    );
  }
}

export default App;
