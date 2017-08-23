import React from 'react'
import './Card.css'

const Card = ({ subjectDataObj, addFavorite }) => {

  const cardId = subjectDataObj.id

  const cardKeys = Object.keys(subjectDataObj)

  const filteredArray = cardKeys.filter( key => key !== 'id' )

  const keyArray = filteredArray.map(key => {
    return ( <h3 key={ key } className='card-info'> { key }: { subjectDataObj[key] } </h3> )
  })

  return (
    <div className='data-card'>
      { keyArray }
      <button className='favorite-btn' onClick={ () => addFavorite(cardId) }>favorite</button>
    </div>
  )
}

export default Card;
