import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
import './Favorites.css';

const Favorites = ({ favoritesArray, toggleFavorite }) => {

  const favoritedCards = () => {
    if (favoritesArray.length > 0) {
      return favoritesArray.map(obj => {
        return <Card
                  key={obj.id}
                  subjectDataObj={obj}
                  toggleFavorite={toggleFavorite}
                />
      })
    } else {
      return <h3>Please favorite a card!</h3>
    }
  }

  return (
    <div className='card-container'>
      { favoritedCards() }
    </div>
  )
}

Favorites.propTypes = {
  favoritesArray: PropTypes.array,
  toggleFavorite: PropTypes.func
}

export default Favorites;
