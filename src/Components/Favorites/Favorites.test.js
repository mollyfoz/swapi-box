import React, { Component } from 'react';
import Favorites from './Favorites/Favorites';
import { shallow, mount } from 'enzyme';

describe('Favorites component', () => {

  const mockArray = [
    { climate: "hot. like on fire. like its been targeted by a giant laser.",
      id: "Alderaan",
      planet: "Alderaan",
      population: "2000000000",
      residents: ["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"],
      starred: true,
      terrain: "grasslands, mountains"
    },
    { climate: "temperate, tropical",
      id: "Yavin IV",
      planet: "Yavin IV",
      population: "1000",
      residents: [],
      starred: true,
      terrain: "jungle, rainforests"
    }
  ]

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Favorites favoritesArray={mockArray} />)
  })

  test('Favorites should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('should render data cards if array has data in it', () => {
    expect(wrapper.find('.card-container').length).toEqual(1)
  })

  test('should show a message if the array is empty', () => {
    expect(wrapper.find('.empty-faves-title').text()).toEqual('Please favorite a card!')
  })

  test('should render an image if the array is empty', () => {
    expect(wrapper.find('.empty-image').length).toEqual(1)
  })
})
