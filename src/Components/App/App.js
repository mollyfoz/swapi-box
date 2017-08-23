import React, { Component } from 'react';
// import cleanData from '../../cleaner';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filmData: [],
      people: [],
      planets: [],
      vehicles: [],
    }
    this.getSubjectData = this.getSubjectData.bind(this)
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

  getSubjectData(string) {
    fetch(`https://swapi.co/api/${string}/`)
      .then(response => response.json())
      .then(parsedResponse => {
        if (string === 'people') {
          return this.fetchHomeworld(parsedResponse.results)
        } else if (string === 'planets') {
          return this.fetchPlanets(parsedResponse.results)
        } else {
          return this.fetchVehicles(parsedResponse.results)
        }
      })
      .then(results => {
        if (string === 'people') {
          return this.fetchSpecies(results)
        } else {
          return results
        }
      })
      .then(results => this.setState({ [string]: results }))
      .catch(error => console.log('error'))
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
