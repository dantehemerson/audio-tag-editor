import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Container = styled.div`
  height: 200px;
  width: 200px;
  background-color: #a4bae317;
  border: 2px dashed rgb(187, 186, 186);
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  &.highlight {
    background-color: rgb(188, 185, 236);
  }
`

const FileInput = styled.input`
  display: none;
`

export default class Dropzone extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hightlight: false }
    this.fileInputRef = React.createRef()
  }

  openFileDialog = () => {
    if (this.props.disabled) {
      return
    }
    this.fileInputRef.current.click()
  }

  onFilesAdded = evt => {
    if (this.props.disabled) return
    const files = evt.target.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }

  onDragOver = event => {
    event.preventDefault()
    if (this.props.disabed) return
    this.setState({ hightlight: true })
  }

  onDragLeave = event => {
    this.setState({ hightlight: false })
  }

  onDrop = event => {
    event.preventDefault()
    if (this.props.disabed) return
    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray = list => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  render() {
    return (
      <Container
        className={`${this.state.hightlight ? 'highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <FileInput ref={this.fileInputRef} type="file" accept=".mp3" onChange={this.onFilesAdded} />
        <Icon type="cloud-upload" style={{ fontSize: '34px' }} />
        <span>Upload File</span>
      </Container>
    )
  }
}
