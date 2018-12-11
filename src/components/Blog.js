import React from 'react'

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
    const detailsStyle = { paddingLeft: 10 }
    if (this.state.expanded) {
      return (
        <div style={detailsStyle}>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <button onClick={this.props.onAddLike}>like</button><br/>
          added by {blog.author}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const blog = this.props.blog
    const wrapperStyle = { borderStyle: 'solid', borderWidth: 1, borderColor: 'black', padding: 2}
    return (
      <div style={wrapperStyle}>
        <div onClick={this.toggleExpanded}>
          {blog.title} {blog.author} ({blog.likes})
        </div>
        {this.detailsPane()}
      </div>
    )
  }
}

export default Blog