import React, { Component } from 'react';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import OpenScroll from '../OpenScroll/OpenScroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filmData: [],
      data: []
    }
    this.getSubjectData = this.getSubjectData.bind(this)
  }

  componentDidMount() {
    this.fetchFilms('films')
  }

  fetchHomeworld(peopleResults) {
    const peopleArray = peopleResults.map(person => {
      return fetch(person.homeworld)
        .then(response => response.json())
    })
    return Promise.all(peopleArray)
      .then(response => {
        return response.map((planet, i) => {
          return Object.assign({}, { name: peopleResults[i].name, species: peopleResults[i].species }, { homeworld: planet.name, population: planet.population })
        })
    })
  }

  fetchSpecies(updatedPeopleResults) {
    const completePeopleArray = updatedPeopleResults.map(person => {
      return fetch(person.species[0])
        .then(response => response.json())
    })
    return Promise.all(completePeopleArray)
      .then(response => {
        return response.map((species, i) => {
          return Object.assign( updatedPeopleResults[i], { species: species.name })
        })
    })
  }

  fetchResidents(planetResidentsArray) {
    const planetResidents = planetResidentsArray.map( endpoint => {
      return fetch(endpoint)
        .then(response => response.json())
    })
    return Promise.all(planetResidents)
      .then(response => {
        return response.map( resident => {
          return resident.name
        })
      })

  }

  fetchPlanets(planetResults) {
    const planetArray = planetResults.map(planet => {
      const planetResidents = this.fetchResidents(planet.residents)
      return planetResidents
    })

    return Promise.all(planetArray)
      .then( response => {
        return response.map( (array, i) => {
          return Object.assign({}, { planet: planetResults[i].name, terrain: planetResults[i].terrain, population: planetResults[i].population, climate: planetResults[i].climate }, { residents: array })
        })
      })
  }

  fetchVehicles(vehiclesArray) {
    return vehiclesArray.map( vehicle => {
      return Object.assign({},
        { vehicle: vehicle.name,
          model: vehicle.model,
          class: vehicle.vehicle_class,
          passengers: vehicle.passengers
        })
    })
  }

  fetchFilms(subject) {
    fetch(`https://swapi.co/api/${subject}/`)
      .then(response => response.json())
      .then(parsedResponse => this.cleanFilmData(parsedResponse))
      .then(filmsArray => this.setState({ filmData: filmsArray }))
      .catch(error => console.log('error'))
  }

  cleanFilmData(dataObject) {
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
      return filmsArray
  }

  getSubjectData(string) {
    fetch(`https://swapi.co/api/${string}/`)
      .then(response => response.json())
      .then(parsedResponse => {
        console.log('#1:')
        if (string === 'people') {
          return this.fetchHomeworld(parsedResponse.results)
        } else if (string === 'planets') {
          return this.fetchPlanets(parsedResponse.results)
        } else {
          return this.fetchVehicles(parsedResponse.results)
        }
      })
      .then(results => {
        console.log('#2:')
        if (string === 'people') {
          return this.fetchSpecies(results)
        } else {
          return results
        }
      })
      .then(results => {
        console.log('results: ', results);
        this.setState({ data: results }, () => { console.log(this.state.data)
        return results })
      })
      .catch(error => console.log('error'))
  }

  render() {

    const renderSubject = () => {
      if (this.state.data.length >= 1) {
        return <CardContainer stateData={this.state.data} />
      } else if (this.state.filmData.length >= 1) {
        return <OpenScroll filmData={this.state.filmData} />
      }
    }

    return (
      <div className="App">
        <Header getSubjectData={this.getSubjectData}/>
        { renderSubject() }
      </div>
    );
  }
}

export default App;
