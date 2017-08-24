import React from 'react';
import Card from './Card/Card';
import { shallow, mount } from 'enzyme';

describe('Card component', () => {

  const mockData = {
    homeworld: "Tatooine",
		id:"Luke Skywalker",
		name:"Luke Skywalker",
		population:"200000",
		species:"Human",
		starred: false
  }

  let wrapper;

   beforeEach(() => {
     wrapper = mount(<Card subjectDataObj={mockData} />)
   })

   test('Card should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render data on a card', () => {
     expect(wrapper.find('.data-card').length).toEqual(1)
   })

   test('should be set to favorite if selected', () => {
     const mockFn = jest.fn()
     const comp = mount(<Card subjectDataObj={mockData} toggleFavorite={mockFn}/>)
     const btn = comp.find('.favorite-btn')

    btn.simulate('click');
    expect(mockFn).toBeCalled();
  })

})
