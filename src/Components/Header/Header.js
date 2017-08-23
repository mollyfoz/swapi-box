import React from 'react'
import PropTypes from 'prop-types'
import './Header.css';
import Nav from '../Nav/Nav';

const Header = ({ getSubjectData, count, displayFavorites }) => {

  return(
    <header className='app-header'>
      <h1 className='heading'>SWAPI-BOX</h1>
      <Nav getSubjectData={ getSubjectData }
           count={ count }
           displayFavorites={ displayFavorites }
      />
    </header>
  )
}

Header.propTypes = {
  getSubjectData: PropTypes.func,
  count: PropTypes.number,
  displayFavorites: PropTypes.func
}

export default Header;
