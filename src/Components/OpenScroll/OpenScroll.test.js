import React, { Component } from 'react';
import OpenScroll from './OpenScroll/OpenScroll';
import { shallow, mount } from 'enzyme';

describe('OpenScroll component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<OpenScroll />)
  })

  test('OpenScroll should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('should render open scroll container', () => {
    expect(wrapper.find('.outer-container').length).toEqual(1)
  })
})
