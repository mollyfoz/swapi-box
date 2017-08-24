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
    this.toggleFavorite = this.toggleFavorite.bind(this)
    this.displayFavorites = this.displayFavorites.bind(this)
  }

  componentDidMount() {
    this.fetchFilms('films')
  }

  toggleFavorite(id) {
    const stateDataItem = this.state.data.filter( object => object.id === id )
    const favesDataItem = this.state.favoritesArray.filter( object => object.id === id)

    // if the object exists in both the data and favorites array

    if (stateDataItem.length === 1 && favesDataItem.length === 1) {

      const toggledObj = Object.assign(stateDataItem[0], { starred: !stateDataItem[0].starred })

      // do I need to get the index of the object originally in favesArray for favesIndex const??

      const favesIndex = this.state.favoritesArray.indexOf(toggledObj)
      const dataIndex = this.state.data.indexOf(toggledObj)
      this.state.favoritesArray.splice(favesIndex, 1)
      this.state.data.splice(dataIndex, 1, toggledObj)

      this.setState({
        favoritesCount: this.state.favoritesArray.length,
        favoritesArray: this.state.favoritesArray,
        data: this.state.data
      })

      return
    }

    // if the object exists in just the favoritesArray, but not data

    if (favesDataItem.length === 1) {
      const toggledObj = Object.assign(favesDataItem[0], { starred: !favesDataItem[0].starred })

      const favesIndex = this.state.favoritesArray.indexOf(toggledObj)
      this.state.favoritesArray.splice(favesIndex, 1)

      this.setState({
        favoritesCount: this.state.favoritesArray.length,
        favoritesArray: this.state.favoritesArray,
      })
    }

    // if the object exists in just the data array and not favorites, meaning it needs to be added to the favorites array

    if (stateDataItem.length === 1) {
      const toggledObj = Object.assign(stateDataItem[0], { starred: !stateDataItem[0].starred })

      const newFavoritesArray = [...this.state.favoritesArray, toggledObj]
      this.setState({
        favoritesCount: newFavoritesArray.length,
        favoritesArray: newFavoritesArray,
      })

      return
    }
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
          return Object.assign({}, { id: this.idGenerator(), starred: false, name: peopleResults[i].name, species: peopleResults[i].species }, { homeworld: planet.name, population: planet.population })
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
          return Object.assign({}, { id: this.idGenerator(), starred: false, planet: planetResults[i].name, terrain: planetResults[i].terrain, population: planetResults[i].population, climate: planetResults[i].climate }, { residents: array })
        })
      })
  }

  fetchVehicles(vehiclesArray) {
    return vehiclesArray.map( vehicle => {
      return Object.assign({},
        {
          id: this.idGenerator(),
          starred: false,
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
            starred: false,
            title: obj.title,
            year: obj.release_date,
            crawl: obj.opening_crawl,
          })
        )
      })
      return filmsArray
  }

  mutateFavoritedData(dataArray) {
    // array of objects passed in, and check if any objects ids in that array match with the objects ids in favorites array, if they do, then change the starred status to true
    // this is still in progress
    if (this.state.favoritesArray.length > 0) {
      const favesIds = this.state.favoritesArray.map( object => object.id)
      const newArray = dataArray.filter( object => {
        let matchedId = favesIds.filter( id => id === object.id )
        if ( matchedId.length === 1) {
          return object
        }
      console.log('newArray', newArray);
      })
    } else {
      return dataArray
    }
  }

  getSubjectData(string) {

    this.setState({ buttonClicked: 'loading'}, () => {
      if (string === 'films') {
        // this.mutateFavoritedData()
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
        .then(results => {
          this.mutateFavoritedData(results)
          this.setState({ buttonClicked: 'subjectData', data: results})
        })
        .catch(error => console.log(error))
      }
    })
  }

  // remember to compare the favoritesArray with the results from line 213 before setting to state.

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
        return <Favorites favoritesArray={favoritesArray} toggleFavorite={this.toggleFavorite} />
      }
    }

    const renderSubjectData = () => {
      if (buttonClicked === 'subjectData') {
        return <CardContainer stateData={data} toggleFavorite={this.toggleFavorite} />
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
