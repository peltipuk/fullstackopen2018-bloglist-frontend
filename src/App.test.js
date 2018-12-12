import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')

describe('<App />', () => {
  let app

  beforeEach(() => {
    app = mount(<App />)
  })

  it('no blogs are rendered when user is not logged in', () => {
    app.update()
    console.log(app.debug())
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
    const loginFormWrapper = app.find('.loginFormWrapper')
    expect(loginFormWrapper.exists()).toBeTruthy()
  })

  it('renders blogs when a user is logged in', () => {
    // TODO
  })
})
