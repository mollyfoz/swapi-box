import React, { Component } from 'react';
import cleanData from '../../cleaner';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newData: []
    }
  }

  fetchData(subject) {
    fetch(`https://swapi.co/api/${subject}/`)
          .then(response => response.json())
          .then(parsedResponse => {
          const parsedInfo = cleanData(parsedResponse)
          this.setState({ newData: parsedInfo })
          })
          .catch(error => console.log('error'))
  }

  render() {
    return (
      <div className="App">
        <Header />

        <CardContainer />
      </div>
    );
  }
}

export default App;
