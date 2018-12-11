import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const divWithCancelButtonToHide = () => (
      <div style={showWhenVisible}>
        {this.props.children}
        <button onClick={this.toggleVisibility}>cancel</button>
      </div>
    )
    const divWithClickToHide = () => (
      <div style={showWhenVisible} onClick={this.toggleVisibility}>
        {this.props.children}
      </div>
    )

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        {this.props.clickToHide ? divWithClickToHide() : divWithCancelButtonToHide()}
      </div>
    )
  }
}

export default Togglable
