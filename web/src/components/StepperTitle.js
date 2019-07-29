import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 30px 0;
`
const Title = styled.h3`
  font-size: 22px;
  color: #3f3d3d;
  text-align: center;
`
const Line = styled.p`
  background: #e5e5e5;
  height: 1px;
  margin: 0 auto;
  padding: 0;
  border: 0;
  width: 80%;
`

export const StepperTitle = ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Line />
  </Wrapper>
)
