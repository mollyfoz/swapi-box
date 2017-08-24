import React, { Component } from 'react';
import Loading from './Loading/Loading';
import { shallow, mount } from 'enzyme';

describe('Load component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Loading />)
  })

  test('Loading should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('should render loading container', () => {
    expect(wrapper.find('.loading-container').length).toEqual(1)
  })
})
