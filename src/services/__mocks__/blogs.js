let token = null

const blogs = [
  {
    _id: '5c0115006ee1dc09004e0ff8',
    title: 'Adventure Blog',
    author: 'Jekyll',
    url: 'www.adventures.com/blog',
    user: {
      _id: '5c0114ffa749a00905641295',
      username: 'Paavo',
      name: 'Paavo Nieminen'
    },
    likes: 0,
  },
  {
    _id: '5c0139264604a02282429777',
    title: 'Authenticated blog',
    author: 'James Moore',
    url: 'http://www.example.com',
    likes: 28,
    user: {
      _id: '5c0114ffa749a00905641295',
      username: 'Paavo',
      name: 'Paavo Nieminen'
    }
  },
  {
    _id: '5c0e0dc65d910c21461a6718',
    title: 'Another authenticated blog',
    author: 'Billy Bebus',
    url: 'http://www.billy.example.com',
    likes: 10,
    user: {
      _id: '5c0114ffa749a00905641295',
      username: 'Paavo',
      name: 'Paavo Nieminen'
    }
  },

]
const getAll = () => {
  console.log('Returning mock blogs')
  return Promise.resolve(blogs)
}

const setToken = (tokenValue) => {
  token = tokenValue

}

export default { getAll, blogs, setToken }
