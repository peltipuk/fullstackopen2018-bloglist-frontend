import React from 'react'
import Blog from './Blog'
import { shallow } from 'enzyme'

describe.only('<Blog />', () => {
  const blog = {
    title: 'My superb blog',
    author: 'Joan Jefferson',
    url: 'https://superb.blog.com',
    likes: 4942,
  }

  let blogComponent
  let mockOnDelete
  let mockOnAddLike
  beforeEach(() => {
    const user = {
      name: 'Jill Taker',
      username: 'jill'
    }

    mockOnDelete = jest.fn()
    mockOnAddLike = jest.fn()

    blogComponent = shallow(
      <Blog
        blog={blog}
        currentUser={user}
        onDelete={mockOnDelete}
        onAddLike={mockOnAddLike} />)
  })

  it('initially renders only title and author', () => {
    const wrapperDiv = blogComponent.find('.wrapper')
    let detailsDiv = blogComponent.find('.details')
    expect(wrapperDiv.text()).toContain(blog.title)
    expect(wrapperDiv.text()).toContain(blog.author)
    expect(detailsDiv.exists()).toBeFalsy()

  })

  it('show details after clicking', () => {
    let detailsDiv = blogComponent.find('.details')
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    titleAndAuthorDiv.simulate('click')
    detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.text()).toContain(blog.url)
    expect(detailsDiv.text()).toContain(blog.likes)
  })
})
