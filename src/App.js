import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { loggedBlogUserKey, NotificationType } from './utils/constants'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: '',
      notificationType: '',
    }
  }

  showNotification = (message, type) => {
    console.log(`Showing notification '${message}' (${type})`)
    this.setState({ notification: message, notificationType: type })
    setTimeout(() => {
      this.setState({ notification: '', notificationType: '' })
    }, 5000);
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addLike = (id) => async () => {
    const blog = this.state.blogs.find((blog) => blog._id === id)
    console.log('Adding like to blog', blog)
    const blogs = this.state.blogs.filter((blog) => blog._id !== id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    this.setState({ blogs: blogs.concat(updatedBlog) })
    await blogService.update(updatedBlog)
  }

  deleteBlog = (id) => async () => {
    const blog = this.state.blogs.find((blog) => blog._id === id)
    console.log('Trying to delete', blog.title)
    if(window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      this.setState( {blogs: this.state.blogs.filter((b) => b._id !== id)})
      console.log('Deleting blog', blog)
      await blogService.remove(blog)
      console.log('Deleted blog')
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
      window.localStorage.setItem(loggedBlogUserKey, JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      this.showNotification('wrong username or password', NotificationType.error)
    }
  }

  logout = (event) => {
    console.log(`Logging out user '${this.user}'`)
    window.localStorage.removeItem(loggedBlogUserKey)
    window.location.reload()
  }

  loginForm = () => (
    <div className='loginFormWrapper'>
      <h2>Log in to application</h2>

      <form onSubmit={this.login}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} type={this.state.notificationType} />
          {this.loginForm()}
        </div>
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <Notification message={this.state.notification} type={this.state.notificationType} />
          <div>
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}>logout</button>
            </p>
          </div>
          <div style={{ paddingBottom: 10 }}>
            {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog._id}
                blog={blog}
                onAddLike={this.addLike(blog._id)}
                onDelete={this.deleteBlog(blog._id)}
                currentUser={this.state.user} />
            )}
          </div>

          <Togglable buttonLabel='create new'>
            <BlogForm showNotification={this.showNotification} />
          </Togglable>
        </div>
      );
    }
  }
}

export default App
