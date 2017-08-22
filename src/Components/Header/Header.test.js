import React from 'react';
import Header from './Header/Header';
import { shallow, mount } from 'enzyme';

describe('Header component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = shallow(<Header />)
   })

   test('Header should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render a header and a title', () => {
     expect(wrapper.find('.app-header').length).toEqual(1)
     expect(wrapper.find('.header').text()).toEqual('SWAPI-BOX')
   })
})
