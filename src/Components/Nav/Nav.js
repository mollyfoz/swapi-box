import React from 'react'
import Button from '../Button/Button'
import './Nav.css'

const Nav = ({ getSubjectData }) => {

  const navBtnsArray = ['people', 'planets', 'vehicles']
  const mappedBtns = navBtnsArray.map((string, i) => {
    return <Button key={ i }
                   subject={ string }
                   getSubjectData={ getSubjectData }
            />
  })

  return (
    <div className='navigation'>
      { mappedBtns }
    </div>
  )
}

export default Nav;
