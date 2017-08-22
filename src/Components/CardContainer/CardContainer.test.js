import React, { Component } from 'react';
import CardContainer from './CardContainer/CardContainer';
import { shallow, mount } from 'enzyme';

describe('CardContainer component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = mount(<CardContainer />)
   })

   test('CardContainer should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render a card container', () => {
     expect(wrapper.find('.card-container').length).toEqual(1)
   })
})
