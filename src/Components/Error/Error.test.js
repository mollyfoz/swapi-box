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

  test('should render error display', () => {
    expect(wrapper.find('.error-container').length).toEqual(1)
  })

  test('should display error message text', () => {
    expect(wrapper.find('h3').text()).toEqual('Sorry, we are unable to retrieve your data at this time.')
  })

  test('should display error message image', () => {
    expect(wrapper.find('.error-image').length).toEqual(1)
  })
})
