export default class CleanData {
  cleanPeople() {

  }

  cleanFilms(object) {
    return object.results.map(obj => {
      return (
        { title: obj.title,
          year: obj.release_date,
          crawl: obj.opening_crawl }
      )
    })
  }

  cleanPlanets() {

  }

  cleanVehicles() {

  }
}
