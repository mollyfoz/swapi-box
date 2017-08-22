import React from 'react'
import Nav from '../Nav/Nav'
import './Header.css'

const Header = () => {

  return(
    <div className='app-header'>
      <h1 className='title'>STAR WARS</h1>
      <Nav />
    </div>
  )
}

export default Header;
