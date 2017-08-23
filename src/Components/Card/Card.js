import React from 'react'
import './Card.css'

const Card = ({ obj }) => {

  const cardKeys = Object.keys(obj)

  const keyArray = cardKeys.map(key => {
    return ( <h3> {key} : {obj[key]} </h3> )
  })

  return (
    <div className='data-card'>
      { keyArray }
    </div>
  )
}

export default Card;
