import React from 'react'
import SimpleBlog from './SimpleBlog'
import { shallow } from 'enzyme'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'My superb blog',
      author: 'Joan Jefferson',
      likes: 12,
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    console.log(simpleBlogComponent.debug())

    const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')
    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)

    const likesDiv = simpleBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes.toString())
  })
})
