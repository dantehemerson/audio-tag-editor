import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Header from './header'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyles, darkTheme, lightTheme } from '../globalStyles'

const Content = styled(Col)`
  box-shadow: 0px 0px 3px #8080807d;
  padding: 14px 14px;
  background: white;
  border-radius: 4px;
`
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ThemeProvider theme={lightTheme}>
          <React.Fragment>
            <GlobalStyles />
            <Row>
              <Content
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 22, offset: 1 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xxl={{ span: 14, offset: 5 }}
              >
                {children}
              </Content>
            </Row>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a> by{' '}
              <a href="https://dantecalderon.dev">Dante Calderon</a>
            </footer>
          </React.Fragment>
        </ThemeProvider>
      </React.Fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
