import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ subject, getSubjectData }) => {

  return (
    <button className='subject-btn' onClick={ () => getSubjectData(subject) }>
    { subject }
    </button>
  )
}

Button.propTypes = {
  subject: PropTypes.string,
  getSubjectData: PropTypes.func
}

export default Button;
