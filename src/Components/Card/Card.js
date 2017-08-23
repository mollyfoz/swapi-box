import React from 'react'
import './Card.css'

const Card = ({ subjectDataObj }) => {

  const cardKeys = Object.keys(subjectDataObj)

  const keyArray = cardKeys.map(key => {
    return ( <h3 className='card-info'> {key} : {subjectDataObj[key]} </h3> )
  })

  return (
    <div className='data-card'>
      { keyArray }
    </div>
  )
}

export default Card;
