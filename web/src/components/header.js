import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Wrapper = styled.header`
  display: flex;
  background: #2a62c6;
  padding: 32px 0;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 19px;
  font-weight: 600;
`

const Header = ({ siteTitle }) => (
  <Wrapper>
    <Icon
      type="tag"
      theme="outlined"
      twoToneColor="#3F3F37"
      style={{ fontSize: '22px', color: 'white', paddingRight: '6px' }}
    />
    <Title style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          textDecoration: `none`,
          color: 'white'
        }}
      >
        {siteTitle}
      </Link>
    </Title>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
