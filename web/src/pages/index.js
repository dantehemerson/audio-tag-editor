import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload'

class IndexPage extends React.Component {
  state = {
    uploaded: false,
  }

  handleUploaded(uploaded) {
    this.setState({ uploaded })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <Upload />
      </Layout>
    )
  }
}

export default IndexPage
