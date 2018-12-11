import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  detailsPane = () => {
    const blog = this.props.blog
    const addedBy = blog.user ? blog.user.name : 'anonymous'
    const detailsStyle = { paddingLeft: 10 }
    const showDeleteButton = blog.user ? blog.user.username === this.props.currentUser.username : true
    if (this.state.expanded) {
      return (
        <div style={detailsStyle}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={this.props.onAddLike}>like</button><br />
          added by {addedBy}<br />
          <button
            onClick={this.props.onDelete}
            style={{ display: showDeleteButton ? '' : 'none' }}>
            delete
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const blog = this.props.blog
    const wrapperStyle = { borderStyle: 'solid', borderWidth: 1, borderColor: 'black', padding: 2 }
    return (
      <div style={wrapperStyle}>
        <div onClick={this.toggleExpanded}>
          {blog.title} <span style={{ fontStyle: 'italic' }}>{blog.author}</span> ({blog.likes})
        </div>
        {this.detailsPane()}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddLike: PropTypes.func.isRequired,
}

export default Blog