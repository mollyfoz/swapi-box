import React, { Component } from 'react';
import Error from './Error/Error';
import { shallow, mount } from 'enzyme';

describe('Error component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Error />)
  })

  test('Error should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('should render open scroll container', () => {
    expect(wrapper.find('.error-container').length).toEqual(1)
  })
})
