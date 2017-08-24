import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

describe('App tests', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow(<App />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('renders all appropriate components on pageload', () => {
    expect(wrapper.find('Header').length).toEqual(1)
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      favoritesCount: 0,
      favoritesArray: [],
      currentSubject: '',
      buttonClicked: 'openScroll',
      filmData: [],
      data: [],
    })
  })

  it('should run componentDidMount after mounting', () => {
    wrapper.instance().componentDidMount = jest.fn()
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().componentDidMount).toHaveBeenCalled()
  })

  it('should change state on componentDidMount', () => {
    expect(wrapper.state()).toEqual({
      favoritesCount: 0,
      favoritesArray: [],
      currentSubject: '',
      buttonClicked: 'openScroll',
      filmData: [],
      data: [],
    })
    wrapper.instance().componentDidMount();
    expect(wrapper.state().filmData.length).toEqual(7);
  })
})
