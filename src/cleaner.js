
const cleanData = (dataObject) => {

  const filmsArray = dataObject.results.map( obj => {
    return (
      { title: obj.title,
        year: obj.release_date,
        crawl: obj.opening_crawl,
      }
    )
  })
  console.log(filmsArray)
  return filmsArray
}

export default cleanData
