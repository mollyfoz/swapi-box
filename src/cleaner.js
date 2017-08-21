export default class CleanData {
  contructor(data) {
    this.data = data.results;
  }

  cleanPeople() {

  }

  cleanFilms() {
    return this.data.map(obj => {
      { title: obj.title,
        year: obj.release_date,
        crawl: obj.opening_crawl }
    })
  }

  cleanPlanets() {

  }

  cleanVehicles() {

  }
}
