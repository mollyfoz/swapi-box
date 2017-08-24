import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

describe('string', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.length).toBe(true)
  });
})
