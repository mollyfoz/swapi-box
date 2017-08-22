import React from 'react';
import Nav from './Nav/Nav';
import { shallow, mount } from 'enzyme';

describe('Nav component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = shallow(<Nav />)
   })

   test('Nav should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render navigation section', () => {
     expect(wrapper.find('.navigation').length).toEqual(1)
   })
})
