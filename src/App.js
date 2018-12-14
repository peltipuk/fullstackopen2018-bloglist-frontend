import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      anecdote: ''
    }
  }
  onVote = (id) => () => {
    const type = 'VOTE'
    console.log('Dispatching VOTE')
    this.props.store.dispatch({ type: type, id: id })
  }

  handleAnecdoteChange = (event) => {
    this.setState({ anecdote: event.target.value })
  }

  handleNewAnecdote = (event) => {
    event.preventDefault()
    if (this.state.anecdote.trim().length > 0) {
      console.log('Dispatching NEW_ANECDOTE')
      const type = 'NEW_ANECDOTE'
      this.props.store.dispatch({ type: type, data: this.state.anecdote })
      this.setState({ anecdote: '' })
    } else {
      console.log('Not adding empty anecdote')
    }
  }

  render() {
    const anecdotes = this.props.store.getState()
    console.log('a', anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.onVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.handleAnecdoteChange} value={this.state.anecdote} /></div>
          <button onClick={this.handleNewAnecdote}>create</button>
        </form>
      </div>
    )
  }
}

export default App