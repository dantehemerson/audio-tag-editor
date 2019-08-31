import React, { Component } from 'react'
import Dropzone from './Dropzone'
import Progress from './progress'
import styled from 'styled-components'
import { Button } from 'antd'

const Container = styled.div`
  display: flex;
  padding: 30px 14px;
  flex-direction: column;
  flex: 1;
  align-items: center;
  text-align: left;
  overflow: hidden;
`

const Files = styled.div`
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  min-height: 66px;
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
  margin-top: 8px;
  font-size: 16px;
  color: #555;
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
      files: files.length ? files.slice(0, 1) : []
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

  clearUpload = () => {
    this.setState({
      successfullUploaded: false,
      uploading: false
    })
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
        const body = JSON.parse(req.response)
        if ([409, 500, 404, 400].find(item => req.status === item) !== undefined) {
          alert(body.error)
          this.clearUpload()
        } else {
          this.props.handleUploaded(body, req.status)
        }
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
              opacity: uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0
            }}
          />
        </ProgressWrapper>
      )
    }
  }

  render() {
    return (
      <Container>
        <Dropzone onFilesAdded={this.onFilesAdded} disabled={this.state.uploading || this.state.successfullUploaded} />
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
        <Button
          onClick={this.uploadFiles}
          disabled={!this.state.files.length || this.state.uploading}
          type="primary"
          shape="round"
          icon="form"
          size="large"
        >
          Go to edit
        </Button>
      </Container>
    )
  }
}

export default Upload
