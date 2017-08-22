import React from 'react'
import './Button.css'

const Button = ({ subject, getSubjectData }) => {

  return (
    <button className='subject-btn' onClick={ () => getSubjectData(subject) }>
    { subject }
    </button>
  )
}

export default Button;
