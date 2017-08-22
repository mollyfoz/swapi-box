import React from 'react'
import Card from '../Card/Card'
import './CardContainer.css';

const CardContainer = ({ filmData }) => {

  let randomFilmObj = filmData[Math.floor(Math.random() * filmData.length)]

  return (
    <div className='outer-container'>
      <div className="fade"></div>
      <div className='card-container'>
        <div className='inner-container'>
          <div className='title-yr-container'>
            <h3>{randomFilmObj.title}</h3>
            <h4>{randomFilmObj.year}</h4>
          </div>
          <p className='crawl-text'>{randomFilmObj.crawl}</p>
        </div>
      </div>
    </div>
  )
}

export default CardContainer
