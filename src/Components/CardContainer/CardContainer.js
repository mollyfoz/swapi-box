import React from 'react'
import Card from '../Card/Card'
import PropTypes from 'prop-types'
import './CardContainer.css';

const CardContainer = ({ stateData, addFavorite }) => {

  const subjectCards = () => {
    if (stateData.length > 0) {
      return stateData.map(obj => {
        return <Card
                  key={obj.id}
                  subjectDataObj={obj}
                  addFavorite={addFavorite}
                />
      })
    }
  }

  return (
    <div className='card-container'>
      { subjectCards() }
    </div>
  )
}

CardContainer.propTypes = {
  stateData: PropTypes.array,
  addFavorite: PropTypes.func
}

export default CardContainer
