import React from 'react'
import SimpleBlog from './SimpleBlog'
import { shallow } from 'enzyme'

describe.skip('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'My superb blog',
      author: 'Joan Jefferson',
      likes: 12,
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    //console.log(simpleBlogComponent.debug())

    const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')
    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)

    const likesDiv = simpleBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes.toString())
  })

  it('clicking like button calls event handler', () => {
    const blog = {
      title: 'My superb blog',
      author: 'Joan Jefferson',
      likes: 12,
    }
    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    //console.log(simpleBlogComponent.debug())

    const likeButton = simpleBlogComponent.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
