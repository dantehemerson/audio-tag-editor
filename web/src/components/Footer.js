import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  padding: 30px 0;
  margin: 0 10px;
  text-align: center;
`
const Footer = () => (
  <FooterWrapper>
    © {new Date().getFullYear()}, Built with
    {` `}
    <a
      href="https://www.gatsbyjs.org"
      rel="noopener noreferrer"
      target="_blank"
    >
      Gatsby
    </a>{' '}
    by{' '}
    <a
      href="https://dantecalderon.dev"
      rel="noopener noreferrer"
      target="_blank"
    >
      Dante Calderon
    </a>
  </FooterWrapper>
)

export default Footer
