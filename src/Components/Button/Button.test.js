import React from 'react';
import Button from './Button/Button';
import { shallow, mount } from 'enzyme';

describe('Button component', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = mount(<Button />)
   })

   test('Button should exist', () => {
   expect(wrapper).toBeDefined()
   })

   test('should render a button element', () => {
     expect(wrapper.find('.subject-btn').length).toEqual(1)
   })

   test('should be active after being clicked', () => {
     const mockFn = jest.fn()
     const comp = mount(<Button getSubjectData={mockFn}/>)
     const btn = comp.find('.subject-btn')

    btn.simulate('click');
    expect(wrapper.find('.active-btn').length).toEqual(1)
   })

   test('it should call a function on click event', () => {
     const mockFn = jest.fn()
     const comp = mount(<Button getSubjectData={mockFn}/>)
     const btn = comp.find('.subject-btn')

    btn.simulate('click');
    expect(mockFn).toBeCalled();
  })
})
