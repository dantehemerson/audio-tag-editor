import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
  display: flex;
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
          color: '#1571e7'
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
