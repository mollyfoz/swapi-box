import React from 'react'
import Button from '../Button/Button'
import './Nav.css'

const Nav = ({ getSubjectData, count }) => {

  const navBtnsArray = ['films', 'people', 'planets', 'vehicles']
  const mappedBtns = navBtnsArray.map((string, i) => {
    return <Button key={ i }
                   subject={ string }
                   getSubjectData={ getSubjectData }
            />
  })

  return (
    <div className='navigation'>
      { mappedBtns }
      <button className='all-favorites-btn'>favorites <span className='favorites-count'>{ count }</span> </button>
    </div>
  )
}

export default Nav;
