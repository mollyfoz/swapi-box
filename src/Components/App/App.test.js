import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';

describe('App tests', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow(<App />)
  })

  test('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  test('renders all appropriate components on pageload', () => {
    expect(wrapper.find('Header').length).toEqual(1)
  })

  test('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      favoritesCount: 0,
      favoritesArray: [],
      currentSubject: '',
      buttonClicked: 'openScroll',
      filmData: [],
      data: [],
    })
  })

  test('should run componentDidMount after mounting', () => {
    wrapper.instance().componentDidMount = jest.fn()
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().componentDidMount).toHaveBeenCalled()
  })

  test('should fetch correct data after mounting app', () => {
    mockFilmData = [
      {
        id: 'A New Hope',
        starred: false,
        title: 'A New Hope',
        year: '1977-05-25',
        crawl: 'Lots of text here'
      },
      {
        id: 'The Empire Strikes Back',
        starred: false,
        title: 'The Empire Strikes Back',
        year: '1983-05-25',
        crawl: 'Lots of text here'
      }
    ]

    fetchMock.get('https://swapi.co/api/films/', {
      status: 200,
      body: mockFilmData
    })

    expect(fetchMock.routes[0].method).toEqual('GET')
    expect(fetchMock._matchedCalls.length).toEqual(0)
    expect(fetchMock.routes[0].response.body).toEqual(mockFilmData)

    wrapper = mount(<App />)

    const response = JSON.parse(fetchMock.lastOptions().body)


    expect(fetchMock.called()).toEqual(true)
    expect(fetchMock.called('https://swapi.co/api/films/')).toEqual(true)
    expect(response).toEqual(mockFilmData)
    //will the rest of the function run? does fetch mock intercept additional functions inside of the fetch
    expect(wrapper.state().filmData.length).toEqual(2)

  })

  test('should change state when getSubjectData is run', () => {

    wrapper.instance().getSubjectData('people');

    fetchMock.get('https://swapi.co/api/people/', {
      status: 200,
      body: mockPeopleData
    })

    mockPeopleData = [
      {
        id: 'A New Hope',
        starred: false,
        title: 'A New Hope',
        year: '1977-05-25',
        crawl: 'Lots of text here'
      },
      {
        id: 'The Empire Strikes Back',
        starred: false,
        title: 'The Empire Strikes Back',
        year: '1983-05-25',
        crawl: 'Lots of text here'
      }
    ]

    expect(fetchMock.routes[0].method).toEqual('GET')
    expect(fetchMock._matchedCalls.length).toEqual(0)
    expect(fetchMock.routes[0].response.body).toEqual(mockPeopleData)

    wrapper = mount(<App />)

    const response = JSON.parse(fetchMock.lastOptions().body)


    expect(fetchMock.called()).toEqual(true)
    expect(fetchMock.called('https://swapi.co/api/people/')).toEqual(true)
    expect(fetchMock._matchedCalls.length.toEqual(3)

    expect(response).toEqual(mockPeopleData)

    //people makes initial api call via fetch homeworld
      //returns person name
      //returns path to homeworld ==> name & population
      //returns path to species ==> name

    expect(wrapper.state().filmData.length).toEqual(7);
  })
})
