import React from 'react';
import Card from './Card/Card';
import { shallow, mount } from 'enzyme';

describe('Card component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = shallow(<Card />)
   })

   test('Card should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render a card with a title', () => {
     expect(wrapper.find('.data-card').length).toEqual(1)
     expect(wrapper.find('h2').length).toEqual(1)
   })

   test.skip('should be set to favorite if selected', () => {
     const mockFn = jest.fn()
     const comp = shallow(<Card setFavorite={mockFn}/>)
     const btn = comp.find('.fav-btn')

    btn.simulate('click');
    expect(mockFn).toBeCalled();
  })

  //whether or not we have another test here depends on if we set state for a favorited card, will have to intercept function that sets state

})
