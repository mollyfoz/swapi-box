import React, { Component } from 'react';
// import cleanData from '../../cleaner';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filmData: []
    }
    this.getSubjectData = this.getSubjectData.bind(this)
  }

  getSubjectData(string) {
    console.log('string: ', string)
  }

  componentDidMount() {
    this.fetchData('films')
  }

  cleanData(dataObject) {
    const filmsArray = dataObject.results.map( obj => {
      return (
        Object.assign({},
          {
            title: obj.title,
            year: obj.release_date,
            crawl: obj.opening_crawl,
          })
      )
    })
    console.log(filmsArray)
    return filmsArray
  }

  fetchData(subject) {
    fetch(`https://swapi.co/api/${subject}/`)
      .then(response => response.json())
      .then(parsedResponse => this.cleanData(parsedResponse))
      .then(filmsArray => this.setState({ filmData: filmsArray }))
      .catch(error => console.log('error'))
  }

  render() {
    return (
      <div className="App">
        <Header getSubjectData={this.getSubjectData}/>
        {
          (this.state.filmData.length >= 1) &&
          <CardContainer filmData={this.state.filmData}/>
        }
      </div>
    );
  }
}

export default App;
