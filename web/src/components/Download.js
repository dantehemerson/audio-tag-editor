import React from 'react'

export class Download extends React.Component {
  render() {
    return (
      <div>
        <h1>Download page</h1>
        <a href={this.props.downloadUrl}>Download Song</a>
      </div>
    )
  }
}
