import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css';

const CardContainer = ({ stateData }) => {

  const subjectCards = () => {
    if (stateData.data.length > 0) {
      return stateData.data.map(obj => {
        return <Card subjectDataObj={obj} />
      })
    }
  }

  return (
    <div className='card-container'>
      { subjectCards() }
    </div>
  )
}

export default CardContainer
