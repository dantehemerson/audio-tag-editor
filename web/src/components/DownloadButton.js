import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Link = styled.a`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 12px;
  box-shadow: 0 0 1px 0px black;
  border-radius: 50%;
  color: #e2e2e2;
  background: #40404070;
  text-shadow: 0 0 1px 0px black;
  font-size: 28px;
  display: flex;
  border: 2px solid white;
  transition: 0.3s;
  &:hover {
    transform: rotate(360deg);
    color: white;
  }
`

export const DownloadButton = ({ imageLink }) => (
  <Link href={imageLink} download="cover" title="Download cover">
    <Icon type="download" />
  </Link>
)
