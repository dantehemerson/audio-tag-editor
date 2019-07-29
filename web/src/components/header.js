import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
  display: flex;
  background: #2a62c6;
  padding: 24px 0;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 18px;
`

const Header = ({ siteTitle }) => (
  <Wrapper>
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
