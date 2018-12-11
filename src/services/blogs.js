import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  console.log('POSTing new blog', newBlog)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const userId = updatedBlog.user._id
  const blogToSend = {
    user: userId,
    likes: updatedBlog.likes,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url,
  }
  const config = {
    headers: { 'Authorization': token }
  }
  console.log('Updating blog', blogToSend)
  const response = await axios.put(`${baseUrl}/${updatedBlog._id}`, blogToSend, config)
  return response.data
}

export default { getAll, create, update, setToken }
