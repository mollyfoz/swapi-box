import React, { Component } from 'react'
import Card from '../Card/Card'
import './CardContainer.css';


export default class CardContainer extends Component {
  constructor() {
    super();

  }

  render() {

    return (
      <div className='card-container'>
        <h3 className='container-instruction'>Select something</h3>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}
