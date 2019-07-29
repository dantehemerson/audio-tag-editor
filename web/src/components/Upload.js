import React, { Component } from 'react'
import Dropzone from './Dropzone'
import Progress from './progress'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
  box-shadow: 0px 0px 18px gray;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
`

const Files = styled.div`
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  padding: 8px;
  overflow: hidden;
  box-sizing: border-box;
`
const Filename = styled.span`
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`

const Actions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 32px;
`

const ProgressWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const CheckIcon = styled.img`
  opacity: 0.5;
  margin-left: 32px;
`

const Button = styled.button`
  font-family: 'Roboto medium', sans-serif;
  font-size: 14px;
  display: inline-block;
  height: 36px;
  min-width: 88px;
  padding: 6px 16px;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0;
  border-radius: 2px;
  background: rgba(103, 58, 183, 1);
  color: #fff;
  outline: 0;
  &:disabled {
    background: rgb(189, 189, 189);
    cursor: default;
  }
`

class Upload extends Component {
  state = {
    files: [],
    uploading: false,
    uploadProgress: {},
    successfullUploaded: false,
    finishRes: false,
    tags: null,
    apiUrl: ''
  }

  onFilesAdded = files => {
    this.setState({
      files
    })
  }

  uploadFiles = async () => {
    this.setState({ uploadProgress: {}, uploading: true })
    const promises = []
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file))
    })
    try {
      await Promise.all(promises)

      this.setState({ successfullUploaded: true, uploading: false })
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false })
    }
  }

  sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress }
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100
          }
          this.setState({ uploadProgress: copy })
        }
      })

      req.upload.addEventListener('load', event => {
        const copy = { ...this.state.uploadProgress }
        copy[file.name] = { state: 'done', percentage: 100 }
        this.setState({ uploadProgress: copy })
        resolve(req.response)
      })

      req.onload = function onload() {
        this.props.handleUploaded(JSON.parse(req.response))
      }.bind(this)

      req.upload.addEventListener('error', event => {
        const copy = { ...this.state.uploadProgress }
        copy[file.name] = { state: 'error', percentage: 0 }
        this.setState({ uploadProgress: copy })
        reject(req.response)
      })

      const formData = new FormData()
      formData.append('file', file, file.name)

      req.open('POST', `${this.props.apiUrl}/upload`)
      req.send(formData)
    })
  }

  renderProgress = file => {
    const uploadProgress = this.state.uploadProgress[file.name]
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <ProgressWrapper>
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <CheckIcon
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0
            }}
          />
        </ProgressWrapper>
      )
    }
  }

  renderActions = () => {
    if (this.state.successfullUploaded) {
      return (
        <Button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </Button>
      )
    } else {
      return (
        <Button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </Button>
      )
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <Files>
            {this.state.files.map(file => {
              return (
                <Row key={file.name}>
                  <Filename>{file.name}</Filename>
                  {this.renderProgress(file)}
                </Row>
              )
            })}
          </Files>
        </Content>
        <Actions>{this.renderActions()}</Actions>
      </Container>
    )
  }
}

export default Upload
