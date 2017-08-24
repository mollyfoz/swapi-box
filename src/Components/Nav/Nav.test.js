import React from 'react';
import Nav from './Nav/Nav';
import { shallow, mount } from 'enzyme';

describe('Nav component', () => {
  let wrapper;

  const navBtnsArray = ['films', 'people', 'planets', 'vehicles']

   beforeEach(() => {
     wrapper = shallow(<Nav />)
   })

   test('Nav should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render navigation section', () => {
     expect(wrapper.find('.navigation').length).toEqual(1)
   })

   test('should render an array of buttons', () => {
     expect(wrapper.find(navBtnsArray).length).toEqual(4)
   })
})
