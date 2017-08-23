import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css';

const CardContainer = ({ stateData }) => {

  const subjectCards = stateData.map(obj => {
    return <Card subjectData={obj} />
  })

  return (
    <div className='card-container'>
      { subjectCards }
    </div>
  )
}

export default CardContainer
