import React from 'react'

export default class Edit extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      data: this.props.data,
    }
  }

  render() {
    console.log(this.state.data)
    console.log(`Titulo `, this.state.data.title)
    return <div>{this.state.data.title}</div>
  }
}
