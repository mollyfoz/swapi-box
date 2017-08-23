import React from 'react'
import './Header.css';
import Nav from '../Nav/Nav';

const Header = ({ getSubjectData, count }) => {

  return(
    <header className='app-header'>
      <h1 className='heading'>SWAPI-BOX</h1>
      <Nav getSubjectData={ getSubjectData } count={ count }/>
    </header>
  )
}

export default Header;
