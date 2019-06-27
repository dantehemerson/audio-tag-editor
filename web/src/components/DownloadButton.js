import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Link = styled.a`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 10px;
  background: #cecece63;
  box-shadow: 0 0 1px 0px black;
  border-radius: 50%;
  color: #e2e2e2;
  font-size: 30px;
  display: flex;
  transition: 0.3s;
  &:hover {
    transform: rotate(360deg);
    background: #cecece9c;
    color: black;
  }
`

export const DownloadButton = ({ imageLink }) => (
  <Link href={imageLink} download="cover" title="Download cover">
    <Icon type="download" />
  </Link>
)
