import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
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
    <div>
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
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}

          <h3>create new</h3>
          <BlogForm showNotification={this.showNotification} />
        </div>
      );
    }
  }
}

export default App
