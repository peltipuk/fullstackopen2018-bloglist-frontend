import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import { loggedBlogUserKey } from './utils/constants'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('user not logged in', () => {
    beforeEach(() => {
      localStorage.removeItem(loggedBlogUserKey)
      app = mount(<App />)
    })

    it('no blogs are rendered', () => {
      app.update()
      //console.log(app.debug())
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
      const loginFormWrapper = app.find('.loginFormWrapper')
      expect(loginFormWrapper.exists()).toBeTruthy()
    })
  })

  describe.only('user logged in', () => {
    beforeEach(() => {
      window.localStorage.setItem(loggedBlogUserKey, JSON.stringify({
        token: '4j432l423l312h',
        username: 'Paavo',
        name: 'Paavo Nieminen'
      }))
      app = mount(<App />)
    })

    it('renders blogs when a user is logged in', () => {
      app.update()

      //console.log(app.debug())
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
      const loginFormWrapper = app.find('.loginFormWrapper')
      expect(loginFormWrapper.exists()).toBeFalsy()
    })
  })
})
