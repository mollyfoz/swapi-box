import React, { Component } from 'react';
import Favorites from './Favorites/Favorites';
import { shallow, mount } from 'enzyme';

describe('Favorites component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Favorites />)
  })

  test('Favorites should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('should render open scroll container', () => {
    expect(wrapper.find('.card-container').length).toEqual(1)
  })
})
