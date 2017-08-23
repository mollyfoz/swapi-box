import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import CardContainer from '../CardContainer/CardContainer';
import OpenScroll from '../OpenScroll/OpenScroll';
import Favorites from '../Favorites/Favorites';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favoritesCount: 0,
      favoritesArray: [],
      buttonClicked: 'openScroll',
      filmData: [],
      data: []
    }
    this.getSubjectData = this.getSubjectData.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.displayFavorites = this.displayFavorites.bind(this)
  }

  componentDidMount() {
    this.fetchFilms('films')
  }

  addFavorite(id) {
    const favoriteCard = this.state.data.filter( object => object.id === id )
    const newFavoritesArray = [...this.state.favoritesArray, ...favoriteCard]
    this.setState({
      favoritesCount: newFavoritesArray.length,
      favoritesArray: newFavoritesArray
    })
  }

  displayFavorites() {
    this.setState({ buttonClicked: 'favorites' })
  }

  idGenerator() {
    let S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  }

  fetchHomeworld(peopleResults) {
    const peopleArray = peopleResults.map(person => {
      return fetch(person.homeworld)
        .then(response => response.json())
    })
    return Promise.all(peopleArray)
      .then(response => {
        return response.map((planet, i) => {
          return Object.assign({}, { id: this.idGenerator(), name: peopleResults[i].name, species: peopleResults[i].species }, { homeworld: planet.name, population: planet.population })
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
          return Object.assign({}, { id: this.idGenerator(), planet: planetResults[i].name, terrain: planetResults[i].terrain, population: planetResults[i].population, climate: planetResults[i].climate }, { residents: array })
        })
      })
  }

  fetchVehicles(vehiclesArray) {
    return vehiclesArray.map( vehicle => {
      return Object.assign({},
        {
          id: this.idGenerator(),
          vehicle: vehicle.name,
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
      .catch(error => console.log(error))
  }

  cleanFilmData(dataObject) {
    const filmsArray = dataObject.results.map( obj => {
      return (
        Object.assign({},
          {
            id: this.idGenerator(),
            title: obj.title,
            year: obj.release_date,
            crawl: obj.opening_crawl,
          })
        )
      })
      return filmsArray
  }

  getSubjectData(string) {

    this.setState({ buttonClicked: 'loading'}, () => {
      if (string === 'films') {
        this.setState({ buttonClicked: 'subjectData', data: this.state.filmData })
      } else {
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
        .then(results => this.setState({ buttonClicked: 'subjectData', data: results}))
        .catch(error => console.log(error))
      }
    })
  }

  render() {

    const { filmData, buttonClicked, data, favoritesCount, favoritesArray } = this.state

    const renderOpenScroll = () => {
      if ((filmData.length > 0) && (buttonClicked === 'openScroll' )) {
        return <OpenScroll filmData={filmData} />
      }
    }

    const renderLoading = () => {
      if (buttonClicked === 'loading') {
        return <Loading />
      }
    }

    const renderFavorites = () => {
      if (buttonClicked === 'favorites') {
        return <Favorites favoritesArray={favoritesArray} addFavorite={this.addFavorite} />
      }
    }

    const renderSubjectData = () => {
      if (buttonClicked === 'subjectData') {
        return <CardContainer stateData={data} addFavorite={this.addFavorite} />
      }
    }

    return (
      <div className="App">
        <Header
          getSubjectData={this.getSubjectData}
          count={favoritesCount}
          displayFavorites={this.displayFavorites}
        />
        { renderSubjectData() }
        { renderOpenScroll() }
        { renderLoading() }
        { renderFavorites() }
      </div>
    );
  }
}


export default App;
