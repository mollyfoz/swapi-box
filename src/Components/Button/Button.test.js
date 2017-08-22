import React from 'react';
import Button from './Button/Button';
import { shallow, mount } from 'enzyme';

describe('Button component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = shallow(<Button />)
   })

   test('Button should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render a button element', () => {
     expect(wrapper.find('.subject-btn').length).toEqual(1)
   })

   test.skip('it should call API on click event', () => {
     const mockFn = jest.fn()
     const comp = shallow(<Button callAPI={mockFn}/>)
     const btn = comp.find('.subject-btn')

    btn.simulate('click');
    expect(mockFn).toBeCalled();
  })
})
