import React from 'react'
import './Header.css';
import Nav from '../Nav/Nav';

const Header = () => {

  return(
    <header className='app-header'>
      <h1 className='heading'>SWAPI-BOX</h1>
      <Nav />
    </header>
  )
}

export default Header;
