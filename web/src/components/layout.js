import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, lightTheme } from '../globalStyles'
import Header from './header'

const Card = styled.div`
  width: 100%;
  box-shadow: 0px 0px 3px #8080807d;
  border-radius: 2px;
  padding: 14px 14px;
  background: white;
`

const HeaderContainer = styled(Card)`
  margin-top: 20px;
  margin-bottom: 10px;
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
        <ThemeProvider theme={lightTheme}>
          <React.Fragment>
            <GlobalStyles />
            <Row>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 22, offset: 1 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xxl={{ span: 14, offset: 5 }}
              >
                <HeaderContainer>
                  <Header siteTitle={data.site.siteMetadata.title} />
                </HeaderContainer>
                <Card>{children}</Card>
              </Col>
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
