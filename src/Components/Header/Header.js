import React from 'react'
import './Header.css';
import Nav from '../Nav/Nav';

const Header = ({ getSubjectData }) => {

  return(
    <header className='app-header'>
      <h1 className='heading'>SWAPI-BOX</h1>
      <Nav getSubjectData={ getSubjectData }/>
    </header>
  )
}

export default Header;
