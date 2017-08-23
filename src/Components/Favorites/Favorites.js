import React from 'react'
import Card from '../Card/Card'
import './Favorites.css';

const Favorites = ({ favoritesArray, addFavorite }) => {

  const favoritedCards = () => {
    if (favoritesArray.length > 0) {
      return favoritesArray.map(obj => {
        return <Card
                  key={obj.id}
                  subjectDataObj={obj}
                  addFavorite={addFavorite}
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

export default Favorites;
