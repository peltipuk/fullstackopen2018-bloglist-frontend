import React from 'react'
import blogService from '../services/blogs'
import { NotificationType } from '../utils/constants'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
    }
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  newBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    console.log('Creating new blog entry', newBlog)
    const responseData = blogService.create(newBlog)
    this.setState({ title: '', author: '', url: '' })
    console.log('Response data', responseData)
    this.props.showNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added`, NotificationType.info)
  }

  render() {
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={this.newBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFormChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFormChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFormChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
}

export default BlogForm
