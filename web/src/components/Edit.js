import React from 'react'

export default class Edit extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      ...this.props.data,
    }
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <div>
        <span>Title</span>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
