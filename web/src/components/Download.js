import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'antd'

const Wrapper = styled.div`
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Info = styled.h3`
  margin: 35px 0;
  color: gray;
  font-size: 17px;
`
export class Download extends React.Component {
  render() {
    return (
      <Wrapper>
        <Icon
          type="check-circle"
          theme="filled"
          style={{
            fontSize: '104px',
            color: '#52c41b'
          }}
        />
        <Info>Successfull Edited!!! </Info>
        <Button
          href={this.props.downloadUrl}
          type="primary"
          shape="round"
          icon="download"
          size="large"
          style={{
            marginBottom: '40px',
            maxWidth: '200px'
          }}
        >
          Download
        </Button>
        <Button
          href="/"
          type="s"
          shape="round"
          icon="edit"
          size="large"
          style={{
            maxWidth: '230px'
          }}
        >
          Edit another song
        </Button>
      </Wrapper>
    )
  }
}
