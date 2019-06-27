import React from 'react'
import styled from 'styled-components'
import { DownloadButton } from './DownloadButton'

const Img = styled.img`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 5px 2px #cecece;
`

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  display: flex;
`

const M = styled.div`
  display: block;
  position: relative;
`

export const Cover = ({ imageData, handleChange }) => {
  const src = imageData
    ? `data:image/jpeg;base64,${imageData}`
    : `https://c-lj.gnst.jp/public/img/common/noimage.jpg?20190126050058`
  return (
    <Wrapper>
      <M>
        <Img src={src} />
        {imageData && <DownloadButton imageLink={src} />}
      </M>
    </Wrapper>
  )
}
